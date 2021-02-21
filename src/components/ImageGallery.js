import React, { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import imageAPI from "../service/ImageApi";

export default class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
  };
  componentDidUpdate = (prevProps, prevState) => {
    const { imageName, pageNumber, resetPageNumber } = this.props;
    // Если запрос изменился, то обнуляем массив картинок и номер страницы,
    // и рендерим картинки
    if (prevProps.imageName !== imageName) {
      this.setState({ images: [] }, () => {
        this.getImages(this.state.images);
      });
      resetPageNumber();
      return;
    }
    // Если номер стр изменился и стэйт остался без изменений,
    // рендерим картинки
    if (prevProps.pageNumber !== pageNumber && prevState === this.state) {
      this.getImages(this.state.images);
    }
  };

  // Рендерим картинки в Галерею
  getImages = (prevImages) => {
    const { key } = this.state;
    const {
      changeLoading,
      imageName,
      pageNumber,
      changeImagesLength,
      errorHandling,
    } = this.props;
    changeLoading(true);
    imageAPI
      .fetchImage(imageName, pageNumber)
      .then((r) => {
        if (r.total > 0) {
          return this.setState({ images: [...prevImages, ...r.hits] });
        }

        errorHandling(`No resault on your request "${imageName}"`);
        return;
      })
      .catch((error) => errorHandling(error.message))
      .finally(() => {
        changeLoading(false);
        changeImagesLength(this.state.images);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <ul
          className="ImageGallery"
          onClick={(e) => this.props.onOpenImage(e, images)}
        >
          {images.map((i) => (
            <ImageGalleryItem src={i.webformatURL} name={i.type} id={i.id} />
          ))}
        </ul>
      </>
    );
  }
}
