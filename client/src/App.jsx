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
import Connected from './Components/Connected.jsx';
import Navigation from './Components/Navigation.jsx';
import './styles/styles.css';


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
  const [imageCollection, setImageCollection] = useState([]);
  const [canMint, setCanMint] = useState(false);

  const contractAddr = '0x1dB358283fEbD3926E640DEe977023Ee20fF5488';
  const TFT = new web3.eth.Contract(abi, contractAddr);

  TFT.events.newTFT({ filter: { to: currentAccount } })
    .on('data', event => {
      setNewToken(JSON.stringify(event));
      setIsNewMint(true);
      setAddBlur(true);
    })

  const getTokenURI = async (_token) => {
    let tokenURI = await TFT.methods.treeFTs(Number(_token)).call();
    let parsedTokenURI = JSON.parse(tokenURI);
    setImageCollection(prev => [...prev, parsedTokenURI.image]);
  }

  const getCollection = async (_address) => {
    setShowGallery(true);
    setAddBlur(true);
    let tokens = await TFT.methods.getTFTsToOwner(_address).call();
    tokens.forEach(async (token) => {
      await getTokenURI(token);
    })
  }

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

  useEffect(async () => {
    const checkAccount = setInterval(async () => {
      let accounts = await web3.eth.getAccounts();
      setCurrentAccount(accounts[0]);
    }, 100)
    return () => clearInterval(checkAccount);
  })

  return (
    <div className="app">
      <Navigation
        createArt={createArt}
        saveImg={saveImg}
        getCollection={getCollection}
        currentAccount={currentAccount}
        canMint={canMint}
        setCanMint={setCanMint}
        addBlur={addBlur} />
      <Art
        generate={generate}
        loading={loading}
        addBlur={addBlur} />
      {showGallery ? <Gallery
        setShowGallery={setShowGallery}
        imageCollection={imageCollection}
        setAddBlur={setAddBlur}
        setImageCollection={setImageCollection} /> : null}
      {isNewMint ? <NewMint
        newToken={newToken}
        newMintJSON={newMintJSON}
        setIsNewMint={setIsNewMint}
        setAddBlur={setAddBlur} /> : null}
    </div>
  )
}

export default App;