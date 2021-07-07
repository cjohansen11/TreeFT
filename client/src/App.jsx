import React, { useState, useEffect } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { sketch } from './sketch.js';
import { sketchToo } from './sketchToo.js';
const axios = require('axios');
const Web3 = require('web3');
const { abi } = require('../../build/contracts/TFTFactory.json');
import uniqueString from 'unique-string';
import Art from './Components/Art.jsx';
import Gallery from './Components/Gallery.jsx';
import NewMint from './Components/NewMint.jsx';
import Styles from './styles/styles.css';
import Frame from './styles/gold_frame.png';
import Metamask from './styles/metamask.svg';
import { GoPrimitiveDot } from 'react-icons/go';


const App = ({ web3 }) => {
  const [generate, setGenerate] = useState(false);
  const [image, setImage] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [isNewMint, setIsNewMint] = useState(false);
  const [newMintJSON, setNewMintJSON] = useState('');
  const [newToken, setNewToken] = useState('');
  const [addBlur, setAddBlur] = useState(false);

  const contractAddr = '0xC8E045632e08C8E0173FC52894f2441a25aE0C91';
  const TFT = new web3.eth.Contract(abi, contractAddr);

  TFT.events.newTFT({ filter: { to: currentAccount }})
    .on('data', event => {
      setNewToken(JSON.stringify(event));
      setIsNewMint(true);
      setAddBlur(true);
    })

  const saveImg = async () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);

    let checkbox = document.getElementsByClassName('checkbox')[0].checked;
    document.getElementsByClassName('checkbox')[0].checked = !checkbox

    let canvas = document.getElementsByClassName('p5Canvas')
    let content = canvas[0].getContext('2d')
    let dataURL = canvas[0].toDataURL("image/png")
    let data = {
      data: dataURL,
      customString: uniqueString()
    }
    await axios.post('/fileUpload', data)
      .then(res => {
        setNewMintJSON(JSON.stringify(res.data))
        TFT.methods.generateNewTFT(res.data).send({ from: currentAccount })
          .on('error', err => {
            setLoading(false);
            console.log('ERROR:', err.message)
          })
          .on('receipt', receipt => {
            console.log(receipt)
            setLoading(false);
          })
      })
  }

  const createArt = async () => {
    setShowGallery(true)
    let checkbox = document.getElementsByClassName('checkbox')[0].checked;

    if (checkbox) {
      document.getElementsByClassName('checkbox')[0].checked = !checkbox
    }

    if (!checkbox) {
      document.getElementsByClassName('checkbox')[0].checked = !checkbox
      setGenerate(!generate)
    }
  }

  useEffect(async () => {
    const checkAccount = setInterval(async () => {
      let accounts = await web3.eth.getAccounts();
      setCurrentAccount(accounts[0]);
    }, 100)
    return () => clearInterval(checkAccount);
  })

  return (
    <div className="app">
      <div className="connected-account">
      <img src={Metamask} className="metamask" />
      <h4>{currentAccount.slice(0, 6) + '...' + currentAccount.slice(37)}</h4>
      <GoPrimitiveDot className="eth-logo" />
      </div>
      <div className={`app-wrapper ${ addBlur ? 'add-blur' : ''}`}>
        <div className="art-wrapper">
          <img src={Frame} className="frame" />
          <Art generate={generate} createArt={createArt} loading={loading} />
        </div>
        <div className="buttons">
          <button onClick={saveImg}>Click to Generate</button>
          <button onClick={createArt}>Click to add</button>
        </div>
      </div>
      {/* {showGallery ? <Gallery showGallery={showGallery} /> : null} */}
      { isNewMint ? <NewMint newToken={newToken} newMintJSON={newMintJSON} setIsNewMint={setIsNewMint} setAddBlur={setAddBlur} /> : null }
    </div>
  )
}

export default App;