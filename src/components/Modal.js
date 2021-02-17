import React from "react";
import PropTypes from "prop-types";

function Modal({ src }) {
  return (
    <>
      <div className="Overlay">
        <div className="Modal">
          <img src={src} alt="Model" />
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {};

export default Modal;
