import React, { Component } from "react";
import { observer } from "mobx-react";

import '../sass/main.scss'
import store from "../store";

var dateTime = require('../utility/time');

@observer
class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {editing: false};
  }

  getContent = () => {
    return store.tasks[this.props.index];
  }

  getElementID = () => {
    return this.props.index.toString() + 'taskTextInput';
  }

  onClick = () => {
    this.setState({ editing: true });
  }

  onBlur = () => {
    //Don't run if not editing
    if(!this.state.editing) return;

    // Pass task input to task value
    store.tasks[this.props.index].text = document.getElementById(this.getElementID()).value;

    //Store Task Data
    window.localStorage.setItem('Tasks', JSON.stringify(store.tasks));

    this.setState({ editing: false });
  }

  toggleTask = () => {
    if(!this.props.active) store.beginTask(this.props.index);
    else store.stopTask();
  }

  render() {
    let content = <p>{this.getContent().text}</p>;
    let clsName = "Task";

    //Swap paragraph to textarea if editing
    if(this.state.editing == true) { 
      content = (
        <div className="mb-3">
          <textarea className="form-control" id={this.getElementID()} defaultValue={this.getContent().text} rows="3"></textarea>
        </div>
      );
    }

    // Change class if active
    if(this.props.active) clsName += " active";

    return (
      <div className={clsName} onDoubleClick={this.onClick} onBlur={this.onBlur}>
        {content}
        <small><b>Gabe</b> - {dateTime.DateFormat(this.getContent().date)}</small>
        <button type="button" className="btn btn-warning btn-sm" onClick={this.toggleTask}> 
          {this.props.active ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}

export default Task;