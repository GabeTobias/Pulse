import React, { Component } from "react";
import { observer } from "mobx-react";

import '../sass/main.scss'

import Task from "./Task";
import store from "../store";

@observer
class TaskPanel extends Component {

  NewTask = () => {
    store.tasks.push({
      text: "New Task",
      date: Date.now(),
      complete: false
    });
  }

  render() {
    return (
      <div className="TaskPanel">
        <h4>Tasks</h4>

        {/* Iterate over all tasks in store */}
        {store.tasks.map((task, index) => (
          <Task text={task.text} date={task.date} complete={task.complete} index={index}/>
        ))}

        <button class="NewTask btn btn-dark" type="button" onClick={this.NewTask}>Add Task</button>
      </div>
    );
  }
}

export default TaskPanel;