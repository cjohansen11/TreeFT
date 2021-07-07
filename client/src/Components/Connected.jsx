import React from 'react';
import Metamask from '../styles/metamask.svg';

const Connected = ({ currentAccount }) => {
  return (
    <div className="connected-account">
      <img src={Metamask} className="metamask" />
      <h4 className="connected-address" title={currentAccount}>{currentAccount.slice(0, 6) + '...' + currentAccount.slice(38)}</h4>
    </div>
  )
}

export default Connected;