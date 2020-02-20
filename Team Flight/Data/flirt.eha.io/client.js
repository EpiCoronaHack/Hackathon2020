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

socket.send(JSON.stringify(page));


})()