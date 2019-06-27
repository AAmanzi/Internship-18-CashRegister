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
    this.setState({ productFilter: event.target.value });
    this.debounceLoadProducts();
  };

  debounceLoadProducts = debounce(() => {
    getFilteredProducts(this.state.productFilter).then(products => {
      this.setState({ productFilter: "", products });
    });
  }, 300);

  render() {
    return (
      <div className="Products">
        <input
          type="text"
          onChange={this.handleFilterChange}
          value={this.state.productFilter}
        />
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
