import React, { Component } from "react";
import { editProduct } from "../services/product";
import { validateProduct } from "../utils";
import AmountPickerModal from "./AmountPickerModal";
import ConfirmationModal from "./ConfirmationModal";

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      barcode: null,
      price: null,
      taxType: null,
      inStock: null,
      isAmountPickerActive: false,
      isConfirmationActive: false
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

  displayAmountPicker = () => {
    this.setState({ isAmountPickerActive: true });
  };

  closeAmountPicker = () => {
    this.setState({ isAmountPickerActive: false });
  };

  displayConfirmation = () => {
    this.setState({ isConfirmationActive: true });
  };

  closeConfirmation = () => {
    this.setState({ isConfirmationActive: false });
  };

  increaseProductStock = quantity => {
    if (quantity <= 0) {
      return;
    }

    const { id, name, barcode, price, taxType, inStock } = this.props.product;
    const newStock = inStock + quantity;
    const updatedProduct = {
      id,
      name,
      barcode,
      price,
      taxType,
      inStock: newStock
    };

    editProduct(updatedProduct).then(() => {
      this.setState({
        name: null,
        barcode: null,
        price: null,
        taxType: null,
        inStock: null,
        isAmountPickerActive: false,
        isConfirmationActive: false
      });
      this.closeAmountPicker();
      this.props.productHasUpdated();
    });
  };

  applyChanges = () => {
    const { id, name, barcode, price, taxType, inStock } = this.state;
    const updatedProduct = {
      id,
      name,
      barcode,
      price,
      taxType,
      inStock
    };

    console.log(updatedProduct, validateProduct(updatedProduct));

    if (validateProduct(updatedProduct) !== 0) {
      return;
    }

    editProduct(updatedProduct).then(() => {
      this.setState({
        name: null,
        barcode: null,
        price: null,
        taxType: null,
        inStock: null,
        isAmountPickerActive: false,
        isConfirmationActive: false
      });
      this.closeConfirmation();
      this.props.productHasUpdated();
    });
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
        <input
          maxLength="13"
          onChange={this.handleBarcodeChange}
          value={barcode}
        />
        <input onChange={this.handlePriceChange} value={price} />

        <select value={taxType} onChange={this.handleTaxTypeChange}>
          <option value="Excise">Excise</option>
          <option value="Direct">Direct</option>
        </select>

        <span>In stock: {inStock}</span>

        <div className="ButtonContainer">
          <button onClick={this.displayConfirmation} className="SaveButton">
            Save
          </button>
          <button onClick={this.displayAmountPicker} className="StockButton">
            Increase stock
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

        {this.state.isAmountPickerActive ? (
          <AmountPickerModal
            productName={name}
            handleClose={this.closeAmountPicker}
            handleApply={this.increaseProductStock}
          />
        ) : (
          undefined
        )}
      </div>
    );
  }
}

export default ProductForm;
