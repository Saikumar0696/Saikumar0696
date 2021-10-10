import React from "react";
import "../Styles/dialog.css";

const Dialog = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <div>
      <div className="dialogStyles">
        <button
          className="dialogCloseButtonStyles"
          onClick={() => {
            onClose();
          }}
        >
          x
        </button>

        <div>Do you want to make a new order ?</div>
      </div>
    </div>
  );
};

export default Dialog;
