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
      getReceiptProductsByReceiptId(receipt.id).then(
        receiptProducts => {
          console.log(receiptProducts, receipt);
          this.setState({ receipt, receiptProducts });
        }
      );
    });
  };

  render() {
    const { receipt, receiptProducts } = this.state;
    return (
      <div className="ReceiptModal">
        {/* <ul className="GroceryItems">
          {receiptProducts.map((item, index) => (
            <ReceiptFormProduct key={index} product={item} />
          ))}
        </ul>
        <div className="ReceiptInfo">
          <div className="PriceSubtotal">
            <h2>Subtotal</h2>
            <h3>{receipt.subtotal}</h3>
          </div>
          <div className="PriceTotal">
            <h2>Total</h2>
            <h3>{receipt.total}</h3>
          </div>
        </div> */}
      </div>
    );
  }
}

export default ReceiptModal;
