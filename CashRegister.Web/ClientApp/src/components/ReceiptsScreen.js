import React, { Component } from "react";
import { validateCredentials } from "../utils";
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
    validateCredentials();
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
