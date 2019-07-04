import React, { Component } from "react";

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null
    };
  }

  render() {
    return (
      <div className="ProductForm">
        <h2>{this.props.productName}</h2>
        <button className="SaveButton">Save</button>
      </div>
    );
  }
}

export default ProductForm;
