import React from "react";
import Soundfont from "soundfont-player";

import { hexToRGB } from "../../utils/convertor";

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        { note: "C4" },
        { note: "C#4" },
        { note: "D4" },
        { note: "D#4" },
        { note: "E4" },
        { note: "F4" },
        { note: "F#4" },
        { note: "G4" },
        { note: "G#4" },
        { note: "A4" },
        { note: "A#4" },
        { note: "B4" }
      ],
      instruments: [
        {
          name: "acoustic_bass",
          color: "#EF5753"
        },
        {
          name: "acoustic_guitar_steel",
          color: "#FAAD63"
        },
        {
          name: "shanai",
          color: "#FFF382"
        },
        {
          name: "guitar_harmonics",
          color: "#51D88A"
        },
        {
          name: "xylophone",
          color: "#64D5CA"
        },
        {
          name: "violin",
          color: "#6CB2EB"
        },
        {
          name: "distortion_guitar",
          color: "#7886D7"
        },
        {
          name: "sitar",
          color: "#A779E9"
        },
        {
          name: "shamisen",
          color: "#FA7EA8"
        },
        {
          name: "electric_guitar_jazz",
          color: "#DAE1E7"
        }
      ],
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
