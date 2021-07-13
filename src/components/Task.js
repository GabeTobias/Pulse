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

  getElementID = () => {
    return this.props.index.toString() + 'taskTextInput';
  }

  onClick = () => {
    this.setState({ editing: true });
  }

  onBlur = () => {
    // Pass task input to task value
    store.tasks[this.props.index].text = document.getElementById(this.getElementID()).value;
    
    //Update State
    this.setState({ editing: false });
  }

  render() {
    let content = <p>{this.props.text}</p>;
    
    //Swap paragraph to textarea if editing
    if(this.state.editing == true) { 
      content = (
        <div className="mb-3">
          <textarea className="form-control" id={this.getElementID()} defaultValue={this.props.text} rows="3"></textarea>
        </div>
      );
    }

    return (
      <div className="Task" onDoubleClick={this.onClick} onBlur={this.onBlur}>
        {content}
        <small><b>Gabe</b> - {dateTime.DateFormat(this.props.date)}</small>
        <button type="button" className="btn btn-warning btn-sm">Start</button>
      </div>
    );
  }
}

export default Task;