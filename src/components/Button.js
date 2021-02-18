import React from "react";
import PropTypes from "prop-types";

function Button({ callBack }) {
  return (
    <div>
      <button type="button" className="Button" onClick={callBack}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  callBack: PropTypes.func.isRequired,
};

export default Button;
