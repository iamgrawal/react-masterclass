import React, { Component } from "react";

import { instruments } from "../utils/layoutConfig";

import Grid from "./Grid";
class App extends Component {
  getInstrumentsName = () => {
    return instruments.map(instrument => (
      <li key={instrument.name}>{instrument.name.replace(/_/g, " ")}</li>
    ));
  };
  render() {
    return (
      <div className="App">
        <h1 className="heading">Midi Mixer</h1>
        <div className="music-container">
          {/* <ul className="instruments-list">{this.getInstrumentsName()}</ul> */}
          <Grid />
        </div>
        <div className="button-group">
          <button>Play</button>
          <button>Stop</button>
          <button>Pause</button>
        </div>
      </div>
    );
  }
}

export default App;
