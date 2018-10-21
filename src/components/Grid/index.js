import React from "react";
import { socket } from "../../utils/socketClient";
import { hexToRGB } from "../../utils/convertor";
import Soundfont from "soundfont-player";
import { notes, instruments, soundFonts } from "../../utils/layoutConfig";
class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.soundfont = [];
  }
  componentDidMount() {
    socket.on("notePlayed", data => {
      this.props.midiContainer.toggleGridCell(data.instrument, data.note);
    });
  }

  /**
   * plays the corresponding sound of the instrument node
   * @param {string} instrument
   * @param {string} note
   */
  playCorrespondingNode = (instrument, note, isCellActive, index) => {
    if (!isCellActive) {
      Soundfont.instrument(new AudioContext(), instrument.name).then(ins => {
        ins.play(note);
      });
      // soundFonts[index].play(note);
    }
    socket.emit("notePlayed", {
      instrument: instrument,
      note: note
    });
  };

  /**
   * gets notes for each instruments and displays it in the table
   * @param {object} instrument
   */
  getInstrumentsNote = (instrument, idx) => {
    const { midiContainer } = this.props;
    return notes.map((item, index) => {
      const isCellActive = midiContainer.state.midiGrid[
        instrument.name
      ].indexOf(item.note);
      return (
        <div
          className={`cell ${isCellActive > -1 ? `active` : ``}`}
          key={`Item${item.note}`}
          style={{
            backgroundColor: hexToRGB(instrument.color, index / 10 + 0.2)
          }}
          onClick={() =>
            this.playCorrespondingNode(
              instrument,
              item.note,
              isCellActive > -1,
              idx
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
          {instruments.map((item, index) => {
            return (
              <div className="row" key={item.color}>
                {this.getInstrumentsNote(item, index)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Grid;
