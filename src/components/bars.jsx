import React, { useEffect } from "react";
import * as d3 from "d3";

function Bars() {
  const intToRGB = function(value, alpha, max) {
    var valueAsPercentageOfMax = value / max;
    // actual max is 16777215 but represnts white so we will take a max that is
    // below this to avoid white
    var MAX_RGB_INT = 16600000;
    var valueFromMaxRgbInt = Math.floor(MAX_RGB_INT * valueAsPercentageOfMax);

    //credit to https://stackoverflow.com/a/2262117/2737978 for the idea of how to implement
    var blue = Math.floor(valueFromMaxRgbInt % 256);
    var green = Math.floor((valueFromMaxRgbInt / 256) % 256);
    var red = Math.floor((valueFromMaxRgbInt / 256 / 256) % 256);

    return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
  };
  const dataset = [1, 17, 36, 87, 12, 134, 56, 90, 38, 5, 78, 92, 29, 55, 46, 97, 120];

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, d => d)])
    .range([0, 500]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, d => d)])
    .range([0, 200]);

  const calculatePosition = (d, i) => {
    return i * (500 / dataset.length);
  };

  const calculateHeight = d => {
    return 200 - d;
  };

  useEffect(() => {});

  const renderGraphic = data => {
    return (
      <>
        {data.map((elem, index) => {
          return (
            <>
              <g transform="scale(1,-1) translate(0,-200)">
                <rect
                  x={calculatePosition(elem, index)}
                  width={20}
                  r={5}
                  fill={intToRGB(elem * Math.random(), 0.8, 134)}
                >
                  <animate attributeName="height" from="0" to={elem} dur="0.5s" fill="freeze" />
                </rect>
              </g>
              <text y={220} x={calculatePosition(elem, index)}>
                {elem}
              </text>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <h3>Diagrama de barras</h3>
      <div className="container" style={{ position: "relative" }}>
        <svg
          style={{
            width: "500px",
            height: "200px",
            overflow: "overlay",
            borderBottom: "1px solid"
          }}
        >
          {renderGraphic(dataset)}
        </svg>
      </div>
    </div>
  );
}

export default Bars;
