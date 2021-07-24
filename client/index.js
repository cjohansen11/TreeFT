import ReactDOM from 'react-dom';
import React from 'react';
const Web3 = require('web3');

import App from './src/App.jsx';

window.addEventListener('load', async () => {
  if (typeof window.ethereum !== 'undefined') {
    web3 = await new Web3(window.ethereum);
    await ethereum.enable();
    ReactDOM.render(
      <App web3={web3} />,
      document.getElementById('root')
    );
  } else {
    console.log('no providers')
  }
})
