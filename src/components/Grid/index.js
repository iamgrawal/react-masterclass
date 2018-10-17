import React from "react";
import Soundfont from "soundfont-player";

import { hexToRGB } from "../../utils/convertor";
import { instruments, notes } from "../../utils/layoutConfig";
class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      midiGrid: {
        acoustic_bass: [],
        acoustic_guitar_steel: [],
        shanai: [],
        guitar_harmonics: [],
        xylophone: [],
        violin: [],
        distortion_guitar: [],
        sitar: [],
        shamisen: [],
        electric_guitar_jazz: []
      }
    };
  }

  playCorrespondingNode = (instrument, note, isCellActive) => {
    const { midiGrid } = this.state;
    if (!isCellActive) {
      Soundfont.instrument(new AudioContext(), instrument).then(instrument => {
        instrument.play(note);
      });
      midiGrid[instrument].push(note);
    } else {
      midiGrid[instrument].splice(note, 1);
    }
    this.setState({
      midiGrid
    });
  };
  getInstrumentsNote = instrument => {
    return this.state.notes.map((item, index) => {
      const isCellActive = this.state.midiGrid[instrument.name].indexOf(
        item.note
      );
      return (
        <div
          className={`cell ${isCellActive > -1 ? `active` : ``}`}
          key={`Item${item.note}`}
          style={{
            backgroundColor: hexToRGB(instrument.color, index / 10 + 0.1)
          }}
          onClick={() =>
            this.playCorrespondingNode(
              instrument.name,
              item.note,
              isCellActive > -1
            )
          }
        >
          {item.note}
        </div>
      );
    });
  };
  render() {
    return (
      <div className="matrix">
        <div className="row">
          {this.state.instruments.map(item => {
            return (
              <div className="row" key={item.color}>
                {this.getInstrumentsNote(item)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Grid;
