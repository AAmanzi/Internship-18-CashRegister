import React, { Component } from "react";
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import MainScreen from "./components/MainScreen";
import "./App.css"

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <MainScreen />} />
            {/* <Route exact path="/manage" render={() => <Manage />} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
