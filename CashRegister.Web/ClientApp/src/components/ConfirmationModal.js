import React, { Component } from "react";

class ConfirmationModal extends Component {
  componentDidMount = () => {
    this.confirmButton.focus();
  };

  render() {
    return (
      <div className="ModalCover">
        <div className="ConfirmationModal">
          <button className="CloseButton" onClick={this.props.handleClose}>
            Close
          </button>
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
