import React, { Component } from "react";

import { instruments } from "../utils/layoutConfig";

import Grid from "./Grid";
import MidiContainer, { midiContainer } from "../containers/midi.container";
import { Subscribe } from "unstated";
class App extends Component {
  getInstrumentsName = () => {
    return instruments.map(instrument => (
      <li key={instrument.name}>{instrument.name.replace(/_/g, " ")}</li>
    ));
  };
  handlePauseButton = () => {

  };
  render() {
    return (
      <div className="App">
        <h1 className="heading">Midi Mixer</h1>
        <div className="music-container">
          {/* <ul className="instruments-list">{this.getInstrumentsName()}</ul> */}
          <Subscribe to={[MidiContainer]}>
            {midiContainer => <Grid midiContainer={midiContainer} />}
          </Subscribe>
        </div>
        <div className="button-group">
          <button onClick={midiContainer.playMidi}>Play</button>
          <button onClick={midiContainer.stopMidi}>Stop</button>
          <button onClick={this.handleStopButton}>Pause</button>
        </div>
      </div>
    );
  }
}

export default App;
