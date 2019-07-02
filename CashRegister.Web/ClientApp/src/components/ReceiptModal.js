import React, { Component } from "react";
import { getReceiptById } from "../services/receipt";
import { getReceiptProductsByReceiptId } from "../services/receiptProduct";
import ReceiptFormProduct from "./ReceiptFormProduct";

class ReceiptModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipt: null,
      receiptProducts: []
    };
  }
  componentDidMount = () => {
    getReceiptById(this.props.receiptId).then(receipt => {
      getReceiptProductsByReceiptId(receipt.id).then(receiptProducts => {
        const formattedReceiptProducts = receiptProducts.map(rp => {
          return { ...rp.product, quantity: rp.quantity };
        });
        this.setState({ receipt, receiptProducts: formattedReceiptProducts });
      });
    });
  };

  render() {
    const { receipt, receiptProducts } = this.state;
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    };

    if (receipt === null || receiptProducts.length === 0)
      return <div>Loading...</div>;
    return (
      <div className="ModalCover">
        <div className="ReceiptModal">
          <button className="ButtonClose" onClick={this.props.handleClose}>
            Close
          </button>
          <ul className="GroceryItems">
            {receiptProducts.map((item, index) => (
              <ReceiptFormProduct key={index} product={item} />
            ))}
          </ul>
          <div className="ReceiptInfo">
            <div className="ReceiptElement">
              <h2>Subtotal</h2>
              <h3>{receipt.priceSubtotal.toFixed(2)}</h3>
            </div>

            <div className="ReceiptElement">
              <h2>Excise tax:</h2>
              <h3>{receipt.totalExciseTax.toFixed(2)}</h3>
            </div>

            <div className="ReceiptElement">
              <h2>Direct tax:</h2>
              <h3>{receipt.totalDirectTax.toFixed(2)}</h3>
            </div>

            <div className="ReceiptElement">
              <h2>Total</h2>
              <h3>{receipt.priceTotal.toFixed(2)}</h3>
            </div>

            <div className="ReceiptElement">
              <h3>{`Created on: ${new Date(
                receipt.createdOn
              ).toLocaleDateString("en-EU", dateOptions)}`}</h3>
            </div>
          </div>
          <button>Print</button>
        </div>
      </div>
    );
  }
}

export default ReceiptModal;
