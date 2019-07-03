import React, { Component } from "react";
import Navbar from "./Navbar";
import ReceiptForm from "./ReceiptForm";
import Products from "./Products";

class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      focused: null
    };
  }

  componentDidCatch = () => {
    this.screenContainer.focus();
  };

  addProduct = product => {
    this.setState(prevState => {
      let existingProduct = prevState.products.find(
        p => p.barcode === product.barcode
      );

      if (existingProduct !== undefined) {
        existingProduct.quantity += product.quantity;
        return { products: [...prevState.products] };
      }

      return { products: [...prevState.products, { ...product }] };
    });
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
          document.activeElement === document.querySelector(".ScreenContainer")
        )
          return document.querySelector(".ProductsFilterInput").focus();
        return this.setState({ focused: null });

      case "p":
      case "P":
        return document.querySelector(".PayButton").focus();
      default:
        return undefined;
    }
  };

  render() {
    return (
      <div
        className="ScreenContainer"
        ref={button => {
          this.screenContainer = button;
        }}
        onKeyDown={this.handleKeyPress}
        tabIndex="0"
      >
        <Navbar />
        <div className="MainScreen">
          <Products
            handleProductClick={this.addProduct}
            triggeredProductsLoad={() => this.setState({ focused: -1 })}
          />
          <ReceiptForm
            groceryItems={this.state.products}
            handleReset={() => this.setState({ products: [] })}
          />
        </div>
      </div>
    );
  }
}

export default MainScreen;
