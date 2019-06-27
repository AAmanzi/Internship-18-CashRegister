import React, { Component } from "react";
import Navbar from "./Navbar";
import ReceiptForm from "./ReceiptForm";
import Products from "./Products";

class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="MainScreen">
          <Products />
          <ReceiptForm groceryItems={this.state.products} />
        </div>
      </div>
    );
  }
}

export default MainScreen;
