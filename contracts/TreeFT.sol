// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TreeFT is ERC721URIStorage {

    event newTFT (
        address indexed newOwner,
        uint256 indexed tokenId,
        string indexed tokenURI
    );
    
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdTracker;
    string private _baseTokenURI;

    constructor(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) ERC721(name, symbol) {
        _baseTokenURI = baseTokenURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function generateNewTFT() external {
        _tokenIdTracker.increment();
        uint256 newTokenId = _tokenIdTracker.current();
        _safeMint(msg.sender, newTokenId);

        emit newTFT(msg.sender, newTokenId, tokenURI(newTokenId));
    }
}