import React, { Component } from "react";
import { observer } from "mobx-react";
import { hot } from "react-hot-loader"

import "./sass/main.scss"

import HeaderPanel from "./components/HeaderPanel";
import NotesPanel from "./components/NotesPanel";
import TaskPanel from "./components/TaskPanel";

@observer
class App extends Component {
  render() {
    return (
      <div className="App">

        {/* Progress Bar & Project Name */}
        <HeaderPanel/>

        {/* Tasks & Notes Columns */}
        <div className="container-flex">
          <div className="row">
            <div className="col-7-md">
              <TaskPanel />
            </div>            
            <div className="col-5-md">
              {/* <NotesPanel /> */}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default hot(module)(App);