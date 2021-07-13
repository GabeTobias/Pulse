import React from "react";
import ReactDOM from "react-dom";

import App from "./App.js";
import store from "./Store"

// Render React App
ReactDOM.render(<App store={store} />, document.getElementById("root"));