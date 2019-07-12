import React from "react";

const ReceiptFormProduct = props => {
  return (
    <li>
      <div>{props.product.name}</div>
      <div>{`${props.product.price}$`}</div>
      <div>{`Tax type: ${props.product.taxType}`}</div>
      <div>{`Quantity: ${props.product.quantity}`}</div>
    </li>
  );
};

export default ReceiptFormProduct;
