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


})()