/**
 * Query the backend for flight information
 * @param {StringArray} airport_codes list of iata airport codes
 * @param {Number} limit number of records fetched
 */
function getSchedules({ airport_codes, start_date, end_date, limit }, callback) {
  // This query was built by analyzing the network communication with meteor backend
  // Commented fields are likely not indexed in mongo, resulting in huge computation time
  query = {
    "departureAirport._id": { $in: airport_codes },
    // discontinuedDate: { $gte: start_date },
    // effectiveDate: { $lte: end_date },
    // arrivalAirport: { $exists: true },
  };
  Meteor.call('flightsByQuery', query, limit, callback);
}

// Get total number of flight schedules in the database
function getSchedulesCount({ airport_codes, start_date, end_date }, callback) {
  query = {
    discontinuedDate: { $gte: start_date },
    effectiveDate: { $lte: end_date },
    "departureAirport._id": { $in: airport_codes }
  };
  // Prevent fetching the objects data
  let limit = 1;
  Meteor.call('flightsByQuery', query, limit, callback);
}

/**
 * Transform flights objects recieved from server
 * to fit the schema in README.md
 * @param {Array} flights raw flights array from the `flightsByQuery` RPC
 * @param {DateArray} [time_range] filter between given time range [start, end]
 */
function transform(flights, time_range) {
  schedules = flights.map(fl => {
    // TODO: log number of omitted entries
    // omit flight with missing arrival airport info
    if (!fl.arrivalAirport)
      return null;
    time_range = time_range || [fl.effectiveDate, fl.discontinuedDate];
    // get days of week and dates that the flight is scheduled for
    days_scheduled = [];
    for (let i = 1; i <= 7; i++) {
      days_scheduled[i] = fl[`day${i}`];
    }
    dates_scheduled = generateDates(time_range, days_scheduled);
    // if flight not running within the specified time_range
    if (!dates_scheduled.length)
      return null;
    // concatenate depature time with dates_scheduled to get departure times
    departure_times = [];
    for (i in dates_scheduled) {
      departure_times.push(new Date(dates_scheduled[i].setHours(...fl.departureTimeUTC.split(':'))));
    }
    // concatenate arrival time with dates_scheduled to get arrival times
    arrival_times = [];
    for (i in dates_scheduled) {
      let date = dates_scheduled[i];
      // Because flight schedules only contain departure/arrival times without
      // the date, we make an assumption that no direct flight travels longer
      // than 24-hours. Thus, if arrival time is less than departure time, its
      // day will increment by exactly 1.
      if (fl.arrivalTimeUTC <= fl.departureTimeUTC)
        date = new Date(date.setDate(date.getDate() + 1));
      arrival_times.push(new Date(date.setHours(...fl.arrivalTimeUTC.split(':'))));
    }
    // create schedule object
    schedule = {
      flight_id: `${fl.carrier}${fl.flightNumber}`,
      total_seats: fl.totalSeats,
      days_scheduled,
      effective_date: fl.effectiveDate,
      discontinued_date: fl.discontinuedDate,
      departure: {
        airport_code: fl.departureAirport._id,
        city: fl.departureAirport.city,
        country: fl.departureAirport.countryName,
        global_region: fl.departureAirport.globalRegion,
        times: departure_times,
        loc: fl.loc,
      },
      arrival: {
        airport_code: fl.arrivalAirport._id,
        city: fl.arrivalAirport.city,
        country: fl.arrivalAirport.countryName,
        global_region: fl.arrivalAirport.globalRegion,
        times: arrival_times,
        loc: fl.loc,
      },
    };
    return schedule;
  });
  return schedules.filter(schedule => schedule != null);
}

/**
 * Generate list of dates between given time range.
 * Then filter out dates based on `filter_weekdays` list.
 *
 * @param {DateArray} range given time range [start, end]
 * @param {Array} [filter_weekdays] given time range [start, end]
 */
function generateDates(range, weekdays_to_keep) {
  // keep all weekdays by default
  weekdays_to_keep = weekdays_to_keep || Array(8).fill().map(() => true);
  // Truncate day time from range
  range = range.map(date => new Date(date.toDateString()));
  dates = [];
  let date = new Date(range[0]);
  let day = date.getDay();
  // iterate through all days in given range and keep only specified weekdays
  while (date <= range[1]) {
    if (weekdays_to_keep[day])
      dates.push(new Date(date));
    // increment to next day
    date = new Date(date.setDate(date.getDate() + 1));
    day = date.getDay();
  }
  return dates;
}
