import React, { Component } from "react";
import { observer } from "mobx-react";

import '../sass/main.scss'

import Task from "./Task";
import store from "../store";

@observer
class TaskPanel extends Component {
  constructor(props) { 
    super(props);

    //Retrieve Task Data
    //Check to see if archive is empty
    let taskData = window.localStorage.getItem('Tasks');
    store.tasks = (taskData == 'null') ? [] : JSON.parse(taskData);

    //Check to see if archive is empty
    let archiveData = window.localStorage.getItem('Archive');
    store.archive = (archiveData == 'null') ? [] : JSON.parse(archiveData);
  }

  NewTask = () => {
    store.tasks.push({
      text: "New Task",
      date: Date.now(),
      complete: false
    });

    //Store Task Data
    window.localStorage.setItem('Tasks', JSON.stringify(store.tasks));
    window.localStorage.setItem('Archive', JSON.stringify(store.archive));
  }

  ArchiveTask = () => {
    store.archive.push(store.tasks[store.activeTask]);
    store.tasks.splice(store.activeTask,1);
    store.activeTask = -1;

    //Store Task Data
    window.localStorage.setItem('Tasks', JSON.stringify(store.tasks));
    window.localStorage.setItem('Archive', JSON.stringify(store.archive));
  }

  PauseTask = () => {
    store.stopTask();
    store.activeTask = -1;
  }

  render() {
    return (
      <div className="TaskPanel">
        <h4>Tasks</h4>

        {/* Iterate over all tasks in store */}
        {store.tasks.map((task, index) => (
          <Task key={index} text={task.text} date={task.date} complete={task.complete} index={index} active={index==store.activeTask}/>
        ))}

        <button className="NewTask btn btn-dark" type="button" onClick={this.NewTask}>Add Task</button>

        {/* Task Complete Model */}
        <div class="modal fade" id="AlarmModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body">
                <h4>Times Up!</h4>
                <p>Are you done with your task?</p>

                <hr></hr>
                <button type="button" className="option btn btn-success" data-bs-dismiss="modal" onClick={this.ArchiveTask}>Yes</button>
                <button type="button" className="option btn btn-secondary" data-bs-dismiss="modal" onClick={this.PauseTask}>No</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default TaskPanel;