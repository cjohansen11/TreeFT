import React from 'react';
import '../styles/gallery.css';

const ImageCollection = ({ image, changeFeatured }) => {
  return (
    <div className="collection-image">
      <img
        src={image}
        className="each-image-icon"
        onClick={e => changeFeatured(e.target.currentSrc)}></img>
    </div>
  )
}

export default ImageCollection;