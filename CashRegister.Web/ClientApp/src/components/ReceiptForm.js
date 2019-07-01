import React, { Component } from "react";
import { addReceipt } from "../services/receipt";
import { addReceiptProduct } from "../services/receiptProduct";
import ReceiptFormProduct from "./ReceiptFormProduct";
import ReceiptModal from "./ReceiptModal";

class ReceiptForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newReceiptId: ""
    };
  }

  getPriceSubtotal = () => {
    let subtotal = 0;

    this.props.groceryItems.map(item => {
      subtotal += item.price * item.quantity;
    });

    return subtotal.toFixed(2);
  };

  getPriceTotal = () => {
    let total = 0;

    this.props.groceryItems.map(item => {
      total += item.price * item.quantity;
      if (item.taxType === "Excise") {
        total += item.price * item.quantity * 0.05;
      } else if (item.taxType === "Direct") {
        total += item.price * item.quantity * 0.25;
      }
    });

    return total.toFixed(2);
  };

  submitReceipt = () => {
    if (this.props.groceryItems.length === 0) return;

    addReceipt({ createdOn: new Date(), cashRegisterId: 1, cashierId: 1 }).then(
      receiptId => {
        this.props.groceryItems.forEach(item => {
          addReceiptProduct({
            ...item,
            receiptId: receiptId,
            productId: item.id
          });
        });
        this.setState({ newReceiptId: receiptId });
      }
    );
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
        <button className="PayButton" onClick={this.submitReceipt}>
          Pay
        </button>

        {this.state.newReceiptId !== "" ? (
          <ReceiptModal receiptId={this.state.newReceiptId} />
        ) : (
          undefined
        )}
      </div>
    );
  }
}

export default ReceiptForm;
