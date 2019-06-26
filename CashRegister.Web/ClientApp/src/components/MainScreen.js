import React, { Component } from "react";
import Navbar from "./Navbar";
import ReceiptForm from "./ReceiptForm";
import { getAllProducts } from "../services/product";
import Products from "./Products";

class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  // componentDidMount = () => {
  //   getAllProducts().then(products => {
  //     products = products.map(product => {
  //       return { ...product, quantity: 1 };
  //     });
  //     this.setState({ products });
  //   });
  // };

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
