# TreeFT

#### Overview:
TreeFT is a generative art and blockchain project utilizing Solidity, Web3, IPFS, P5, and React.

The application is capable of generating random art with P5, mint custom ERC71 tokens with URI data, fetch and display tokens based on the wallet account connected, and transfer tokens to another Ethereum wallet.

## Optimizations
This project was initially set up with AWS S3 however in the spirit of blockchain I migrated the file system to IPFS utilizing a locally hosted node for uploads.

## Tech Stack

**Front-end:** [React](https://www.reactjs.org), [P5](https://p5js.org/), [Axios](https://github.com/axios/axios), [Webpack](https://webpack.js.org/), and CSS

**Blockchain:** [Solidity](https://docs.soliditylang.org/), [OpenZeppelin](https://openzeppelin.com/), [Truffle & Ganache](https://www.trufflesuite.com/), [Web3](https://web3js.readthedocs.io/), and [Remix](https://remix.ethereum.org/)

**Back-end:** [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), and [IPFS](https://ipfs.io/)

## Roadmap

- Rework smart contract to better implement all guidelines of an ERC721 token
- Write extensive test suite for smart contract
- Build out additional functionality including but not limited to:
  - Full decentralized marketplace where a user can buy or sell pieces
  - Add metadata to generated art pieces to be stored on token URI
  - Add support for additional browser based wallets
  - Add token information to each image in gallery view
- Deploy to permanent web host

## Screenshots

![App Screenshot](https://github.com/cjohansen11/TreeFT/blob/main/readme/homepage.png)
![App Screenshot](https://github.com/cjohansen11/TreeFT/blob/main/readme/gallery.png)
![App Screenshot](https://github.com/cjohansen11/TreeFT/blob/main/readme/mint-screen.png)
![App Screenshot](https://github.com/cjohansen11/TreeFT/blob/main/readme/transfer-screen.png)
![App Screenshot](https://github.com/cjohansen11/TreeFT/blob/main/readme/metamask_mobile.PNG)


## Authors

- [@cjohansen11](https://www.github.com/cjohansen11)

