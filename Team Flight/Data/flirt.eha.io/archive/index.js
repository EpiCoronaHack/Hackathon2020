// TODO: Automate generation of this script by importing fetch.js and helpers.js
(() => {
  /**
 * Script used for fetching flight data from https://flirt.eha.io/
 *
 ***
 * Description:
 * flirt.eha.io uses Meteor for its data-layer. We can exploit its remote
 * procedure (Meteor methods) and query the backend for flights leaving
 * a given region (city, country, airport, etc).
 *
 ***
 * Usage:
 * 1. Go to https://flirt.eha.io/
 * 2. Open browser console (ctrl-shift-j in chrome)
 * 3. Paste this script and press enter.
 * 4. If successful, the requested flight information will be logged to console.
 *
 ***
 * Airport Codes:
 * For possible list of airport codes, analyze websockets connection while
 * searching for flights through UI by country or city. Look for call to
 * `flightsByQuery` method. You may also find the airport codes from other
 * resources on the internet.
 *
 **********************
 * Author: Lavneet Puri
 */

  /** fetch.js * */

  // All the airports in China
  airport_codes = ['AAT', 'ACX', 'AEB', 'AHJ', 'AKU', 'AOG', 'AQG', 'AVA', 'AXF', 'BAV', 'BFJ', 'BHY', 'BPE', 'BPL', 'BPO', 'BPX', 'BSD', 'CAN', 'CGD', 'CGO', 'CGQ', 'CHG', 'CIF', 'CIH', 'CKG', 'CSX', 'CTU', 'CWJ', 'CZX', 'DAT', 'DAX', 'DBC', 'DCY', 'DDG', 'DDV', 'DHU', 'DIG', 'DLC', 'DLU', 'DNH', 'DOY', 'DQA', 'DSN', 'DYG', 'DYN', 'EJN', 'ENH', 'ENY', 'ERL', 'FOC', 'FUG', 'FUO', 'FYG', 'FYJ', 'FYN', 'GKW', 'GMQ', 'GOQ', 'GXH', 'GYS', 'GYU', 'HAK', 'HBP', 'HCJ', 'HDG', 'HEK', 'HET', 'HFE', 'HGH', 'HIA', 'HJJ', 'HLD', 'HLH', 'HMI', 'HNY', 'HPG', 'HRB', 'HSD', 'HSN', 'HTN', 'HTT', 'HUO', 'HUZ', 'HXD', 'HYN', 'HZG', 'HZH', 'INC', 'IQM', 'IQN', 'IUO', 'JDZ', 'JGD', 'JGN', 'JGS', 'JHG', 'JIC', 'JIQ', 'JIU', 'JJN', 'JMU', 'JNG', 'JNZ', 'JUH', 'JUZ', 'JXA', 'JXS', 'JYQ', 'JZH', 'KCA', 'KGT', 'KHG', 'KHN', 'KJH', 'KJI', 'KMG', 'KOW', 'KRL', 'KRY', 'KVN', 'KWE', 'KWL', 'LCX', 'LDS', 'LFQ', 'LHW', 'LJG', 'LLB', 'LLF', 'LLV', 'LNJ', 'LPF', 'LQP', 'LQQ', 'LQS', 'LUM', 'LXA', 'LYA', 'LYG', 'LYI', 'LZH', 'LZO', 'LZY', 'MDG', 'MIG', 'MXZ', 'NAO', 'NAY', 'NBS', 'NDG', 'NGB', 'NGQ', 'NHG', 'NKG', 'NKJ', 'NLH', 'NLT', 'NNG', 'NNY', 'NTG', 'NZH', 'NZL', 'OHE', 'PEK', 'PVG', 'PXG', 'PZI', 'QHX', 'RHT', 'RIZ', 'RKZ', 'RLK', 'RLZ', 'SHA', 'SHE', 'SHF', 'SHS', 'SJW', 'SQJ', 'SWA', 'SYG', 'SYM', 'SYX', 'SZV', 'SZX', 'TAO', 'TCG', 'TCZ', 'TEN', 'TGO', 'TGX', 'THQ', 'TJJ', 'TLQ', 'TNA', 'TNH', 'TSN', 'TVS', 'TVX', 'TXN', 'TYN', 'UCB', 'URC', 'UYN', 'VBL', 'WDS', 'WEC', 'WEF', 'WEH', 'WLI', 'WNH', 'WNZ', 'WUA', 'WUH', 'WUS', 'WUT', 'WUX', 'WUZ', 'WXN', 'WZQ', 'XFN', 'XIC', 'XIL', 'XIY', 'XMN', 'XNN', 'XUZ', 'XYW', 'YBP', 'YCU', 'YIC', 'YIE', 'YIH', 'YIN', 'YIW', 'YKH', 'YNJ', 'YNT', 'YNZ', 'YTY', 'YUG', 'YUS', 'YZY', 'ZAT', 'ZGN', 'ZHA', 'ZHY', 'ZIY', 'ZNG', 'ZQZ', 'ZTI', 'ZUH', 'ZUI', 'ZUJ', 'ZYI', 'ZYK'];

  // contains transformed schedules data based on schema in README.md
  // month when coronavirus began
  const start_date = new Date('Nov 1 2019');
  const end_date = new Date('Feb 19 2020');
  let schedules;

  getSchedules({
    airport_codes, start_date, end_date, limit: 3000,
  },
  (err, res) => {
    if (err) console.log('Requests was unsuccessful', err);

    console.log('Raw Data', res);
    schedules = transform(res.flights, [start_date, end_date]);
    console.log('Transform Data', schedules);
  });
  console.log('Waiting for data...');


  /** helpers.js * */

  /**
 * Query the backend for flight information
 * @param {StringArray} airport_codes list of iata airport codes
 * @param {Number} limit number of records fetched
 */
  function getSchedules({
    airport_codes, start_date, end_date, limit,
  }, callback) {
  // This query was built by analyzing the network communication with meteor backend
  // Commented fields are likely not indexed in mongo, resulting in huge computation time
    query = {
      'departureAirport._id': { $in: airport_codes },
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
      'departureAirport._id': { $in: airport_codes },
    };
    const count = 0;
    Meteor.call('flightsByQuery', query, count, callback);
  }

  /**
 * Transform flights objects recieved from server
 * to fit the schema in README.md
 * @param {Array} flights raw flights array from the `flightsByQuery` RPC
 * @param {DateArray} [time_range] filter between given time range [start, end]
 */
  function transform(flights, time_range) {
    schedules = flights.map((fl) => {
    // TODO: log number of omitted entries
    // omit flight with missing arrival airport info
      if (!fl.arrivalAirport) { return null; }
      time_range = time_range || [fl.effectiveDate, fl.discontinuedDate];
      // get days of week and dates that the flight is scheduled for
      days_scheduled = [];
      for (let i = 1; i <= 7; i++) {
        days_scheduled[i] = fl[`day${i}`];
      }
      dates_scheduled = generateDates(time_range, days_scheduled);
      // if flight not running within the specified time_range
      if (!dates_scheduled.length) { return null; }
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
        if (fl.arrivalTimeUTC <= fl.departureTimeUTC) { date = new Date(date.setDate(date.getDate() + 1)); }
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
    return schedules.filter((schedule) => schedule != null);
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
    range = range.map((date) => new Date(date.toDateString()));
    dates = [];
    let date = new Date(range[0]);
    let day = date.getDay();
    // iterate through all days in given range and keep only specified weekdays
    while (date <= range[1]) {
      if (weekdays_to_keep[day]) { dates.push(new Date(date)); }
      // increment to next day
      date = new Date(date.setDate(date.getDate() + 1));
      day = date.getDay();
    }
    return dates;
  }
})();
