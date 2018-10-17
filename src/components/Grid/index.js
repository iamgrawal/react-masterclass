import React from "react";
import Soundfont from 'soundfont-player';

import { hexToRGB } from "../../utils/convertor";
import { notes, instruments } from "../../utils/layoutConfig";

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
        shamisen:[],
        electric_guitar_jazz: []
      }
    };
  }

  toggleGridCell = (instrument, note) => {
    const { midiGrid } = this.state;
    if (midiGrid[instrument].indexOf(note) > -1) {
      midiGrid[instrument].splice(midiGrid[instrument].indexOf(note), 1);
    } else {
      midiGrid[instrument].push(note);
    }
    this.setState({
      midiGrid
    });
  };


  /**
   * plays the corresponding sound of the instrument node
   * @param {string} instrument
   * @param {string} note
   */
  playCorrespondingNode = (instrument, note, isCellActive) => {
    if(!isCellActive){
      Soundfont.instrument(new AudioContext(),instrument).then((instrument)=>{
        instrument.play(note);
      });
    }
    this.toggleGridCell(instrument, note);    
  };

  /**
   * gets notes for each instruments and displays it in the table
   * @param {object} instrument
   */
  getInstrumentsNote = instrument => {
    return notes.map((item, index) => {
      const isCellActive = this.state.midiGrid[instrument.name].indexOf(
        item.note
      );
      return (
        <div
          className= {`cell ${isCellActive > -1 ? `active` : ``}`}
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
