import React, { Component } from "react";
import { LOGIN_STRING } from "../constants";
import Navbar from "./Navbar";
import Products from "./Products";
import EditProductForm from "./EditProductForm";
import BlankProductForm from "./BlankProductForm";

class ProductsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProduct: null,
      hasProductUpdated: false,
      credentials: null
    };
  }

  componentDidMount = () => {
    const credentials = JSON.parse(window.localStorage.getItem(LOGIN_STRING));

    if (credentials === null || credentials === undefined) {
      window.location.href = "/login";
    }

    this.setState({ credentials });

    this.screenContainer.focus();
  };

  selectProduct = product => {
    this.setState({ selectedProduct: product });
  };

  onProductUpdate = () => {
    this.setState({ hasProductUpdated: true });
  };

  handleHaveProductsRefreshed = () => {
    this.setState({ hasProductUpdated: false });
  };

  render() {
    return (
      <div
        className="ScreenContainer"
        ref={button => {
          this.screenContainer = button;
        }}
        tabIndex="0"
      >
        <Navbar />
        <div className="MainScreen">
          <Products
            hasProductUpdated={this.state.hasProductUpdated}
            productsHaveRefreshed={this.handleHaveProductsRefreshed}
            handleProductClick={this.selectProduct}
          />

          {this.state.selectedProduct !== null ? (
            <EditProductForm
              product={this.state.selectedProduct}
              productHasUpdated={this.onProductUpdate}
            />
          ) : (
            <BlankProductForm productWasAdded={this.onProductUpdate} />
          )}
        </div>
      </div>
    );
  }
}

export default ProductsScreen;
