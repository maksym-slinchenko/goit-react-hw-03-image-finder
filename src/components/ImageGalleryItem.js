import React from "react";
import PropTypes from "prop-types";

function ImageGalleryItem({ src, name, id }) {
  return (
    <>
      <li className="ImageGalleryItem" key={String(id)}>
        <img
          src={src}
          alt={name}
          className="ImageGalleryItem-image"
          id={String(id)}
        />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ImageGalleryItem;
