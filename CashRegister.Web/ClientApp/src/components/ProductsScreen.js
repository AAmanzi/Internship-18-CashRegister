import React, { Component } from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import EditProductForm from "./EditProductForm";
import BlankProductForm from "./BlankProductForm";

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
            <EditProductForm
              product={this.state.selectedProduct}
              productHasUpdated={this.onProductUpdate}
            />
          ) : (
            <BlankProductForm productWasAdded={this.onProductUpdate}/>
          )}
        </div>
      </div>
    );
  }
}

export default ProductsScreen;
