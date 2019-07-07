import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LOGIN_STRING } from "../constants";
import ConfirmationModal from "./ConfirmationModal";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConfirmationActive: false
    };
  }

  displayConfirmation = () => {
    this.setState({ isConfirmationActive: true });
  };

  closeConfirmation = () => {
    this.setState({ isConfirmationActive: false });
  };

  handleLogout = () => {
    window.localStorage.removeItem(LOGIN_STRING);

    window.location.href = "/login";
  };

  render() {
    return (
      <header>
        <nav>
          <ul className="NavLinks">
            <li className="NavItem">
              <Link to="/">
                <button>Main</button>
              </Link>
            </li>
            <li className="NavItem">
              <Link to="/products">
                <button>Products</button>
              </Link>
            </li>
            <li className="NavItem">
              <Link to="/receipts">
                <button>Receipts</button>
              </Link>
            </li>
            <li className="NavItem">
              <button onClick={this.displayConfirmation}>Log out</button>
            </li>
          </ul>
        </nav>

        {this.state.isConfirmationActive ? (
          <ConfirmationModal
            handleClose={this.closeConfirmation}
            handleConfirm={this.handleLogout}
          />
        ) : (
          undefined
        )}
      </header>
    );
  }
}

export default Navbar;
