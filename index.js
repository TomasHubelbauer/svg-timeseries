module.exports = function timeseries(
  /** @type {Number} */ width,
  /** @type {Number} */ height,
  /** @type {Number} */ trim,
  /** @type {String} */ color,
  /** @type {{ color: string; points: { x: number; y: number; }[] }[]} */
  ...series
) {
  if (series.length === 0) {
    throw new Error('No time series data was provided.');
  }

  if (series.some(s => s.points.length < 2)) {
    throw new Error('Some of the time series data was incomplete.');
  }

  let svg = `<svg version="1.1" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

  // Render the X axis
  svg += `<line x1="${trim / 2}" y1="${height - trim}" x2="${width - trim / 2}" y2="${height - trim}" stroke="${color}" />`;

  // Render the Y axis
  svg += `<line x1="${trim}" y1="${height - trim / 2}" x2="${trim}" y2="${trim / 2}" stroke="${color}" />`;

  const minimumX = Math.min(...series.map(s => s.points.reduce((a, c) => Math.min(a, c.x), s.points[0].x)));
  const maximumX = Math.max(...series.map(s => s.points.reduce((a, c) => Math.max(a, c.x), s.points[0].x)));
  const minimumY = Math.min(...series.map(s => s.points.reduce((a, c) => Math.min(a, c.y), s.points[0].y)));
  const maximumY = Math.max(...series.map(s => s.points.reduce((a, c) => Math.max(a, c.y), s.points[0].y)));

  // Render the individual series'
  for (const serie of series) {
    let polylineSvg = '<polyline points="';
    for (const point of serie.points) {
      // Map the x and y values to the area of the chart
      const x = trim + ((point.x - minimumX) / (maximumX - minimumX)) /* 0-1 */ * (width - trim * 2);
      const y = trim + (1 - (point.y / maximumY)) /* 1-0 */ * (height - trim * 2);
      polylineSvg += `${x},${y} `;

      // Render the X axis marker
      svg += `<line x1="${x}" y1="${height - trim / 2}" x2="${x}" y2="${height - trim - trim / 2}" stroke="${serie.color}" />`;

      // Render the Y axis marker
      svg += `<line x1="${trim / 2}" y1="${y}" x2="${trim + trim / 2}" y2="${y}" stroke="${serie.color}" />`;

      if (point.y === minimumY || point.y === maximumY) {
        svg += `<line x1="${trim / 2}" y1="${y}" x2="${width - trim / 2}" y2="${y}" stroke="gray" />`;
        svg += `<text x="${trim + trim / 2}" y="${y + 15}">${point.y}</text>`;
      }
    }

    polylineSvg += `" stroke="${serie.color}" fill="none" />`;
    svg += polylineSvg;
  }

  svg += '</svg>';
  return svg;
}
