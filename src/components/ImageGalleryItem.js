import React from "react";
import PropTypes from "prop-types";

function ImageGalleryItem({ src, name, id }) {
  return (
    <>
      <li className="ImageGalleryItem" key={id}>
        <img src={src} alt={name} className="ImageGalleryItem-image" id={id} />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {};

export default ImageGalleryItem;
