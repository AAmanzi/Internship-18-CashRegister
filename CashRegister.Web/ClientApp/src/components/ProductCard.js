import React from "react";

const ProductCard = props => {
  return (
    <div className="ProductCard" onClick={props.handleClick}>
      <h1>{props.product.name}</h1>
      <div>{props.product.barcode}</div>
      <div>{`${props.product.price}$`}</div>
      <div>{`Tax type: ${props.product.taxType}`}</div>
      <div>{`In stock: ${props.product.inStock}`}</div>
    </div>
  );
};

export default ProductCard;
