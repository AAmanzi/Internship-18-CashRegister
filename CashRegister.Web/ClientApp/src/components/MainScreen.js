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
        existingProduct.quantity++;
        return { products: [...prevState.products] };
      }

      return { products: [...prevState.products, { ...product, quantity: 1 }] };
    });
  };

  handleQuantityChange = (product, newQuantity) => {
    // this.setState(prevState => {
    //   let productToEdit = prevState.products.find(
    //     p => p.barcode === product.barcode
    //   );
    //   productToEdit.quantity = newQuantity
    console.log("this")
    console.log(product, newQuantity)
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="MainScreen">
          <Products handleProductClick={this.addProduct} />
          <ReceiptForm groceryItems={this.state.products} 
          onProductQuantityChange={this.handleQuantityChange}/>
        </div>
      </div>
    );
  }
}

export default MainScreen;
