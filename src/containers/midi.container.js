import { Container } from "unstated";
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
      midiGrid[instrument.name].splice(midiGrid[instrument].indexOf(note), 1);
    } else {
      midiGrid[instrument.name].push(note);
    }
    this.setState({
      midiGrid
    });
  };
  playMidi = () => {
    Object.keys(this.state.midiGrid).map((item, index) => {
        this.state.midiGrid[item].map((item)=>{
            console.log(index, item);
            //soundFonts[index].play(item);
        })
    });
  };
}
export const midiContainer = new MidiContainer();
