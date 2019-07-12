import React, { Component } from "react";
import { formatDate, validateCredentials } from "../../utils";
import { getFilteredReceipts } from "../../services/receipt";
import ReceiptCard from "./ReceiptCard";
import ReceiptModal from "./ReceiptModal";

class Receipts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receiptFilter: "",
      receipts: [],
      selectedReceiptId: null
    };
  }

  componentDidMount = () => {
    const formattedCurrentDateString = formatDate(new Date());

    getFilteredReceipts(formattedCurrentDateString).then(receipts => {
      this.setState({
        receiptFilter: formattedCurrentDateString,
        receipts
      });
    });
  };

  handleFilterChange = event => {
    this.setState({ receiptFilter: event.target.value });
  };

  applyFilter = () => {
    if (!validateCredentials()) {
      return;
    }

    getFilteredReceipts(this.state.receiptFilter).then(receipts => {
      this.setState({ receipts });
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
          <button className="FilterButton" onClick={this.applyFilter}>
            Search
          </button>
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
