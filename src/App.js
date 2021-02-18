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
    idForModal: 0,
    error: null,
  };
  handleSerchSubmit = (imageName) => {
    this.setState({ imageName });
  };

  // Открытие модалки с большой картинкой
  handleOpenImage = (e, images) => {
    if (!e.target.src) {
      return;
    }
    const targetId = e.target.id;
    const image = images.find((i) => i.id === Number(targetId));
    this.setState({ largeImageURL: image.largeImageURL });
    this.setState({ isModalOpen: true });
  };

  // Добавление кнопки Load more
  isLoadMoreVisible = () => {
    if (this.state.imagesLength === 0 && this.state.loading === false) {
      return false;
    }
  };
  // Добавление следующих картинок
  handleLoadMore = () => {
    this.setState((currentState) => {
      return { pageNumber: currentState.pageNumber + 1 };
    });
  };

  // Изменение номера страницы
  resetPageNumber = () => {
    this.setState({ pageNumber: 1 });
  };

  // Изменение состояние loading
  changeLoading = (bool) => {
    this.setState({ loading: bool });
  };

  // Изменений длины массива с картинками
  changeImagesLength = (images) => {
    this.setState({ imagesLength: images.length });
  };
  // Закрытие модалки по клику на оверлей
  handleCloseByOverlay = (e) => {
    if (!e.target.classList.contains("Overlay")) {
      return;
    }
    this.setState({ isModalOpen: false });
  };

  // Закрытие модалки по Esc
  handleCloseByKey = (event) => {
    if (event.code !== "Escape") {
      return;
    }
    this.setState({ isModalOpen: false });
  };

  // Обработка ошибки запроса
  errorHandling = (errorMessage) => {
    this.setState({ error: errorMessage }, () => {
      alert(this.state.error);
    });
  };

  render() {
    const {
      loading,
      imageName,
      pageNumber,
      isModalOpen,
      imagesLength,
    } = this.state;
    return (
      <div onKeyDown={this.handleCloseByKey}>
        <Searchbar onSubmit={this.handleSerchSubmit} />
        <ImageGallery
          imageName={imageName}
          onOpenImage={this.handleOpenImage}
          pageNumber={pageNumber}
          changeImagesLength={this.changeImagesLength}
          resetPageNumber={this.resetPageNumber}
          changeLoading={this.changeLoading}
          errorHandling={this.errorHandling}
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
        {imagesLength > 0 && <Button callBack={this.handleLoadMore} />}
        {isModalOpen && (
          <Modal
            src={this.state.largeImageURL}
            onCloseModelOverlay={this.handleCloseByOverlay}
            onCloseByKey={this.handleCloseByKey}
          />
        )}
      </div>
    );
  }
}
