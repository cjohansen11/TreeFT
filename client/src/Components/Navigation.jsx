import React from 'react';
import Connected from './Connected.jsx';
import '../styles/navigation.css';

const Navigation = ({ createArt, saveImg, getCollection, currentAccount, canMint, setCanMint, addBlur }) => {
  return (
    <div className={`navigation ${addBlur ? 'add-blur' : ''}`}>
      <button
        className="already-collector"
        onClick={() => getCollection(currentAccount)}
      >Gallery</button>
      <button
        className="new-collector"
        onClick={createArt}
      >Create</button>
      <button
        className="save-to-collection"
        onClick={saveImg}
      >Mint</button>
      <Connected
        currentAccount={currentAccount} />
    </div>
  )
}

export default Navigation;