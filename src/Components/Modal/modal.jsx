import React from "react";
import "./styles.css";

export const Modal = ({ isOpen, closeModal, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-content">
          {content}
        </div>
        <button onClick={closeModal}>
          <span>x</span>
        </button>
      </div>
    </div>
  );
};
