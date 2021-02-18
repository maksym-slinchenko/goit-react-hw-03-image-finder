import React, { Component } from "react";

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this.props.onCloseByKey);
  }
  render() {
    const { src, onCloseModelOverlay } = this.props;
    return (
      <>
        <div className="Overlay" onClick={onCloseModelOverlay}>
          <div className="Modal">
            <img src={src} alt="Model" />
          </div>
        </div>
      </>
    );
  }
}
