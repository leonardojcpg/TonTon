import React from "react";
import "./styles.css";

export const Modal = ({ isOpen, closeModal, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal">
        {content}
        <button onClick={closeModal}>
          <span>x</span>
        </button>
      </div>
    </div>
  );
};
