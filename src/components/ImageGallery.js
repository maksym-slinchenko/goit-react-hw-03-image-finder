import React, { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem";

export default class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    key: "19420354-3227e9c850ee70e183cd8e591",
    idForModal: "",
  };
  componentDidUpdate = (prevProps) => {
    if (
      prevProps.imageName !== this.props.imageName ||
      prevProps.pageNumber !== this.props.pageNumber
    ) {
      this.getImages();
    }
  };

  // Рендерим картинки в Галерею
  getImages = () => {
    const prevImages = this.state.images;
    console.log(this.state.images);
    this.setState(() => {
      return { loading: true, images: [] };
    });
    console.log(this.state.images);

    fetch(
      `https://pixabay.com/api/?key=${this.state.key}&q=${this.props.imageName}&image_type=photo&per_page=3&page=${this.props.pageNumber}`
    )
      .then((r) => r.json())
      .then((r) => this.setState({ images: [...prevImages, ...r.hits] }))
      .finally(() => {
        this.setState({ loading: false });
        this.props.changeImagesLength(this.state.images);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

  // Получаем id от картинки, на которую кликаем
  handleGetId = (e) => {
    const targetId = e.target.id;
    console.log(e.target.id); //736877
    this.setState({ idForModal: targetId });
  };

  render() {
    const { images, idForModal } = this.state;
    return (
      <>
        <ul
          className="ImageGallery"
          onClick={(e) =>
            this.props.onOpenImage(this.handleGetId, e, images, idForModal)
          }
        >
          {images.map((i) => (
            <ImageGalleryItem src={i.webformatURL} name={i.type} id={i.id} />
          ))}
        </ul>
      </>
    );
  }
}
