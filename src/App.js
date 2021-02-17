import "./App.css";
import React, { Component } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "react-loader-spinner";
import Modal from "./components/Modal";

export default class App extends Component {
  state = {
    imageName: "",
    isModalOpen: false,
    loading: false,
    pageNumber: 1,
    imagesLength: 0,
    largeImageURL: "",
  };
  handleSerchSubmit = (imageName) => {
    this.setState({ imageName });
  };
  // Получение большой картинки для модалки
  // getLargeImage = (image) => {
  //   this.setState({ largeImageURL: image.largeImageURL });
  // };

  // Открытие модалки с большой картинкой
  handleOpenImage = (foo, e, images, idForModal) => {
    foo(e);
    console.log(idForModal); // ''
    const image = images.find((i) => i.id === idForModal);
    console.log(image); //undefined
    this.setState({ largeImageURL: image.largeImageURL });
    this.setState({ isModalOpen: true });
  };

  // Добавление следующих картинок
  handleLoadMore = () => {
    this.setState((currentState) => {
      return { pageNumber: currentState.pageNumber + 1 };
    });
  };

  // Изменение номера страницы
  changePageNumber = ({ pageNumber }) => {
    const prevPageNumber = pageNumber;
    this.setState({ pageNumber: prevPageNumber + 1 });
  };

  // Изменений длины массива с картинками
  changeImagesLength = (images) => {
    this.setState({ imagesLength: images.length });
  };

  render() {
    const { loading, imageName, pageNumber, imagesLength } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSerchSubmit} />
        <ImageGallery
          imageName={imageName}
          onOpenImage={this.handleOpenImage}
          pageNumber={pageNumber}
          changeImagesLength={this.changeImagesLength}
        />
        {loading && (
          <div className="LoaderContainer">
            <div className="Loader">
              <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={10000}
              />
            </div>
          </div>
        )}
        {imagesLength > 0 && <Button onLoadMore={this.handleLoadMore} />}
        {this.state.isModalOpen && <Modal src={this.largeImageURL} />}
      </>
    );
  }
}
