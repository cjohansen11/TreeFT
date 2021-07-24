const NFTCreatorFactory = artifacts.require("NFTCreatorFactory");

module.exports = function (deployer) {
  deployer.deploy(NFTCreatorFactory);
};
