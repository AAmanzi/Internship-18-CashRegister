import React from "react";

const ReceiptCard = props => {
  const { receipt } = props;
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  return (
    <button className="ReceiptCard" onClick={props.handleClick}>
      <div className="ReceiptElement">
        <span>{`Created on: ${new Date(receipt.createdOn).toLocaleDateString(
          "en-EU",
          dateOptions
        )}`}</span>
      </div>

      <div className="ReceiptElement">
        <span>{`Receipt No: ${receipt.id}`}</span>
      </div>

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
    </button>
  );
};

export default ReceiptCard;
