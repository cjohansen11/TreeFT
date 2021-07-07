import React from 'react';
import '../styles/newmint.css';

const NewMint = ({ newToken, newMintJSON, setIsNewMint, setAddBlur }) => {
  let parsed = JSON.parse(newToken);
  let uriParsed = JSON.parse(newMintJSON);

  let contractAddress = parsed.address;
  let trxHash = parsed.transactionHash;
  let image = uriParsed.image;

  return (
    <div className="new-mint">
      <div className="mint-wrapper">
      <button className="close-mint" onClick={() => {
        setIsNewMint(false);
        setAddBlur(false);
        }}>Close</button>
        <img className="mint-image" src={image}></img>
        <div className="metadata">
          <h2 className="new-mint-title">TreeFT</h2>
          <h4 className="mint-contract" >Contract: </h4><a href={`https://rinkeby.etherscan.io/address/${contractAddress}`} target="_blank">{contractAddress.slice(0, 8) + '...' + contractAddress.slice(38)}</a>
          <h4 className="mint-transaction" >Transaction: </h4><a href={`https://rinkeby.etherscan.io/tx/${trxHash}`} target="_blank">{trxHash.slice(0, 8) + '...' + trxHash.slice(60)}</a>
        </div>
      </div>
    </div>
  )
}

export default NewMint;