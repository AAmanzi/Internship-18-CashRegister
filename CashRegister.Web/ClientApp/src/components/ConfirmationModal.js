import React, { Component } from "react";

class ConfirmationModal extends Component {
  componentDidMount = () => {
    this.confirmButton.focus();
  };

  handleKeyPress = event => {
    if (event.key === "Escape") {
      this.props.handleClose();
    }
  };

  render() {
    return (
      <div className="ModalCover" onKeyDown={this.handleKeyPress} tabIndex="0">
        <div className="ConfirmationModal">
          <span>Are you sure?</span>
          <div className="ConfirmButtons">
            <button
              ref={button => {
                this.confirmButton = button;
              }}
              onClick={this.props.handleConfirm}
            >
              Yes
            </button>
            <button onClick={this.props.handleClose}>No</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmationModal;
