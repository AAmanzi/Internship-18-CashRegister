import React, { Component } from "react";
import { validateCredentials } from "../../utils";
import AddProductForm from "./AddProductForm";

class BlankProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddProductLoaded: false
    };
  }

  loadAddProduct = () => {
    if (!validateCredentials()) {
      return;
    }
    this.setState({ isAddProductLoaded: true });
  };

  onProductAdd = () => {
    this.setState({ isAddProductLoaded: false });
    this.props.productWasAdded();
  };

  render() {
    if (this.state.isAddProductLoaded) {
      return <AddProductForm productWasAdded={this.onProductAdd} />;
    }
    return (
      <div className="ProductForm">
        <h2>Select a product to edit</h2>
        <button onClick={this.loadAddProduct} className="AddProduct">
          Add product
        </button>
      </div>
    );
  }
}

export default BlankProductForm;
