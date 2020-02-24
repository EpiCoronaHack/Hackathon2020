/* eslint-disable no-continue */
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
   * increment char in asscii
   * @param {String} char single letter string
   */
  function incChar(char) {
    return String.fromCharCode(char.charCodeAt(0) + 1);
  }

  /**
   * increments the given iata code, say from AAA to AAB
   * @param {String} code three letter IATA code
   */
  // TODO: throw error on invalid `code` format
  function incIATACode(code) {
    if (code[2] === 'Z') {
      if (code[1] === 'Z') {
        // form [A-Z]ZZ
        return `${incChar(code[0])}AA`;
      }
      // form [A-Z][A-Y]Z
      return `${code[0]}${incChar(code[1])}A`;
    }

    // otherwise convert code to base36 (0-z) for easy arithmetic
    const n = parseInt(code, 36);
    return (n + 1).toString(36).toUpperCase();
  }

  /**
   * send given page to server for permanent storage
   * @param {Array} page list of flight schedule records
   * @param {String} code iata code of airport corresponding to the page
   * @param {WebSocket} socket reference to storage server socket connection
   */
  function sendPage(page, code, socket) {
    if (socket.readyState !== 1) {
      throw new Error(
        'STOPPING Connection to storage server not open. Is the local server running?'
        + `Use ${code} as fromDeptCode arg to beginFetching in the next run`,
      );
    }
    socket.send(JSON.stringify({ code: code || 'UNKNOWN', page }));
  }

  /**
   * incrementally download flight schedule records for each departure airport
   * and send them to server for permanent storage
   * @param {String} fromDeptCode start from this airport iata code
   * @param {WebSocket} storageConnection socket connection handler to server
   */
  async function beginFetching({ fromDeptCode, storageConnection }) {
    let page;
    for (let code = fromDeptCode; code <= 'ZZZ'; code = incIATACode(code)) {
      page = await getPage(code);

      if (!page.length) {
        console.log(`No records for departure airport ${code}. Continuing...`);
        continue;
      }

      sendPage(page, code, storageConnection);
      console.log(`Page for departure airport ${code} with size ${page.length} sent`);
    }

    // send records with unknown departureAirport
    code = null;
    page = await getPage(code);
    if (page.length) {
      sendPage(page, code, storageConnection);
      console.log(`Page for UNKNOWN departure airports with size ${page.length} sent`);
    }

    console.log('STOPPING', 'No more records left to fetch');
  }

  const HOST = '127.0.0.1';
  const PORT = 4000;

  const socket = await initConnection(HOST, PORT);
  console.log('Socket connection established!');
  await beginFetching({
    fromDeptCode: 'AAA',
    storageConnection: socket,
  });
  socket.close();
})();
