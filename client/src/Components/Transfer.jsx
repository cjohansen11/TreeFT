import React, { useState, useEffect } from 'react';
import '../styles/transfer.css';

const Transfer = ({ featuredToken, transferToken, loading }) => {
  const [transferAddr, setTransferAddr] = useState('');

  return (
    <div className="transfer-screen">
      <div className="active-transfer">
        <div className="featured-image">
          {loading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : null}
          <img
            src={featuredToken.image}
            className={`transfer-featured-image-img ${loading ? 'transfer-loading' : ''}`} ></img>
        </div>
        <form className={`transfer-form ${loading ? 'transfer-loading' : ''}`}>
          <label htmlFor="address" className="address-label">Address - </label>
          <input
            type="address"
            name="address"
            className="address-input"
            pattern="/^0x+[0-9A-F]{40}$/gi"
            required
            onChange={e => setTransferAddr(e.target.value)}></input>
          <input
            type="submit"
            value="Transfer"
            className="transfer-button"
            onClick={(e) => {
              e.preventDefault();
              transferToken(Number(featuredToken.token), transferAddr);
            }}></input>
        </form>
      </div>
    </div>
  )
}

export default Transfer;