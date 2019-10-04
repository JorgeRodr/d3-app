import React, { useEffect, useState } from "react";
import * as d3 from "d3";

function Dispersion() {
  const [hover, setHover] = useState(null);
  const roundToMultiple = (x, num) => {
    return Math.ceil(x / num) * num;
  };
  const dataset = [
    [5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88]
  ];
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, d => d[0])])
    .range([10, 500 - 10]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, d => d[1])])
    .range([200 - 10, 10]);

  const xAxis = d3.axisBottom().ticks(5);
  xAxis.scale(
    d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => roundToMultiple(d[0], 50))])
      .range([10, 500 - 10])
  );

  const yAxis = d3.axisLeft().ticks(5);
  yAxis.scale(
    d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => roundToMultiple(d[1], 20))])
      .range([200 - 10, 10])
  );

  useEffect(() => {
    d3.selectAll(".xAxis").call(xAxis);
    d3.selectAll(".yAxis").call(yAxis);
  });

  const renderGraphic = data => {
    return (
      <>
        {data.map((elem, index) => {
          return (
            <>
              <circle
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(null)}
                cy={yScale(elem[1])}
                cx={xScale(elem[0])}
                r={5}
              ></circle>
              <text
                y={yScale(elem[1])}
                x={xScale(elem[0]) + 10}
                style={{ fontSize: "12px", visibility: hover === index ? "visible" : "hidden" }}
              >
                {elem[0]},{elem[1]}
              </text>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <h3>Diagrama de dispersión</h3>
      <div className="container" style={{ position: "relative" }}>
        <svg
          style={{
            width: "500px",
            height: "200px",
            overflow: "overlay"
          }}
        >
          {renderGraphic(dataset)}
          <g className="xAxis" style={{ transform: "translate(0px, 200px)" }}></g>
          <g className="yAxis"></g>
        </svg>
      </div>
    </div>
  );
}

export default Dispersion;
