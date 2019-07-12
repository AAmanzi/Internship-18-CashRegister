import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import { getReceiptById } from "../../services/receipt";
import { getReceiptProductsByReceiptId } from "../../services/receiptProduct";
import { getCashierById } from "../../services/cashier";
import { getCashRegisterById } from "../../services/cashRegister";
import ReceiptFormProduct from "./ReceiptFormProduct";

class Content extends Component {
  render() {
    const {
      receipt,
      receiptProducts,
      cashierFullName,
      cashRegisterName
    } = this.props;
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    };

    return (
      <div className="ReceiptModal">
        <div className="ReceiptElement">
          <span>{`Cashier: ${cashierFullName}`}</span>
        </div>

        <div className="ReceiptElement">
          <span>{`Cash register: ${cashRegisterName}`}</span>
        </div>

        <div className="ReceiptElement">
          <span>{`Created on: ${new Date(receipt.createdOn).toLocaleDateString(
            "en-EU",
            dateOptions
          )}`}</span>
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
    );
  }
}

class ReceiptModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipt: null,
      receiptProducts: [],
      cashierFullName: "",
      cashRegisterName: ""
    };
  }

  componentDidMount = () => {
    getReceiptById(this.props.receiptId).then(receipt => {
      getReceiptProductsByReceiptId(receipt.id).then(receiptProducts => {
        const formattedReceiptProducts = receiptProducts.map(rp => {
          return {
            name: rp.product.name,
            price: rp.unitPrice,
            quantity: rp.quantity,
            taxType: rp.taxType
          };
        });
        this.setState({ receipt, receiptProducts: formattedReceiptProducts });
      });

      getCashierById(receipt.cashierId).then(cashier =>
        this.setState({
          cashierFullName: `${cashier.firstName} ${cashier.lastName}`
        })
      );

      getCashRegisterById(receipt.cashRegisterId).then(cashRegister =>
        this.setState({ cashRegisterName: cashRegister.name })
      );
    });
  };

  handleKeyPress = event => {
    switch (event.key) {
      case "Escape":
        return this.props.handleClose();

      case "Enter":
        const printButton = document.querySelector(".PrintButton--button");

        if (printButton === null || printButton === undefined) {
          return undefined;
        }
        return printButton.focus();

      default:
        return undefined;
    }
  };

  render() {
    const {
      receipt,
      receiptProducts,
      cashierFullName,
      cashRegisterName
    } = this.state;

    if (
      receipt === null ||
      receiptProducts.length === 0 ||
      cashierFullName === "" ||
      cashRegisterName === ""
    )
      return <div>Loading...</div>;

    return (
      <div
        ref={button => {
          button && button.focus();
        }}
        onKeyDown={this.handleKeyPress}
        tabIndex="0"
      >
        <div className="ModalCover">
          <button className="ButtonCloseModal" onClick={this.props.handleClose}>
            X
          </button>
          <ReactToPrint
            trigger={() => (
              <div className="PrintButton">
                <button
                  className="PrintButton--button"
                  autoFocus
                  onClick={this.props.handleClose}
                >
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
            cashierFullName={cashierFullName}
            cashRegisterName={cashRegisterName}
          />
        </div>
      </div>
    );
  }
}

export default ReceiptModal;
