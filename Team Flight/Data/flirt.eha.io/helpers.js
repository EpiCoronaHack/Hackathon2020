// Query the backend for flight information
function getFlights({ airport_code_list, start_date, end_date }, callback) {
  // This query was built by analyzing the network communication with meteor backend
  query = {
    discontinuedDate: { $gte: start_date },
    effectiveDate: { $lte: end_date },
    "departureAirport._id": { $in: airport_code_list }
  }

  // TODO: what is third parameter used for?
  Meteor.call('flightsByQuery', query, 3000, callback);
}

/**
 * Transform flights objects recieved from server 
 * to fit the schema in README.md
 * @param {Array} flights 
 * @param {Date Array} [time_range] filter between given time range [start, end]
 */
function transform(flights) {
  flights.map(fl => {
    // simple object key mapping
    flight = {
      flight_id: `${fl.carrier}${fl.flightNumber}`,
      total_seats: fl.total_seats,
      effective_date: fl.effectiveDate,
      discontinued_date: fl.discontinuedDate,
      departure: {
        airport_code: fl.departureAirport._id,
        city: fl.departureAirport.city,
        country: fl.departureAirport.countryName,
        global_region: fl.departureAirport.globalRegion,
        loc: fl.loc,
      },
      arrival: {
        airport_code: fl.arrivalAirport._id,
        city: fl.arrivalAirport.city,
        country: fl.arrivalAirport.countryName,
        global_region: fl.arrivalAirport.globalRegion,
        loc: fl.loc,
      },
    }

    // TODO days

    // Restrict departure/arrival and times
    if (time_range) {
      
    }

    return flight;
  });

  return flights;
}