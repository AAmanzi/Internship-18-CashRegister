import React, { Component } from "react";

class ProductAmountPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 1
    };
  }

  handleKeyDown = event => {
    switch (event.key) {
      case "Enter":
        return this.props.handleApply(this.state.amount);
      case "Escape":
        return this.props.handleClose();
      default:
        return undefined;
    }
  };

  render() {
    return (
      <div className="ModalCover">
        <div className="AmountPickerModal">
          <h2>{this.props.productName}</h2>
          <input
            className="InputAmount"
            autoFocus
            type="number"
            value={this.state.amount}
            onChange={event =>
              this.setState({ amount: parseInt(event.target.value, 10) })
            }
            onKeyDown={this.handleKeyDown}
          />
          <button className="CloseButton" onClick={this.props.handleClose}>
            Cancel
          </button>
          <button
            className="CloseButton"
            onClick={() => this.props.handleApply(this.state.amount)}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default ProductAmountPicker;
