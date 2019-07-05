import React, { Component } from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import ProductForm from "./ProductForm";

class ProductsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProduct: null,
      hasProductUpdated: false
    };
  }

  componentDidMount = () => {
    this.screenContainer.focus();
  };

  selectProduct = product => {
    this.setState({ selectedProduct: product });
  };

  handleHasProductUpdated = () => {
    this.setState({ hasProductUpdated: true });
  };

  handleHaveProductsRefreshed = () => {
    this.setState({ hasProductUpdated: false});
  };

  render() {
    return (
      <div
        className="ScreenContainer"
        ref={button => {
          this.screenContainer = button;
        }}
        onKeyDown={this.handleKeyPress}
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
            <ProductForm
              product={this.state.selectedProduct}
              productHasUpdated={this.handleHasProductUpdated}
            />
          ) : (
            <div className="ProductForm">
              <h2>Select a product to edit</h2>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProductsScreen;
