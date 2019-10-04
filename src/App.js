import React from "react";
import logo from "./logo.svg";
import * as d3 from "d3";
import "./App.css";
import Dispersion from "./components/dispersion";
import Bars from "./components/bars";
import Line from "./components/line";

function App() {
  return (
    <div className="App">
      <div className="component__container">
        <Dispersion />
      </div>
      <div className="component__container">
        <Bars />
      </div>
      <div className="component__container">
        <Line />
      </div>
    </div>
  );
}

export default App;
