# SVG Timeseries

A function for rendering an SVG string of a very rudimentary time series plot.

## Installation

`npm install https://github.com/TomasHubelbauer/svg-timeseries`

## Usage

```javascript
const timeseries = require('svg-timeseries');

const svg = timeseries(640, 480, 10, 'gray',
  { color: 'blue', points: [{ x: 0, y: 5 }, { x: 1, y: 4, x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }] },
  { color: 'maroon', points: [{ x: 0, y: 1 }, { x: 1, y: 2, x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }] },
);

// `svg` contains the SVG string
```

## Running

`node test ${browser}`

`browser` is the web browser (or any other executable) you want to open with:

- `firefox`
- `chrome`
- …

## Testing

See *Running*.

## Changelog

### `1.0.0` 2020-02-29

Initial release.
