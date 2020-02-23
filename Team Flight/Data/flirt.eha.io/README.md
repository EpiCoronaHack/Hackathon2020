## Description

JS scripts used for fetching flight data from [flirt.eha.io](https://flirt.eha.io/). The app uses [Meteor](https://www.meteor.com/) for its data-layer. We can exploit its remote procedure calls ([Meteor Methods](https://guide.meteor.com/methods.html)) and request the backend for flights schedules matching a specific mongo query.

### Data Statistics

As of the day of this commit, the database contains a total of `224927` flight schedule records. To obtain an updated report, run the following in the browser dev tools after loading the [app](https://flirt.eha.io/):

```console
// Records with valid departure airports
Meteor.call('flightsByQuery', { 'departureAirport._id': { $gt: 'AAA' } }, 1, (err, res) => {
  if (err) console.log(err);
  console.log(res.totalRecords);
});

// Records with missing departure airports
Meteor.call('flightsByQuery', { 'departureAirport._id': null }, 1, (err, res) => {
  if (err) console.log(err);
  console.log(res.totalRecords);
});
```

Total both outputted values.

### Flight Schedule Schema

```console
TODO
```

## Usage

By default the client script will begin downloading _all_ the flight schedule records beginning from departure airport code `AAA`. If you wish to start downloading from a higher code value, update `fromDeptCode` arg to `beginFetching` function call in `client.js`.

### Boot the application

**Server startup**  
`python writer.py <data_output_volume>`

**Client startup**  
Following instructions have been tested on chrome.

1. Go to <https://flirt.eha.io/> and wait for site to finish loading.
2. Open browser console (`ctrl-shift-j`)
3. Paste `client.js` script and press enter.

The browser should begin downloading pages for each departure airport and sending them to the server for permanent storage.

### Accidental termination

In case, the server or the client is terminated or stops responding mid-way, take note of the name for last page file written in server logs. The page file name follows the convention: `<departure-airport-code>-<page-size>.json`. Use the `<departure-airport-code>` as `fromDeptCode` for `beginFetching` call in `client.js`.

## Development

If you wish to run a file watcher to automatically restart storage server on file save event:

```console
pip install watchdog
watchmedo auto-restart --directory=<flirt.eha.io> -p="*.py" -- python writer.py <data_output_volume>
```
