const TFTFactory = artifacts.require("TFTFactory");

module.exports = function (deployer) {
  deployer.deploy(TFTFactory);
};
