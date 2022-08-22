import _ from "lodash";
import React from "react";
import Plot from "react-plotly.js";

const BarChart = ({ data, x, y, title, format }) => {
  const plotData = [
    {
      x: data[x],
      y: data[y],
      type: "bar",
    },
  ];
  const { width, height, tickformat } = format;

  const layout = {
    width,
    height,
    // title,
    xaxis: {
      tickangle: -35,
      tickformat, // For more time formatting types, see: https://github.com/d3/d3-time-format/blob/master/README.md
    },
    // autosize: true,
    // automargin: true,
    margin: {
      l: 25,
      r: 25,
      b: 75,
      t: 15,
      pad: 4,
    },
  };

  const config = { responsive: true };
  return (
    <div className="center-plotly">
      <Plot data={plotData} layout={layout} config={config}></Plot>
    </div>
  );
};

export default BarChart;
