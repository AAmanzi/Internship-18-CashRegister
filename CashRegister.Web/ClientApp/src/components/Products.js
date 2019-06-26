import React, { Component } from "react";
import { debounce } from "../utils";
import { getFilteredProducts } from "../services/product";
import ProductCard from "./ProductCard";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productFilter: "",
      products: []
    };
  }

  handleFilterChange = event => {
    console.log(event)
    const filter = "";

    getFilteredProducts(filter).then(products => this.setState({ products }));
  };

  render() {
    return (
      <div className="Products">
        <input type="text" onChange={debounce(event => this.handleFilterChange(event), 500)} />
        <div className="ProductPanel">
          {this.state.products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    );
  }
}

export default Products;
