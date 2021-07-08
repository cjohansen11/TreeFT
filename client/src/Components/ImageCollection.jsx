import React from 'react';
import '../styles/gallery.css';

const ImageCollection = ({ token, image, changeFeatured }) => {
  return (
    <div className="collection-image">
      <img
        src={image}
        className="each-image-icon"
        onClick={e => changeFeatured(token)}></img>
    </div>
  )
}

export default ImageCollection;