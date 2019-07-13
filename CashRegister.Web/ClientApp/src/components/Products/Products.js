import React, { Component } from "react";
import { debounce, validateCredentials } from "../../utils";
import { getFilteredProducts } from "../../services/product";
import ProductCard from "./ProductCard";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hiddenProductFilter: "",
      productFilter: "",
      products: [],
      focused: null
    };
  }

  componentDidUpdate = oldProps => {
    const newProps = this.props;
    if (
      oldProps.hasProductUpdated !== newProps.hasProductUpdated &&
      newProps.hasProductUpdated === true
    ) {
      this.refreshFilter();
      this.props.productsHaveRefreshed();
    }
  };

  handleFilterChange = event => {
    this.setState({
      productFilter: event.target.value,
      hiddenProductFilter: event.target.value
    });
    this.debounceLoadProducts();
  };

  debounceLoadProducts = debounce(() => {
    if (!validateCredentials()) {
      return;
    }
    getFilteredProducts(this.state.productFilter).then(products => {
      this.setState({ productFilter: "", products, focused: -1 });
    });
  }, 300);

  refreshFilter = () => {
    this.setState(prevState => {
      const prevHiddenProductFilter = { ...prevState }.hiddenProductFilter;
      return { productFilter: prevHiddenProductFilter };
    });
    this.debounceLoadProducts();
  };

  handleKeyPress = event => {
    const { focused } = this.state;
    const allProducts = document.getElementsByClassName("ProductCard");
    switch (event.key) {
      case "ArrowRight":
        if (focused === null) {
          return undefined;
        }

        if (
          ((focused + 1) % 4 === 0 && focused !== -1) ||
          focused + 1 >= allProducts.length
        ) {
          return;
        }

        this.setState(prevState => {
          return { focused: prevState.focused + 1 };
        });
        return allProducts[focused + 1].focus();

      case "ArrowLeft":
        if (focused === null) {
          return undefined;
        }

        if (focused < 0) {
          this.setState({ focused: 0 });
          return allProducts[0].focus();
        }

        if (focused % 4 === 0) {
          return;
        }

        this.setState(prevState => {
          return { focused: prevState.focused - 1 };
        });
        return allProducts[focused - 1].focus();

      case "ArrowDown":
        if (document.activeElement === document.querySelector(".ProductsFilterInput")
          && allProducts.length !== 0) {
          this.setState({ focused: 0 });
          return allProducts[0].focus();
        }

        if (focused === null) {
          return undefined;
        }

        if (focused < 0) {
          this.setState({ focused: 0 });
          return allProducts[0].focus();
        }

        if (focused + 4 >= allProducts.length) {
          return;
        }

        this.setState(prevState => {
          return { focused: prevState.focused + 4 };
        });
        return allProducts[focused + 4].focus();

      case "ArrowUp":
        if (focused === null) {
          return undefined;
        }

        if (focused < 0) {
          this.setState({ focused: 0 });
          return allProducts[0].focus();
        }

        if (focused < 4) {
          this.setState({ focused: null });
          return document.querySelector(".ProductsFilterInput").focus();
        }

        this.setState(prevState => {
          return { focused: prevState.focused - 4 };
        });
        return allProducts[focused - 4].focus();

      case "Escape":
        if (focused !== null) {
          this.setState({ focused: null });
        } else {
          this.setState({ focused: -1 });
        }
        return document.querySelector(".ProductsFilterInput").focus();

      case "Enter":
        if (
          (focused === -1 || focused === null) &&
          document.activeElement === document.querySelector(".Products")
        )
          return document.querySelector(".ProductsFilterInput").focus();
        return this.setState({ focused: null });

      case " ":
        if (
          document
            .querySelector(".ScreenContainer")
            .contains(document.querySelector(".ReceiptForm"))
        ) {
          return document.querySelector(".PayButton").focus();
        }
        break;

      default:
        return undefined;
    }
  };

  render() {
    return (
      <div
        className="Products"
        ref={button => {
          this.productsContainer = button;
        }}
        onKeyDown={this.handleKeyPress}
        tabIndex="0"
      >
        <div className="ProductsHeader">
          <input
            className="ProductsFilterInput"
            autoFocus
            type="text"
            onChange={this.handleFilterChange}
            value={this.state.productFilter}
            ref={input => {
              this.searchInput = input;
            }}
          />
        </div>

        <div className="ProductPanel">
          {this.state.products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              handleClick={() => this.props.handleProductClick(product)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Products;
