import React, { Component } from "react";
import { observer } from "mobx-react";

import '../sass/main.scss'
import store from "../store";
import { Abreviate } from "../utility/string";
import { DurationFormat, getTaskDuration } from "../utility/time";

@observer
class HeaderPanel extends Component {
  render() {
    return (
      <div className="Header">
        <h3> <b>Project - </b> {store.projectName} </h3>
        
        {/* Display the text of active item IF timer is active, hide otherwise */}
        <small> { store.activeTask == -1 ? '': Abreviate(store.tasks[store.activeTask].text)} </small>
        
        {/* Display a timer progress bar only while timer is active*/}
        <div className={store.activeTask == -1 ? "TimerBar progress hidden" : "TimerBar progress"}>
          <div className="progress-bar bg-warning" style={{ width: store.taskPercent+'%' }} role="progressbar" aria-valuemin="0" aria-valuemax="100">
            { DurationFormat(getTaskDuration(store.taskTime)) }
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderPanel;