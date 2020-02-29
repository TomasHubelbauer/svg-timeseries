const timeseries = require('.');

const svg = timeseries(640, 480, 10, 'gray',
  { color: 'blue', points: [{ x: 0, y: 5 }, { x: 1, y: 4, x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }] },
  { color: 'maroon', points: [{ x: 0, y: 1 }, { x: 1, y: 2, x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }] },
);

if (!process.argv[2]) {
  throw new Error('Provide browser executable name in the command line argument.');
}

require('child_process').execSync(`${process.argv[2]} "data:image/svg+xml,${svg.replace(/"/g, '\'')}"`);
