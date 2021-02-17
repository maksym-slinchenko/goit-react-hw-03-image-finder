import React, { Component } from "react";

export class Button extends Component {
  render() {
    return (
      <div>
        <button
          type="button"
          className="Button"
          onClick={this.props.onLoadMore}
        >
          Load more
        </button>
      </div>
    );
  }
}

export default Button;
