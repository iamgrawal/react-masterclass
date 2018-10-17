import React from "react";
import Soundfont from 'soundfont-player';

import { hexToRGB } from "../../utils/convertor";
import { notes, instruments } from "../../utils/keys";

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {
        acoustic_bass: [],
        acoustic_guitar_steel: [],
        shanai: [],
        guitar_harmonics: [],
        xylophone: [],
        violin: [],
        distortion_guitar: [],
        sitar: [],
        shamisen:[],
        electric_guitar_jazz: []
      }
    };
  }

  /**
   * plays the corresponding sound of the instrument node
   * @param {string} instrument
   * @param {string} note
   */
  playCorrespondingNode = (instrument, note) => {
    var activeNotes = this.state.active;
    if(!activeNotes[instrument].includes(note)){
      activeNotes[instrument].push(note);
      Soundfont.instrument(new AudioContext(),instrument).then((instrument)=>{
        instrument.play(note);
      });
    }
    else
      activeNotes[instrument].pop(note);
    this.setState({active: activeNotes});    
  };

  /**
   * gets notes for each instruments and displays it in the table
   * @param {object} instrument
   */
  getInstrumentsNote = instrument => {
    return notes.map((item, index) => {
      return (
        <div
          className= {this.state.active[instrument.name].includes(item.note) ? "cell active" : "cell"}
          key={`Item${item.note}`}
          style={{
            backgroundColor: hexToRGB(instrument.color,index/10 + 0.2)
          }}
          onClick={() => this.playCorrespondingNode(instrument.name, item.note)}
        >
        {
          item.note
        }
        </div>
      );
    });
  };

  render() {
    return (
      <div className="matrix">
        <div className="row">
          {instruments.map(item => {
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
