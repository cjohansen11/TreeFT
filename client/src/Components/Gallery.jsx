import React, { useState, useEffect } from 'react';
import ImageCollection from './ImageCollection.jsx';
import '../styles/gallery.css';

const Gallery = ({ setShowGallery, imageCollection, setImageCollection, setAddBlur, featuredToken, setFeaturedToken, setIsTransfer }) => {
  const [featured, setFeatured] = useState('');

  const changeFeatured = (_token) => {
    setFeatured(_token.image);
    setFeaturedToken(_token);
  }

  useEffect(() => {
    if (imageCollection.length) {
      setFeaturedToken(imageCollection[0]);
      setFeatured(imageCollection[0].image)
    }
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
        <button
        className="submit-transfer"
        onClick={() => setIsTransfer(true)}
        >Transfer</button>
        <div className="featured-image">
          <img src={featured} className="featured-image-img"></img>
        </div>
        <div className="image-icons">
          {imageCollection.map(token => {
            return <ImageCollection
              token={token}
              image={token.image}
              key={token.token}
              changeFeatured={changeFeatured} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Gallery;