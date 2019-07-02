import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import { getReceiptById } from "../services/receipt";
import { getReceiptProductsByReceiptId } from "../services/receiptProduct";
import ReceiptFormProduct from "./ReceiptFormProduct";

class Content extends Component {
  render() {
    const { receipt, receiptProducts } = this.props;
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    };

    return (
      <div className="ModalCover">
        <div className="ReceiptModal">
          <div className="ReceiptElement">
            <span>{`Created on: ${new Date(
              receipt.createdOn
            ).toLocaleDateString("en-EU", dateOptions)}`}</span>
          </div>

          <div className="ReceiptElement">
            <span>{`Receipt No: ${receipt.id}`}</span>
          </div>

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
              <h3>Excise tax:</h3>
              <h4>{receipt.totalExciseTax.toFixed(2)}</h4>
            </div>

            <div className="ReceiptElement">
              <h3>Direct tax:</h3>
              <h4>{receipt.totalDirectTax.toFixed(2)}</h4>
            </div>

            <div className="ReceiptElement">
              <h3>Total</h3>
              <h4>{receipt.priceTotal.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ReceiptModal extends React.Component {
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

    if (receipt === null || receiptProducts.length === 0)
      return <div>Loading...</div>;
    return (
      <div>
        <ReactToPrint
          trigger={() => (
            <div className="PrintButton">
              <button autoFocus onClick={this.props.handleClose}>
                Print receipt!
              </button>
            </div>
          )}
          content={() => this.componentRef}
        />
        <Content
          ref={el => (this.componentRef = el)}
          receipt={receipt}
          receiptProducts={receiptProducts}
        />
      </div>
    );
  }
}

export default ReceiptModal;
