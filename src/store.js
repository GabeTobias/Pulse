import { observable, computed } from "mobx"
import { getTaskDuration, getTaskPercentage } from "./utility/time";

class Store {
  @observable projectName = "Demo";
  @observable activeTask = -1;
  @observable taskTime = 0;
  @observable taskPercent = 0;
  
  updateInterval = 0;

  @observable archive = [];

    @observable tasks = [{
      text: "This is just a demo task for the sake of testing behaviour",
      date: Date.now(),
      complete: true
    },
    {
      text: "This is another task",
      date: Date.now(),
      complete: false
    }
  ];
  
  @observable notes = [
    { text:"This is a note", date: Date.now()},
    { text:"This is another note", date: Date.now()},
    { text:"Final note", date: Date.now()}
  ];

  @observable beginTask (index) {
    this.activeTask = index;

    // Start Task Timer
    this.taskTime = Date.now() / 1000.0;
    this.taskPercent = getTaskPercentage(this.taskTime, 20);

    // Create Update Event
    this.updateInterval = setInterval(function() {
      store.taskPercent = getTaskPercentage(store.taskTime, 20);
      if(store.taskPercent >= 100) store.stopTask();
    }, 1000);
  }

  @observable stopTask() {
    //Check if timer complete
    if(store.taskPercent >= 100) {
      //Toggle Alarm Modal
      let alarmModal = new bootstrap.Modal(document.getElementById('AlarmModal'), {keyboard: false})    
      alarmModal.show();
    }
    else {
      //Reset Active Task
      this.activeTask = -1;
    }
    
    clearInterval(this.updateInterval);
  }
}

// Make a store instance globally available
var store = window.store = new Store;

export default store;