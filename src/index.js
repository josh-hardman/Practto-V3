import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import AppStateContainer from "./containers/AppStateContainer";
import "./index.css";

ReactDOM.render(<AppStateContainer />, document.getElementById("root"));

registerServiceWorker();
