import React, { Component } from "react";
import Navbar from "./Navbar";
import ReceiptForm from "./ReceiptForm";
import Products from "./Products";
import ProductAmountPicker from "./ProductAmountPicker";

class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAmountPickerActive: false,
      selectedProduct: null,
      products: []
    };
  }

  componentDidCatch = () => {
    this.screenContainer.focus();
  };

  closeAmountPicker = () => {
    this.setState({ isAmountPickerActive: false });
  };

  displayAmountPicker = product => {
    this.setState({ isAmountPickerActive: true, selectedProduct: product });
  };

  addProduct = quantity => {
    if (quantity <= 0) {
      return this.closeAmountPicker();
    }

    const productToAdd = {
      ...this.state.selectedProduct,
      quantity
    };

    this.setState(prevState => {
      let existingProduct = prevState.products.find(
        p => p.barcode === productToAdd.barcode
      );

      if (existingProduct !== undefined) {
        existingProduct.quantity += productToAdd.quantity;
        return {
          products: [...prevState.products],
          isAmountPickerActive: false
        };
      }

      return {
        products: [...prevState.products, { ...productToAdd }],
        isAmountPickerActive: false
      };
    });
  };

  render() {
    return (
      <div className="ScreenContainer">
        <Navbar />
        <div className="MainScreen">
          <Products handleProductClick={this.displayAmountPicker} />
          <ReceiptForm
            groceryItems={this.state.products}
            handleReset={() => this.setState({ products: [] })}
          />
        </div>

        {this.state.isAmountPickerActive ? (
          <ProductAmountPicker
            productName={this.state.selectedProduct.name}
            handleClose={this.closeAmountPicker}
            handleApply={this.addProduct}
          />
        ) : (
          undefined
        )}
      </div>
    );
  }
}

export default MainScreen;
