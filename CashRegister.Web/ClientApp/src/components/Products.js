import React, { Component } from "react";
import { debounce } from "../utils";
import { getFilteredProducts } from "../services/product";
import ProductCard from "./ProductCard";
import ProductAmountPicker from "./ProductAmountPicker";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAmountPickerActive: false,
      selectedProduct: null,
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

  closeAmountPicker = () => {
    this.setState({ isAmountPickerActive: false });
  };

  displayAmountPicker = product => {
    this.setState({ isAmountPickerActive: true, selectedProduct: product });
  };

  addProduct = quantity => {
    if (quantity <= 0) {
      return this.closeAmountPicker();
    }
    const productToAdd = {
      ...this.state.selectedProduct,
      quantity
    };

    this.props.handleProductClick(productToAdd);
    this.setState({ isAmountPickerActive: false });
  };

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
            <ProductCard
              key={index}
              product={product}
              handleClick={() => this.displayAmountPicker(product)}
            />
          ))}
        </div>

        {this.state.isAmountPickerActive ? (
          <ProductAmountPicker
            productName={this.state.selectedProduct.name}
            handleClose={this.closeAmountPicker}
            handleApply={this.addProduct}
          />
        ) : (
          undefined
        )}
      </div>
    );
  }
}

export default Products;
