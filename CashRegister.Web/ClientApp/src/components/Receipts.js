import React, { Component } from "react";
import { formatDate } from "../utils";
import { getFilteredReceipts } from "../services/receipt";
import ReceiptCard from "./ReceiptCard";
import ReceiptModal from "./ReceiptModal";

class Receipts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receiptFilter: "",
      receipts: [],
      focused: null,
      selectedReceiptId: null
    };
  }

  componentDidMount = () => {
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    };
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString(
      "en-EU",
      dateOptions
    );
    const formattedCurrentDateString = formatDate(currentDate);

    getFilteredReceipts(currentDateString).then(receipts => {
      this.setState({
        receiptFilter: formattedCurrentDateString,
        receipts
      });
    });
  };

  handleFilterChange = event => {
    const dateOfReceipt = event.target.value;
    getFilteredReceipts(dateOfReceipt).then(receipts => {
      this.setState({ receiptFilter: dateOfReceipt, receipts, focused: -1 });
    });
  };

  openReceiptModal = receipt => {
    this.setState({ selectedReceiptId: receipt.id });
  };

  closeReceiptModal = () => {
    this.setState({ selectedReceiptId: null });
  };

  render() {
    return (
      <div
        className="Receipts"
        ref={button => {
          this.receiptsContainer = button;
        }}
        tabIndex="0"
      >
        <div className="ReceiptsHeader">
          <input
            className="ReceiptsFilterInput"
            autoFocus
            type="date"
            onChange={this.handleFilterChange}
            value={this.state.receiptFilter}
            ref={input => {
              this.searchInput = input;
            }}
          />
        </div>

        <div className="ReceiptPanel">
          {this.state.receipts.map((receipt, index) => (
            <ReceiptCard
              key={index}
              receipt={receipt}
              handleClick={() => this.openReceiptModal(receipt)}
            />
          ))}
        </div>

        {this.state.selectedReceiptId !== null ? (
          <ReceiptModal
            receiptId={this.state.selectedReceiptId}
            handleClose={this.closeReceiptModal}
          />
        ) : (
          undefined
        )}
      </div>
    );
  }
}

export default Receipts;
