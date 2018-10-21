import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "unstated";
import "./index.css";
import App from "./components";
import * as serviceWorker from "./serviceWorker";
import { midiContainer } from "./containers/midi.container";
ReactDOM.render(
  <Provider inject={[midiContainer]}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
