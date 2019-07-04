import React, { Component } from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import ProductForm from "./ProductForm";

class ProductsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProduct: null
    };
  }

  componentDidMount = () => {
    this.screenContainer.focus();
  };

  selectProduct = product => {
    this.setState({ selectedProduct: product });
  };

  render() {
    const { selectedProduct } = this.state;
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
          <Products handleProductClick={this.selectProduct} />

          {selectedProduct !== null ? (
            <ProductForm product={selectedProduct} />
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
