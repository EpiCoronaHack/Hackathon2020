## Description

JS and Python scripts used for fetching and storing flight data from [flirt.eha.io](https://flirt.eha.io/). The app uses [Meteor](https://www.meteor.com/) for its data-layer. We can exploit its remote procedure calls ([Meteor Methods](https://guide.meteor.com/methods.html)) and request the backend for flights schedules matching a specific mongo query.

## Usage

By default the client script will begin downloading _all_ the flight schedule records beginning from departure airport code `AAA`. If you wish to start downloading from a higher code value, update `fromDeptCode` arg for `beginFetching` function call in `client.js`

### Boot the application

**Storage Server Startup**

```console
cd Team Flight/Data/flirt.eha.io
pip install -r requirements.txt
python writer.py <data_output_volume>
```

**Client Startup**  
> **Note:** Following instructions have only been tested on chrome.

1. Go to <https://flirt.eha.io/> and wait for site to finish loading.
2. Open browser console (`ctrl-shift-j`)
3. Paste `client.js` script and press enter.

The browser should begin downloading pages for each departure airport and sending them to the server for permanent storage.

### Accidental Termination

In case, the server or the client is terminated or stops responding mid-way, take note of the name for last page file written in server logs. The page file name follows the convention: `<departure-airport-code>-<page-size>.json`. When restarting the procedure, use the `<departure-airport-code>` as `fromDeptCode` for `beginFetching` call in `client.js`.

## Quickly Fetching Data Statistics

To obtain an updated report on stats without downloading all the data, run the following in the browser console after loading the [app](https://flirt.eha.io/):

```console
// Print total number of records matching the specified query.
Meteor.call('flightsByQuery', query, 1, (err, res) => {
  if (err) console.log(err);
  console.log(res.totalRecords);
});
```

> Refer to the [schema below](#raw-flight-schedule-schema) to build your query.

#### Examples

- The database contains a total of `224933` flight schedule records.  
  `query = {_id: {$exists: true}}`

- `17` of these schedules correspond to flights arriving in _Vancouver_ from _China_.  
  `query = {"departureAirport.countryName": "China", "arrivalAirport._id": "YVR"}`
- `61` of these schedules correspond to flights arriving in _Canada_ from _China_.  
  `query = {"departureAirport.countryName": "China", "arrivalAirport.countryName": "Canada"}`

### Raw Flight Schedule Schema

<pre>
{
  _id,                 [object]  contains mongo document `oid`
  effectiveDate,       [string]  flight authorized to run on this schedule
  discontinuedDate,    [string]  flight discontinued to run on this schedule
  day1                [boolean]  whether flight is scheduled on Monday (UTC)
  day2                [boolean]  whether flight is scheduled on Tuesday (UTC)
  ⋮
  day7                [boolean]  whether flight is scheduled on Sunday (UTC)

  carrier              [string]  carrier airline company code
  flightNumber         [number]
  totalSeats,          [number]  total occupancy of flight
  departureTimeUTC     [string]
  arrivalTimeUTC       [string]

  departureAirport: {
    _id,               [string]  airport iata code
    name,              [string]  airport full name
    notes              [string]  any relevant info about the airport
    city,              [string]
    state              [string]  state code
    stateName          [string]  state full name
    country,             [null]  not relevant; always null
    countryName,       [string]
    WAC                [number]  World Area Code
    globalRegion,      [string]
    loc: {
      type,            [string]
      coordinates,       [list]  [longitude, latitude]
    },
  }
  arrivalAirport:      [object]  same structure as `departureAirport`

  calculatedDates:       [list]  verified schedule dates recorded by server?
  scheduleFileName:    [string]  *unknown; file name search to some  
                                 <a href="http://apps.eha.io/flight-data-validation.html">analysis conducted by flirt</a>
  flightsOverInterval: [number]  *unknown; all records have value 0
  seatsOverInterval:   [number]  *unknown; all records have value 0
}
</pre>

## Data Transformation

Best way is to simply import all json files into mongoDB to perform local queries:  
`for file in <raw_data_dir>/*.json; do mongoimport -h localhost:27017 --db corona --collection schedules --type json --file $file; done`

> Refer to `transformation` directory for mongoDB transformation scripts.  
> Configure any necessary collection indexes to speed up computation.

### Extracted Datasets

1. [Flight Schedules](https://drive.google.com/open?id=1EZJpA_x2zXbgEQ86Y3StAI2pOISjaWmm) from coronavirus [infected countries](https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6) to Vancouver.
2. [Flight Schedules](https://drive.google.com/open?id=18zIs2o6TPMN2XrSNphxZDaqpF_xmcLd4) from coronavirus [infected countries](https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6) to cities with *high outbound traffic* to Vancouver.
   - Can be used as an intermediary layer between affected areas and Vancouver (Dataset 1).
   - A city is considered to have high outbound traffic if `total-seats/week` is at least `5000`.

## Development

If you wish to run a file watcher to automatically restart storage server on file save event:

```console
pip install watchdog
watchmedo auto-restart --directory=<this-dir> -p="*.py" -- python writer.py <data_output_volume>
```

## Licensing
Feel free to redistribute or modify these scripts but be mindful of the fact that we **do not** own any rights to the data or the server query methods.

If you choose to integrate these scripts with the flirt application code, please adhere to licensing guidelines for thier application found [here](https://github.com/ecohealthalliance/flirt). Contact the application owners to know about data usage limitations.

