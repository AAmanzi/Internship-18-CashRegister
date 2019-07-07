import React, { Component } from "react";
import { getAllCashRegisters } from "../services/cashRegister";
import { validateCashier } from "../services/cashier";
import { LOGIN_STRING } from "../constants";

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      cashRegisters: [],
      cashRegisterId: "",
      error: ""
    };
  }

  componentDidMount = () => {
    getAllCashRegisters().then(cashRegisters =>
      this.setState({ cashRegisters })
    );
  };

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleCashRegisterChange = event => {
    this.setState({ cashRegisterId: event.target.value });
  };

  handleLogin = () => {
    if (this.state.cashRegisterId === "") {
      return this.setState({
        error: "You must select a cash register to login!"
      });
    }

    validateCashier(this.state.username, this.state.password)
      .then(cashier =>
        window.localStorage.setItem(
          LOGIN_STRING,
          JSON.stringify({
            cashierId: cashier.id,
            cashRegisterId: parseInt(this.state.cashRegisterId, 10),
            firstName: cashier.firstName,
            lastName: cashier.lastName
          })
        )
      )
      .then(() => (window.location.href = "./"))
      .catch(() => this.setState({ error: "Invalid username or password!" }));
  };

  render() {
    return (
      <div className="LoginScreen">
        <div className="LoginError">{this.state.error}</div>
        <div className="LoginFormItem">
          <span>User Name</span>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </div>

        <div className="LoginFormItem">
          <span>Password</span>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>

        <div className="LoginFormItem">
          <select
            value={this.state.cashRegisterId}
            onChange={this.handleCashRegisterChange}
          >
            <option value="">Please select cash register...</option>
            {this.state.cashRegisters.map((cashRegister, index) => (
              <option key={index} value={cashRegister.id}>
                {cashRegister.name}
              </option>
            ))}
          </select>
        </div>

        <button className="LoginButton" onClick={this.handleLogin}>
          Login
        </button>
      </div>
    );
  }
}

export default LoginScreen;
