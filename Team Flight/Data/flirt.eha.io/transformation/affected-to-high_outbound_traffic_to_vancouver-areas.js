/**
 * mongo script to extract schedules from corona affected contries to cities
 * with high outbound traffic to vancouver
 * Note: This script is to be run inside mongo shell or any mongo GUI client
 */

// countries extracted from https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6
let affectedAreas = ['Mainland China', 'South Korea', 'Others', 'Italy', 'Japan', 'Singapore', 'Hong Kong', 'Iran', 'US', 'Thailand', 'Taiwan', 'Australia', 'Malaysia', 'Germany', 'Vietnam', 'United Arab Emirates', 'UK', 'France', 'Canada', 'Macau', 'Kuwait', 'Spain', 'Philippines', 'India', 'Bahrain', 'Russia', 'Oman', 'Afghanistan', 'Nepal', 'Cambodia', 'Israel', 'Belgium', 'Lebanon', 'Finland', 'Sweden', 'Iraq', 'Egypt', 'Sri Lanka'];

// 'Others' contryName is not in database
affectedAreas = affectedAreas.filter((c) => c !== 'Others');

// map contry names to country names in schedules
const map = {
  'Mainland China': 'China',
  US: 'United States',
  UK: 'United Kingdom',
};
affectedAreas = affectedAreas.map((c) => map[c] || c);

// departure cities with maximum-outbound-traffic in a week lower than this value are ignored
const minTrafficThreshhold = 5000;
// Get affected areas to vancouver results into temp affectedToVan collection
const highOutboundTrafficToVanCities = db.schedules.aggregate([
  {
    $match:
        {
          'departureAirport.countryName': { $in: affectedAreas },
          'arrivalAirport.city': 'Vancouver',
        },
  },
  // calculate maximum traffic in a week supported by a given schedule
  {
    $project: {
      totalTrafficInWeek: {
        $sum: [
          { $cond: ['$day1', '$totalSeats', 0] },
          { $cond: ['$day2', '$totalSeats', 0] },
          { $cond: ['$day3', '$totalSeats', 0] },
          { $cond: ['$day4', '$totalSeats', 0] },
          { $cond: ['$day5', '$totalSeats', 0] },
          { $cond: ['$day6', '$totalSeats', 0] },
          { $cond: ['$day7', '$totalSeats', 0] },
        ],
      },
      'departureAirport.city': 1,
    },
  },
  // group by departure city to calculate cities with highest output traffic
  {
    $group: {
      _id: '$departureAirport.city',
      totalOutBoundTrafficInOneWeek: { $sum: '$totalTrafficInWeek' },
    },
  },
  {
    $match: {
      totalOutBoundTrafficInOneWeek: { $gte: minTrafficThreshhold },
    },
  },
  {
    $sort: {
      totalOutBoundTrafficInOneWeek: -1,
    },
  },
])
// map objects to city names
  .map((el) => el._id);

// console.log(highOutboundTrafficToVanCities);

// filter records based on this query
const filter = {
  'departureAirport.countryName': { $in: affectedAreas },
  'arrivalAirport.city': { $in: highOutboundTrafficToVanCities },
};

// Export the result to csv based on `filter`
db.schedules.aggregate([
  {
    $match: filter,
  },
  // extract fields for csv
  {
    $addFields: {
      flightId: { $concat: ['$carrier', '-', { $toString: '$flightNumber' }] },

      // extract $departureAirport
      departureID: '$departureAirport._id',
      departureName: '$departureAirport.name',
      departureCoordinates: '$departureAirport.loc.coordinates',
      departureCity: '$departureAirport.city',
      departureStateID: '$departureAirport.state',
      departureStateName: '$departureAirport.stateName',
      departureCountry: '$departureAirport.countryName',
      departureGlobalRegion: '$departureAirport.globalRegion',
      departureWAC: '$departureAirport.WAC',
      departureNotes: '$departureAirport.notes',

      // extract $arrivalAirport
      arrivalID: '$arrivalAirport._id',
      arrivalName: '$arrivalAirport.name',
      arrivalCoordinates: '$arrivalAirport.loc.coordinates',
      arrivalCity: '$arrivalAirport.city',
      arrivalStateID: '$arrivalAirport.state',
      arrivalStateName: '$arrivalAirport.stateName',
      arrivalCountry: '$arrivalAirport.countryName',
      arrivalGlobalRegion: '$arrivalAirport.globalRegion',
      arrivalWAC: '$arrivalAirport.WAC',
      arrivalNotes: '$arrivalAirport.notes',
    },
  },
  // remove non-essential fields
  {
    $project: {
      _id: 0,
      calculatedDates: 0,
      departureAirport: 0,
      arrivalAirport: 0,
      flightNumber: 0,
      carrier: 0,
    },
  },
]);
