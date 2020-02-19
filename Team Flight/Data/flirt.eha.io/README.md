## Description

JS scripts used for fetching flight data from <https://flirt.eha.io/>

flirt.eha.io uses [Meteor](https://www.meteor.com/) for its data-layer. We can exploit its remote procedure ([Meteor Methods](https://guide.meteor.com/methods.html)) and query the backend for flights leaving a given region (city, country, airport, etc).

## Usage

 1. Go to <https://flirt.eha.io/>
 2. Open browser console (ctrl-shift-j in chrome)
 3. Paste `index.js` script and press enter.
 4. If successful, the requested flight schedules information will be logged to console.

 > **Note:** For possible list of airport codes, analyze websockets connection while searching for flights through UI by country or city. Look for call to `flightsByQuery` method. You may also manually find the airport codes from other resources on the internet.

## Data Transformation

You're welcome to use only the raw data returned from the server. But if you choose to export the transformed schedules data, keep the following in mind:

> 1. The raw data contains departure and arrival time **without** the date for every flight schedule. To obtain the departure and arrival times with date, we make an assumption that none of the flights have travel duration longer than day.

> 2. The schedules with missing arrival airport information are omitted.

#### Transformed Data Schema

```console
{
  flight_id,
  total_seats,
  effective_date,     flight authorized to run on specified schedule
  discontinued_date,  flight discontinued to run on specified schedule
  days_scheduled      [list] boolean array corresponding to whether a flight
                             is scheduled on a given weekday or not
  departure: {
    airport_code,
    city,
    country,
    global_region,
    times,            [list] in UTC; every index corresponds with arrival.times
    loc: {
      type,
      coordinates,    [list] in form [longitude, latitude]
    },

  }
  arrival: {
    airport,
    city,
    country,
    global_region,
    times,            [list] in UTC; every index corresponds with departure.times
    loc: {
      type,
      coordinates,
    },
  }

}
```
