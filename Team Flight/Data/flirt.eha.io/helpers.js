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
function transform(flights, time_range) {
  flights = flights.map(fl => {
    time_range = time_range || [fl.effectiveDate, fl.discontinuedDate];

    // get days of week and dates that the flight is scheduled for
    days_scheduled = []
    for (let i = 1; i <= 7; i++) {
      days_scheduled[i] = fl[`day${i}`];
    }
    dates_scheduled = generateDates(time_range, days_scheduled);

    // if flight not running within the specified time_range
    if (!dates_scheduled.length) return null;
    flight = {
      days_scheduled,
    };

    // simple object key mapping
    flight = {
      ...flight,
      flight_id: `${fl.carrier}${fl.flightNumber}`,
      total_seats: fl.totalSeats,
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

  return flights.filter(flight => flight != null);
}

/**
 * Generate list of dates between given time range.
 * Then filter out dates based on `filter_weekdays` list.
 * 
 * @param {Date Array} range given time range [start, end]
 * @param {Array} [filter_weekdays] given time range [start, end]
 */
function generateDates(range, weekdays_to_kept) {
  // keep all weekdays by default
  weekdays_to_kept = weekdays_to_kept || Array(8).fill().map(() => true);
  // Truncate day time from range
  range = range.map(date => new Date(date.toDateString()));

  dates = []
  let date = new Date(range[0]);
  let day = date.getDay();
  // iterate through all days in given range and keep only specified weekdays
  while(date <= range[1]) {
    if (weekdays_to_kept[day]) dates.push(new Date(date));
    // increment to next day
    date = new Date(date.setDate(date.getDate() + 1));
    day = date.getDay();
  }

  return dates;
}
