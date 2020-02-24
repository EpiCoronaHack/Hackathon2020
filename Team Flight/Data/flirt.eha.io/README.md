## Description

JS and Python scripts used for fetching and storing flight data from [flirt.eha.io](https://flirt.eha.io/). The app uses [Meteor](https://www.meteor.com/) for its data-layer. We can exploit its remote procedure calls ([Meteor Methods](https://guide.meteor.com/methods.html)) and request the backend for flights schedules matching a specific mongo query.

### Data Statistics

These stats are true as of the day of this commit. To obtain an updated report, run the following in the browser dev tools after loading the [app](https://flirt.eha.io/):

```console
// Print total number of records matching the specified query.
Meteor.call('flightsByQuery', query, 1, (err, res) => {
  if (err) console.log(err);
  console.log(res.totalRecords);
});
```

- The database contains a total of `224933` flight schedule records.  
  `query = {_id: {$exists: true}}`

- `17` of these schedules correspond to flights arriving in *Vancouver* from *China*.  
  `query = {"departureAirport.countryName": "China", "arrivalAirport._id": "YVR"}`
- `61` of these schedules correspond to flights arriving in *Canada* from *China*.  
  `query = {"departureAirport.countryName": "China", "arrivalAirport.countryName": "Canada"}`

### Flight Schedule Schema

```console
TODO
```

## Usage

By default the client script will begin downloading _all_ the flight schedule records beginning from departure airport code `AAA`. If you wish to start downloading from a higher code value, update `fromDeptCode` arg for `beginFetching` function call in `client.js`.

### Boot the application

**Storage Server Startup**  

```console
cd Team Flight/Data/flirt.eha.io
pip install -r requirements.txt
python writer.py <data_output_volume>
```

**Client Startup**  
Following instructions have been tested on chrome.

1. Go to <https://flirt.eha.io/> and wait for site to finish loading.
2. Open browser console (`ctrl-shift-j`)
3. Paste `client.js` script and press enter.

The browser should begin downloading pages for each departure airport and sending them to the server for permanent storage.

### Accidental Termination

In case, the server or the client is terminated or stops responding mid-way, take note of the name for last page file written in server logs. The page file name follows the convention: `<departure-airport-code>-<page-size>.json`. Use the `<departure-airport-code>` as `fromDeptCode` for `beginFetching` call in `client.js`.

## Development

If you wish to run a file watcher to automatically restart storage server on file save event:

```console
pip install watchdog
watchmedo auto-restart --directory=<flirt.eha.io> -p="*.py" -- python writer.py <data_output_volume>
```
