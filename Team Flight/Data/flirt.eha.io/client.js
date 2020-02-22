(() => {

/*******************************************************************************
 * Fetches paginated flight records from flirt.eha.io backend and streams them
 * to python server for permanent storage.
 * 
 * --------------------
 * Author: Lavneet Puri
 *******************************************************************************
 */

socket = new WebSocket('ws://127.0.0.1:3000');

  /**
   * Query backend for flight schedule
   * @param {Object} conf
   * @param {Object} conf.query refer to README to construct this mongo query
   * @param {Number} [conf.count=0] limit number of records;
   * fetch all if left empty
   * @return {Array} list of requested flight schedule records
   */
  function getRecords({ query, count }) {
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
   * Get a list of follow up flight schedule records sorted by mongo _id
   * @param {Object} conf
   * @param {String} conf.id hex _id from some valid mongo document
   * @param {Number} conf.size number of flight records to fetch starting with `id`
   */
  async function getNextPage(id, size) {
    return getRecords({
      query: { _id: { $gt: new Mongo.ObjectID(id) } },
      count: size,
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
  /** get first _id in database */
  async function getFirstID() {
    const seed = '5d2d9ad10c8ec0b8bdc160bb';
    let prevPage;
    let currId = seed;
    let i = 0;
    do {
      console.log(`Iteration ${i}`, `Least known ID ${currId}`)
      prevPage = await getRecords({
        query: { '_id': { $lt: new Mongo.ObjectID(currId) } },
        count: 200,
      });
      if (!prevPage.length) break;

      // update to smallest id in the previous page
      currId = prevPage[0]._id._str;
      i++;
    } while(true)
    console.log('First ID is currId')
  }
})();
