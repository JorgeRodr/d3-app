import React, { useState } from "react";
import * as d3 from "d3";

function Line() {
  const [hover, setHover] = useState(null);
  const lineGenerator = d3.line().curve(d3.curveCardinal);

  const points = [[0, 80], [100, 100], [200, 30], [300, 50], [400, 40], [500, 80]];

  const pathData = lineGenerator(points);

  return (
    <div>
      <h3>Línea curva</h3>
      <div className="container">
        <svg className="line" width="500" height="200" style={{ overflow: "overlay" }}>
          <path d={pathData} style={{ fill: "none", stroke: "#999" }}></path>
          {points.map((point, index) => (
            <>
              <circle
                onMouseEnter={() => {
                  setHover(index);
                }}
                onMouseLeave={() => {
                  setHover(null);
                }}
                cx={point[0]}
                cy={point[1]}
                r={3}
              ></circle>
              <text
                x={point[0] + 5}
                y={point[1] - 5}
                style={{ fontSize: "12px", visibility: hover === index ? "visible" : "hidden" }}
              >
                {point[0]},{point[1]}
              </text>
            </>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default Line;
