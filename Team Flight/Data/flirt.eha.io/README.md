## Description

JS scripts used for fetching flight data from flirt.eha.io. The app uses [Meteor](https://www.meteor.com/) for its data-layer. We can exploit its remote procedure calls ([Meteor Methods](https://guide.meteor.com/methods.html)) and request the backend for flights schedules matching a specific mongo query.

### Data Statistics

TODO

### Flight Schedule Schema

```console
TODO
```

## Usage

By default booting the application will begin downloading _all_ the flight schedule records. If you wish to download only a limited set, update the `query` arg to `getRecords` in `index.js` based on the schema above.

### Boot the application

TODO: Add server startup

TODO: Add client startup
Following instructions have been tested on chrome.

1. Go to <https://flirt.eha.io/> and wait for site to finish loading
2. Open browser console (`ctrl-shift-j`)
3. Paste `client.js` script and press enter.

The browser should begin downloading incremental pages and sending them to the server to permanent storage.

### Accidental termination

In case, the server or the client terminated or stops responding mid-way, take note of the name for last page file written in server logs. The page file name follows the convention: `<first-id>-<last-id>-<page-size>.json`. Use the `<last-id>` as `initialId` for `beginFetching` call in `client.js`.
