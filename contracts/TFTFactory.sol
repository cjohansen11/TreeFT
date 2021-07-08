pragma solidity >=0.5.0 <0.6.0;

import "./Ownable.sol";
import "./SafeMath.sol";
import "./ERC721.sol";

contract TFTFactory is Ownable, ERC721 {
  using SafeMath for uint256;

  uint256 private MAX_SUPPLY = 100;
  uint256 private MAX_TFT = 5;

  struct TreeFT {
    string tokenURI;
  }

  TreeFT[] public treeFTs;

  event newTFT(address indexed to, string indexed tokenURI, uint256 indexed id);

  mapping (address => uint256) public _ownerTFTCount;
  mapping (uint256 => address) public _tftToOwner;
  mapping (uint256 => address) private _tftApprovals;

  function balanceOf(address _owner) public view returns (uint256) {
    return _ownerTFTCount[_owner];
  }

  function ownerOf(uint256 _tokenId) public view returns (address) {
    return _tftToOwner[_tokenId];
  }

  function _transfer(address _from, address _to, uint256 _tokenId) internal {
    _ownerTFTCount[_to] = _ownerTFTCount[_to].add(1);
    _ownerTFTCount[msg.sender] = _ownerTFTCount[msg.sender].sub(1);
    _tftToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

  function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
    require(_tftToOwner[_tokenId] == msg.sender || _tftApprovals[_tokenId] == msg.sender);
    _transfer(_from, _to, _tokenId);
  }

  function approve(address _approved, uint256 _tokenId) external payable {
    require(_tftToOwner[_tokenId] == msg.sender);
    _tftApprovals[_tokenId] = _approved;
    emit Approval(msg.sender, _approved, _tokenId);
  }

  function _createTFT(string memory _tokenURI) internal {
    uint id = treeFTs.push(TreeFT(_tokenURI)) - 1;
    _tftToOwner[id] = msg.sender;
    _ownerTFTCount[msg.sender] = _ownerTFTCount[msg.sender].add(1);
    emit newTFT(msg.sender, _tokenURI, id);
  }

  function generateNewTFT(string memory _tokenURI) public {
    require(balanceOf(msg.sender) < MAX_TFT);
    require(treeFTs.length < MAX_SUPPLY);
    _createTFT(_tokenURI);
  }

  function getTFTsToOwner(address _owner) public view returns (uint[] memory) {
    uint[] memory TFTs = new uint[](_ownerTFTCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < treeFTs.length; i++) {
      if (_tftToOwner[i] == _owner) {
        TFTs[counter] = i;
        counter++;
      }
    }
    return TFTs;
  }
}