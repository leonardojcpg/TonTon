import React from "react";
import "./styles.css";

export const Modal = ({ isOpen, closeModal, content, buttonName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-content">{content}</div>
        <button onClick={closeModal}>
          <span>{buttonName}</span>
        </button>
      </div>
    </div>
  );
};
