import React, { Component } from "react";
import { addProduct } from "../services/product";
import { validateProduct } from "../utils";
import ConfirmationModal from "./ConfirmationModal";

class AddProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      barcode: "",
      price: "",
      taxType: "",
      inStock: "",
      isConfirmationActive: false
    };
  }

  handleBarcodeChange = event => {
    const value = event.target.value;
    const isNumber = /^\d+$/.test(value);

    if (isNumber || value === "") {
      this.setState({ barcode: value });
    }
  };

  handlePriceChange = event => {
    const value = event.target.value;
    const isNumberOrFullStop = /^\d*\.?\d{0,2}$/.test(value);

    if (isNumberOrFullStop || value === "") {
      this.setState({ price: event.target.value });
    }
  };

  handleTaxTypeChange = event => {
    this.setState({ taxType: event.target.value });
  };

  displayConfirmation = () => {
    this.setState({ isConfirmationActive: true });
  };

  closeConfirmation = () => {
    this.setState({ isConfirmationActive: false });
  };

  applyChanges = () => {
    const { id, name, barcode, price, taxType, inStock } = this.state;
    const newProduct = {
      id,
      name,
      barcode,
      price,
      taxType,
      inStock
    };

    if (validateProduct(newProduct) !== 0) {
      return;
    }

    addProduct(newProduct).then(() => {
      this.closeConfirmation();
      this.props.productWasAdded();
    });
  };

  render() {
    const { name, barcode, price, taxType, inStock } = this.state;

    return (
      <div className="ProductForm">
        <span>Product name:</span>
        <input value={name} onChange={this.handleNameChange} />

        <span>Barcode:</span>
        <input
          maxLength="13"
          onChange={this.handleBarcodeChange}
          value={barcode}
        />

        <span>Price:</span>
        <input onChange={this.handlePriceChange} value={price} />

        <select value="" onChange={this.handleTaxTypeChange}>
          <option value="">Please select a tax type...</option>
          <option value="Excise">Excise</option>
          <option value="Direct">Direct</option>
        </select>

        <span>In stock:</span>
        <input
          type="number"
          value={inStock}
          onChange={this.handleInStockChange}
        />

        <div className="ButtonContainer">
          <button onClick={this.displayConfirmation} className="SaveButton">
            Save
          </button>
        </div>

        {this.state.isConfirmationActive ? (
          <ConfirmationModal
            handleClose={this.closeConfirmation}
            handleConfirm={this.applyChanges}
          />
        ) : (
          undefined
        )}
      </div>
    );
  }
}

export default AddProductForm;
