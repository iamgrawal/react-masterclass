import { Container } from "unstated";
import Soundfont from "soundfont-player";
import { soundFonts } from "../utils/layoutConfig";
export default class MidiContainer extends Container {
  state = {
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
  toggleGridCell = (instrument, note) => {
    const { midiGrid } = this.state;
    if (midiGrid[instrument.name].indexOf(note) > -1) {
      midiGrid[instrument.name].splice(midiGrid[instrument.name].indexOf(note), 1);
    } else {
      midiGrid[instrument.name].push(note);
    }
    this.setState({
      midiGrid
    });
  };
  playMidi = () => {
    let ac = new AudioContext();
    Object.keys(this.state.midiGrid).map((item, index) => {
        this.state.midiGrid[item].map((note)=>{
            Soundfont.instrument(ac, item).then((ins)=>{
                ins.play(note);
            })
        })
    });
  };
}
export const midiContainer = new MidiContainer();
