import React, { Component } from "react";

export class Searchbar extends Component {
  state = { imageName: "" };

  // Отображение значений в инпуте
  handleChange = (e) => {
    this.setState({ imageName: e.currentTarget.value });
  };

  // Внесение изменений в стэйт imageName по сабмиту формы
  handleSubmit = (e) => {
    const { imageName } = this.state;
    e.preventDefault();
    if (imageName.trim() === "") {
      alert("Enter picture name");
      return;
    }
    this.props.onSubmit(imageName.trim());
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
