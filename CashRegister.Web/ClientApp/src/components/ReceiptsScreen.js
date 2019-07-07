import React, { Component } from "react";
import { LOGIN_STRING } from "../constants";
import Navbar from "./Navbar";
import Receipts from "./Receipts";

class ReceiptsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: null
    };
  }

  componentDidMount = () => {
    const credentials = JSON.parse(window.localStorage.getItem(LOGIN_STRING));

    if (credentials === null || credentials === undefined) {
      window.location.href = "/login";
    }

    this.setState({ credentials });
  };

  render() {
    return (
      <div className="ScreenContainer">
        <Navbar />
        <div className="MainScreen">
          <Receipts />
        </div>
      </div>
    );
  }
}

export default ReceiptsScreen;
