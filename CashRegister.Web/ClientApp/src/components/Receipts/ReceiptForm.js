import React, { Component } from "react";
import { validateCredentials, getCredentials } from "../../utils";
import { addReceipt } from "../../services/receipt";
import { addReceiptProductList } from "../../services/receiptProduct";
import ReceiptFormProduct from "./ReceiptFormProduct";
import ReceiptModal from "./ReceiptModal";
import ConfirmationModal from "../ConfirmationModal";

class ReceiptForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConfirmationActive: false,
      newReceiptId: ""
    };
  }

  getPriceSubtotal = () => {
    let subtotal = 0;

    this.props.groceryItems.forEach(item => {
      subtotal += item.price * item.quantity;
    });

    return subtotal.toFixed(2);
  };

  getPriceTotal = () => {
    let total = 0;

    this.props.groceryItems.forEach(item => {
      total += item.price * item.quantity;
      if (item.taxType === "Excise") {
        total += item.price * item.quantity * 0.05;
      } else if (item.taxType === "Direct") {
        total += item.price * item.quantity * 0.25;
      }
    });

    return total.toFixed(2);
  };

  displayConfirmation = () => {
    if (this.props.groceryItems.length === 0) return;

    this.setState({ isConfirmationActive: true });
  };

  closeConfirmation = () => {
    this.setState({ isConfirmationActive: false });
  };

  submitReceipt = () => {
    if (!validateCredentials()) {
      return;
    }
    if (this.props.groceryItems.length === 0) return;

    const credentials = getCredentials();
    const createdOn = new Date();

    addReceipt({
      createdOn,
      cashRegisterId: credentials.cashRegisterId,
      cashierId: credentials.cashierId
    }).then(receiptId => {
      const receiptProductsToAdd = this.props.groceryItems.map(
        receiptProduct => {
          return {
            ...receiptProduct,
            receiptId,
            productId: receiptProduct.id
          };
        }
      );
      addReceiptProductList(receiptProductsToAdd).then(() =>
        this.setState({ newReceiptId: receiptId })
      );
    });
  };

  closeModal = () => {
    this.setState({ newReceiptId: "" });
    this.props.handleReset();
  };

  render() {
    return (
      <div className="ReceiptForm">
        <ul className="GroceryItems">
          {this.props.groceryItems.map((item, index) => (
            <ReceiptFormProduct key={index} product={item} />
          ))}
        </ul>

        <div className="ReceiptInfo">
          <div className="PriceSubtotal">
            <h2>Subtotal</h2>
            <h3>{this.getPriceSubtotal()}</h3>
          </div>
          <div className="PriceTotal">
            <h2>Total</h2>
            <h3>{this.getPriceTotal()}</h3>
          </div>
        </div>

        <button className="PayButton" onClick={this.displayConfirmation}>
          Pay
        </button>

        {this.state.isConfirmationActive ? (
          <ConfirmationModal
            handleClose={this.closeConfirmation}
            handleConfirm={() => {
              this.submitReceipt();
              this.closeConfirmation();
            }}
          />
        ) : (
            undefined
          )}

        {this.state.newReceiptId !== "" ? (
          <ReceiptModal
            receiptId={this.state.newReceiptId}
            handleClose={this.closeModal}
          />
        ) : (
            undefined
          )}
      </div>
    );
  }
}

export default ReceiptForm;
