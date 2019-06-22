import React, { Component } from "react";
import { post } from "./services/services";
import { CONTROLLER } from "./constants";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        {/* {getAll().map(cashRegister => (
          <div>{cashRegister.name}</div>
        ))} */}
      </div>
    );
  }
}
