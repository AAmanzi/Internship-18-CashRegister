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

  addProduct = product => {
    this.setState(prevState => {
      let existingProduct = prevState.products.find(
        p => p.barcode === product.barcode
      );

      if (existingProduct !== undefined) {
        existingProduct.quantity += product.quantity;
        return { products: [...prevState.products] };
      }

      return { products: [...prevState.products, { ...product }] };
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="MainScreen">
          <Products handleProductClick={this.addProduct} />
          <ReceiptForm
            groceryItems={this.state.products}
            handleReset={() => this.setState({ products: [] })}
          />
        </div>
      </div>
    );
  }
}

export default MainScreen;
