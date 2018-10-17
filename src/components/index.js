import React, { Component } from "react";
import Grid from "./Grid";
class App extends Component {
  // componentDidMount() {
  //   Soundfont.instrument(new AudioContext(), "fiddle").then(function(clavinet) {
  //     clavinet.play("C4");
  //   });
  // }
  render() {
    return (
      <div className="App">
        <h1 className="heading">Midi Mixer</h1>
        <Grid />
        <div className="button-group">
            <button>
                Play
            </button>
            <button>
                Stop
            </button>
            <button>
                Pause
            </button>
        </div>
      </div>
    );
  }
}

export default App;
