/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint no-constant-condition: ["error", { "checkLoops": false }] */

(async () => {
  /** *****************************************************************************
   * Fetches paginated flight records from flirt.eha.io backend and streams them
   * to python server for permanent storage.
   *
   * --------------------
   * Author: Lavneet Puri
   *******************************************************************************
   */

  /**
   * Query backend for flight schedule
   * @param {Object} conf
   * @param {Object} conf.query refer to README to construct this mongo query
   * @param {Number} [conf.count=0] limit number of records;
   * fetch all if left empty
   * @return {Array} promise to a list of requested flight schedule records
   */
  async function getRecords({ query, count }) {
    return new Promise((resolve, reject) => {
      // Setting count to 0 fetched all records from the server.
      const limit = count || 0;
      Meteor.call('flightsByQuery', query, limit, (err, res) => {
        if (err) reject(err);
        resolve(res.flights);
      });
    });
  }

  /**
   * Get a list of flight schedule records for a given departure airport
   * @param {String} code iata code for departure airport
   */
  async function getPage(code) {
    // some number bigger than total records to fetch all
    const upperBound = 250000;
    return getRecords({
      query: { 'departureAirport._id': code },
      count: upperBound,
    });
  }

  /**
   * initiate a new websocket connection
   * @param {Array} host host ip
   * @param {Number} port port server is listening on
   * @return promise to a new `WebSocket` reference
   */
  function initConnection(host, port) {
    return new Promise((resolve) => {
      const socket = new WebSocket(`ws://${host}:${port}`);
      socket.onopen = () => resolve(socket);
    });
  }

  /**
   * incrementally download paginated flight schedule records
   * and send them to server for permanent storage
   * @param {String} initialId _id first known document in database (use `getFirstID`)
   * @param {Number} pageSize Number of records to fetch in single page
   * @param {WebSocket} storageConnection socket connection handler to server
   */

  async function beginFetching({ initialId, pageSize, storageConnection }) {
    const ws = storageConnection;
    if (ws.readyState !== 1) {
      console.error('STOPPING',
        'Connection to storage server not open. Is the local server running?');
      console.log(`Use '${initialId}' as initialId for next run`);
      return;
    }
    // Send the initialId record for storage
    const res = await getRecords({
      query: { _id: new Mongo.ObjectID(initialId) },
      count: 1,
    });
    if (res) ws.send(JSON.stringify(res));

    // Send follow up pages for storage
    let page;
    let currId = initialId;
    do {
      // because reference to page is needed to confirm next iteration run
      // eslint-disable-next-line no-await-in-loop
      page = await getNextPage(currId, pageSize);
      if (!page.length) break;

      // make sure socket is still open
      if (ws.readyState !== 1) {
        console.error('STOPPING',
          'Connection to storage server not open. Is the local server running?');
        console.log(`Use '${currId}' as initialId for next run`);
        return;
      }
      // TODO: what if storage server disconnects here? Current page will never be sent.
      ws.send(JSON.stringify(page));
      const firstId = page[0]._id._str;
      const lastId = page[page.length - 1]._id._str;
      console.log(`Page ${firstId}-${lastId} of size ${pageSize} sent`);

      // update to last know maximum ID
      currId = page[page.length - 1]._id._str;
    } while (true);

    console.log('STOPPING', 'No more records left to fetch');
    console.log(`Last page sent: _id ${currId}, size ${pageSize}`);
  }

  /**
   * increments the given iata code, say from AAA to AAB
   * @param {String} code three letter IATA code
   */
  function incIATACode(code) {
    // convert code to base36 (0-z) for easy arithmetic
    const n = parseInt(code, 36);
    return (n + 1).toString(36).toUpperCase();
  }

  const HOST = '127.0.0.1';
  const PORT = 4000;

  const socket = await initConnection(HOST, PORT);
  beginFetching({
    initialId: '5d2cb2e50c8ec0b8bd995018',
    pageSize: 200,
    storageConnection: socket,
  });
  socket.close();
})();
