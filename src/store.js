import { observable, computed } from "mobx"

class Store {
  @observable projectName = "Demo";
  
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
}

// Make a store instance globally available
var store = window.store = new Store;

export default store;