import React, { Component } from "react";
import PropTypes from "prop-types";

export class Searchbar extends Component {
  state = { imageName: "" };

  handleChange = (e) => {
    this.setState({ imageName: e.currentTarget.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.imageName.trim() === "") {
      alert("Enter picture name");
      return;
    }
    this.props.onSubmit(this.state.imageName.trim());
    this.setState({ imageName: "" });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.imageName}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
