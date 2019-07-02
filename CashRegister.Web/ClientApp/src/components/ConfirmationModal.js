import React from "react";

const ConfirmationModal = props => {
  return (
    <div className="ModalCover">
      <div className="ConfirmationModal">
        <button className="CloseButton" onClick={props.handleClose}>
          Close
        </button>
        <span>Are you sure?</span>
        <div className="ConfirmButtons">
          <button onClick={props.handleConfirm}>Yes</button>
          <button onClick={props.handleClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
