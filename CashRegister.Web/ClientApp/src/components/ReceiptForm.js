import React, { Component } from "react";

class ReceiptForm extends Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <div className="ReceiptForm">
        <ul className="GroceryItems">
          {this.props.groceryItems.map((item, index) => (
            <li key={index}>
              {item.name}
              {item.price}
              {item.quantity}
            </li>
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
        <button className="PayButton">Pay</button>
      </div>
    );
  }
}

export default ReceiptForm;