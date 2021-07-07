import React, { useState, useEffect } from 'react';
import ImageCollection from './ImageCollection.jsx';
import '../styles/gallery.css';

const Gallery = ({ setShowGallery, imageCollection, setImageCollection, setAddBlur }) => {
  const [featured, setFeatured] = useState('');

  const changeFeatured = (_image) => {
    // console.log(_image)
    setFeatured(_image);
  }

  useEffect(() => {
    setFeatured(imageCollection[0])
  }, [imageCollection])

  return (
    <div className="gallery">
      <div className="user-gallery">
        <button className="close-gallery"
        onClick={() => {
          setShowGallery(false);
          setAddBlur(false);
          setImageCollection([]);
          }}>Close</button>
        <div className="featured-image">
          <img src={featured} className="featured-image-img"></img>
        </div>
        <div className="image-icons">
          {imageCollection.map(image => {
            return <ImageCollection
              image={image}
              key={image}
              changeFeatured={changeFeatured} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Gallery;