import React, { Component } from "react";
import { observer } from "mobx-react";

import '../sass/main.scss'

@observer
class HeaderPanel extends Component {
  render() {
    return (
      <div className="Header">
        <h3> <b>Project - </b> {store.projectName} </h3>
      </div>
    ); 
  }
}

export default HeaderPanel;