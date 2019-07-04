import React, { Component } from "react";

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      barcode: null,
      price: null,
      taxType: null,
      inStock: null
    };
  }

  componentDidMount = () => {
    this.setState({ ...this.props.product });
  };

  componentDidUpdate = oldProps => {
    const newProps = this.props;
    if (oldProps.product !== newProps.product) {
      this.setState({ ...newProps.product });
    }
  };

  handleBarcodeChange = event => {
    this.setState({ barcode: event.target.value });
  };

  handlePriceChange = event => {
    this.setState({ price: event.target.value });
  };

  handleTaxTypeChange = event => {
    this.setState({ taxType: event.target.value });
  };

  render() {
    const { name, barcode, price, taxType, inStock } = this.state;
    if (
      name === null ||
      barcode === null ||
      price === null ||
      taxType === null ||
      inStock === null
    ) {
      return (
        <div className="ProductForm">
          <h2>Select a product to edit</h2>
        </div>
      );
    }
    return (
      <div className="ProductForm">
        <h2>{name}</h2>
        <input onChange={this.handleBarcodeChange} value={barcode} />
        <input onChange={this.handlePriceChange} value={price} />

        {/* TODO: TaxType dropdown */}
        <input onChange={this.handleTaxTypeChange} value={taxType} />

        <span>In stock: {inStock}</span>

        <div className="ButtonContainer">
          <button className="SaveButton">Save</button>
          <button className="StockButton">Increase stock</button>
        </div>
      </div>
    );
  }
}

export default ProductForm;
