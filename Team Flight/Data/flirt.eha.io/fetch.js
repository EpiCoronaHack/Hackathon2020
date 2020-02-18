/**
 * Script used for fetching flight data from https://flirt.eha.io/
 * 
 * Description:
 * flirt.eha.io uses Meteor for its data-layer. We can use remote procedure 
 * calls (RPC) using Meteor methods and query the backend for flights
 * leaving a given region (city, country, airport, etc).
 * 
 * Usage:
 * 1. Go to https://flirt.eha.io/
 * 2. Open browser console (ctrl-shift-j in chrome)
 * 3. Paste this script and press enter.
 * 4. If successfull, the variable 'flights' contains the requested flight information.
 * 
 * Airport Codes:
 * For possible list of airport codes, analyze websockets connection while searching for flights through UI by country or city. Look for call to `flightsByQuery` method. You may also airport find the codes from other resources.
 */
