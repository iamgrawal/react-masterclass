import React, { Component } from "react";
import Grid from "./Grid";
class App extends Component {
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
