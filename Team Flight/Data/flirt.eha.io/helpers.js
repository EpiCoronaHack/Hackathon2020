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

}
