// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract TreeFT is ERC721Enumerable, Ownable {
    
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdTracker;
    string private _baseTokenURI;
    uint256 public MAX_SUPPLY = 1000;
    uint256 private _OWNERSHIP_CAP = 5;

    event newTFT (
        address indexed newOwner,
        uint256 indexed tokenId,
        string indexed tokenURI
    );

    constructor(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) ERC721(name, symbol) {
        _baseTokenURI = baseTokenURI;
    }

    function _baseURI() 
        internal 
        view 
        override 
        returns (string memory) 
    {
        return _baseTokenURI;
    }

    function generateNewTFT() 
        external 
    {
        require(_tokenIdTracker.current() < MAX_SUPPLY, "No more TFT's available");

        require(balanceOf(msg.sender) < _OWNERSHIP_CAP, "You already have the max number of TFT's allowed per wallet");

        _tokenIdTracker.increment();
        uint256 newTokenId = _tokenIdTracker.current();

        _safeMint(msg.sender, newTokenId);

        emit newTFT(msg.sender, newTokenId, tokenURI(newTokenId));
    }

    function allOwnedTokens(address owner) 
        external
        view
        returns (uint256[] memory)
    {
        uint256 currentIdCount = _tokenIdTracker.current();
        uint256[] memory ownedTokens = new uint256[](balanceOf(owner));
        uint256 counter;
        for (uint256 i = 1; i <= currentIdCount; i++) {
            if (ownerOf(i) == owner) {
                ownedTokens[counter] = i;
                counter++;
            }
        }

        return ownedTokens;
    }
}