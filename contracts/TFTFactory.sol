// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract NFTCreatorFactory is IERC721, IERC721Metadata, ERC165, Ownable {
    using SafeMath for uint256;
    using Address for address;

    uint256 private MAX_SUPPLY = 100;
    uint256 private MAX_TFT = 5;
    string private _name = "TreeFT";
    string private _symbol = "TFT";

    struct TreeFT {
        string tokenURI;
    }

    TreeFT[] private treeFTs;

    event NewTFT(
        address indexed owner,
        string indexed tokenURI,
        uint256 indexed id
    );

    mapping(uint256 => address) public tftToOwner;
    mapping(address => uint256) ownerTFTCount;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    constructor() Ownable() {}

    function _createTFT(string memory _tokenURI) internal {
        treeFTs.push(TreeFT(_tokenURI));
        uint256 id = treeFTs.length - 1;
        tftToOwner[id] = msg.sender;
        ownerTFTCount[msg.sender] = ownerTFTCount[msg.sender].add(1);
        emit NewTFT(msg.sender, _tokenURI, id);
    }

    function generateNewTFT(string memory _tokenURI) public {
        require(NFTCreatorFactory.balanceOf(msg.sender) < MAX_TFT);
        require(treeFTs.length < MAX_SUPPLY);
        _createTFT(_tokenURI);
    }

    function getTFTsToOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory TFTs = new uint256[](ownerTFTCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < treeFTs.length; i++) {
            if (tftToOwner[i] == _owner) {
                TFTs[counter] = i;
                counter++;
            }
        }
        return TFTs;
    }

    /**
     * @dev IERC721 Metadata implementation
     */
    function name() external view override returns (string memory) {
        return _name;
    }

    function symbol() external view override returns (string memory) {
        return _symbol;
    }

    function tokenURI(uint256 tokenId)
        external
        view
        override
        returns (string memory)
    {
        // require(tftToOwner[tokenId] == msg.sender);
        return treeFTs[tokenId].tokenURI;
    }

    /**
     * @dev IERC721 implementation
     */

    function balanceOf(address owner)
        public
        view
        override
        returns (uint256 balance)
    {
        require(owner != address(0));
        return ownerTFTCount[owner];
    }

    function ownerOf(uint256 tokenId)
        external
        view
        override
        returns (address owner)
    {
        owner = tftToOwner[tokenId];
        require(owner != address(0));
        return owner;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        require(from != address(0));
        require(to != address(0));
        require(tftToOwner[tokenId] == msg.sender);
        if (msg.sender != from) {
            require(_tokenApprovals[tokenId] == msg.sender);
        }
        require(!to.isContract());

        _tokenApprovals[tokenId] = address(0);
        ownerTFTCount[from] = ownerTFTCount[from].sub(1);
        ownerTFTCount[to] = ownerTFTCount[to].add(1);
        tftToOwner[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external override {
        NFTCreatorFactory.safeTransferFrom(from, to, tokenId);
    }

    function approve(address to, uint256 tokenId) external override {
        require(
            tftToOwner[tokenId] == msg.sender ||
                _tokenApprovals[tokenId] == msg.sender
        );

        address approved = to;
        address owner = tftToOwner[tokenId];
        _tokenApprovals[tokenId] = approved;

        emit Approval(owner, approved, tokenId);
    }

    function getApproved(uint256 tokenId)
        external
        view
        override
        returns (address operator)
    {
        operator = _tokenApprovals[tokenId];
        require(operator != address(0));

        return operator;
    }

    function setApprovalForAll(address operator, bool _approved)
        external
        override
    {
        require(operator != msg.sender);

        address owner = msg.sender;
        _operatorApprovals[owner][operator] = _approved;

        emit ApprovalForAll(owner, operator, _approved);
    }

    function isApprovedForAll(address owner, address operator)
        external
        view
        override
        returns (bool)
    {
        require(owner != address(0));

        return _operatorApprovals[owner][operator];
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external override {}
}
