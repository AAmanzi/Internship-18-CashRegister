import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import MainScreen from "./components/MainScreen";
import ProductsScreen from "./components/Products/ProductsScreen";
import ReceiptsScreen from "./components/Receipts/ReceiptsScreen";
import LoginScreen from "./components/LoginScreen";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <MainScreen />} />
            <Route exact path="/products" render={() => <ProductsScreen />} />
            <Route exact path="/receipts" render={() => <ReceiptsScreen />} />
            <Route exact path="/login" render={() => <LoginScreen />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
