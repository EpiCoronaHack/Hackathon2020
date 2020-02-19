/**
 * Script used for fetching flight data from https://flirt.eha.io/
 * 
 * * ------------
 * Description:
 * flirt.eha.io uses Meteor for its data-layer. We can exploit its remote 
 * procedure (Meteor methods) and query the backend for flights leaving
 * a given region (city, country, airport, etc).
 * 
 * * ------------
 * Usage:
 * 1. Go to https://flirt.eha.io/
 * 2. Open browser console (ctrl-shift-j in chrome)
 * 3. Paste this script and press enter.
 * 4. If successful, the requested flight information will be logged to console.
 * 
 * * ------------
 * Airport Codes:
 * For possible list of airport codes, analyze websockets connection while
 * searching for flights through UI by country or city. Look for call to
 * `flightsByQuery` method. You may also find the airport codes from other
 * resources on the internet.
 */

// All the airports in China
airport_codes = ["AAT"];

// global flights variable containing fetched data from server
let flights;

getFlights({
  airport_code_list: airport_codes,
  start_date: new Date('Feb 18 2020'),
  end_date: new Date('Feb 18 2020'),
}, (err, res) => {
  if (err) {
    console.log("Requests was unsuccessfull.")
    console.log(err)
  }
  console.log(res)
  flights = res.flights
});
