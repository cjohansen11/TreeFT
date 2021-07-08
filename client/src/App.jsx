import React, { useState, useEffect } from 'react';

/**
 * P5 imports
 */
import P5Wrapper from 'react-p5-wrapper';
import { sketch } from './sketch.js';
import { sketchToo } from './sketchToo.js';

/**
 * Ethereum/Blockchain imports
 */
const Web3 = require('web3');
const { abi } = require('../../build/contracts/TFTFactory.json');
const { contractAddr } = require('../../config/config.js');

/**
 * Misc imports
 */
const axios = require('axios');
import uniqueString from 'unique-string';

/**
 * Component imports
 */
import Art from './Components/Art.jsx';
import Gallery from './Components/Gallery.jsx';
import NewMint from './Components/NewMint.jsx';
import Connected from './Components/Connected.jsx';
import Navigation from './Components/Navigation.jsx';
import Transfer from './Components/Transfer.jsx';

/**
 * Styling import
 */
import './styles/styles.css';


const App = ({ web3 }) => {

  /**
   * STATES
   */
  const [generate, setGenerate] = useState(false);
  const [image, setImage] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [isNewMint, setIsNewMint] = useState(false);
  const [newMintJSON, setNewMintJSON] = useState('');
  const [newToken, setNewToken] = useState('');
  const [addBlur, setAddBlur] = useState(false);
  const [imageCollection, setImageCollection] = useState([]);
  const [canMint, setCanMint] = useState(false);
  const [isTranfer, setIsTransfer] = useState(false);
  const [featuredToken, setFeaturedToken] = useState('');

  /**
   * Contract connection
   */
  const TFT = new web3.eth.Contract(abi, contractAddr);

  /**
   * Chain event listeners
   */
  TFT.events.newTFT({ filter: { to: currentAccount } })
    .on('data', event => {
      setNewToken(JSON.stringify(event));
      setIsNewMint(true);
      setAddBlur(true);
    })

  /**
   * Fetches token URI data from chain
   */
  const getTokenURI = async (_token) => {
    let tokenURI = await TFT.methods.treeFTs(Number(_token)).call();
    let parsedTokenURI = JSON.parse(tokenURI);
    let tokenObject = {
      token: _token,
      image: parsedTokenURI.image
    }
    setImageCollection(prev => [...prev, tokenObject]);
  }

  /**
   * Fetches all tokens for a given address
   */
  const getCollection = async (_address) => {
    setShowGallery(true);
    setAddBlur(true);
    let tokens = await TFT.methods.getTFTsToOwner(_address).call();
    tokens.forEach(async (token) => {
      await getTokenURI(token);
    })
  }

  /**
   * Mints a new token
   */
  const _generateTFT = (_data) => {
    _data = JSON.stringify(_data);
    TFT.methods.generateNewTFT(_data).send({ from: currentAccount })
      .on('error', err => {
        setLoading(false);
        console.log('ERROR:', err.message)
      })
      .on('receipt', receipt => {
        console.log(receipt)
        setLoading(false);
      })
  }

  /**
   * Uploads data to S3 database
   * then calls _generateTFT to mint new token
   */
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
        return res.data;
      })
      .then((data) => {
        _generateTFT(data);
      })
  }

  /**
   * Handles transfer requests between accounts
   */
  const transferToken = (_tokenId, _to) => {
    setLoading(true);
    TFT.methods.transferFrom(currentAccount, _to, _tokenId).send({ from: currentAccount })
      .on('error', err => {
        console.log(err.message);
        setLoading(false);
        setIsTransfer(false);
      })
      .on('receipt', receipt => {
        console.log(receipt);
        setLoading(false);
        setIsTransfer(false);
        setImageCollection([]);
        getCollection(currentAccount);
      })
  }

  /**
   * Operates the 'curtains' and generates a new art piece
   */
  const createArt = async () => {
    let checkbox = document.getElementsByClassName('checkbox')[0].checked;
    if (checkbox) {
      document.getElementsByClassName('checkbox')[0].checked = !checkbox
    }
    if (!checkbox) {
      document.getElementsByClassName('checkbox')[0].checked = !checkbox
      setGenerate(!generate)
    }
  }

  /**
   * Makes a check every millisecond to see if current connected account has changed
   */
  useEffect(async () => {
    const checkAccount = setInterval(async () => {
      let accounts = await web3.eth.getAccounts();
      setCurrentAccount(accounts[0]);
    }, 100)
    return () => clearInterval(checkAccount);
  })

  return (
    <div className="app">
      {/* {Navigation bar} */}
      <Navigation
        createArt={createArt}
        saveImg={saveImg}
        getCollection={getCollection}
        currentAccount={currentAccount}
        canMint={canMint}
        setCanMint={setCanMint}
        addBlur={addBlur} />
        {/* {Frame with CSS curtains and P5 sketches} */}
      <Art
        generate={generate}
        loading={loading}
        addBlur={addBlur} />
        {/* {Gallery modal - appears when Gallery button is clicked} */}
      {showGallery ? <Gallery
        setShowGallery={setShowGallery}
        imageCollection={imageCollection}
        setAddBlur={setAddBlur}
        setImageCollection={setImageCollection}
        featuredToken={featuredToken}
        setFeaturedToken={setFeaturedToken}
        setIsTransfer={setIsTransfer} /> : null}
        {/* {Mint modal - appears when new mint is successful} */}
      {isNewMint ? <NewMint
        newToken={newToken}
        newMintJSON={newMintJSON}
        setIsNewMint={setIsNewMint}
        setAddBlur={setAddBlur} /> : null}
        {/* {Transfer modal - appears when Transfer button is clicked within the gallery} */}
        {isTranfer ? <Transfer
        featuredToken={featuredToken}
        transferToken={transferToken}
        loading={loading}
        setIsTransfer={setIsTransfer} /> : null}
    </div>
  )
}

export default App;