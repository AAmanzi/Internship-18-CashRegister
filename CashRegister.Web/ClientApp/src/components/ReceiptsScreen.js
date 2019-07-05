import React from "react";
import Navbar from "./Navbar";
import Receipts from "./Receipts";

const ReceiptsScreen = props => {
  return (
    <div className="ScreenContainer">
      <Navbar />
      <div className="MainScreen">
        <Receipts />
      </div>
    </div>
  );
};

export default ReceiptsScreen;
