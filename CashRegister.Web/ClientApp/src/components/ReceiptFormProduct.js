import React from "react";

const ReceiptFormProduct = props => {

  const onQuantityChange = event => {
    props.onQuantityChange(event.target.value);
  };

  return (
    <li>
      <div>{props.product.name}</div>
      <div>{`${props.product.price}$`}</div>
      <div>{`Quantity: ${props.product.quantity}`}</div>
    </li>
  );
};

export default ReceiptFormProduct;
