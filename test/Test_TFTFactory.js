const TFTFactory = artifacts.require('TFTFactory.sol');

contract('TFTFactory', () => {
  it('should give me the address of the owner', async () => {
    let factory = await TFTFactory.new();
    let owner = await factory.owner();
    assert(owner === '0x627306090abaB3A6e1400e9345bC60c78a8BEf57');
  });

  // it('should generate a new NFT', async () => {
  //   let factory = await TFTFactory.new();
  //   let newNFT = await factory.generateNewTFT('test');
  //   let balance = await factory.balanceOf('0x627306090abaB3A6e1400e9345bC60c78a8BEf57');
  //   assert(balance === 1);
  // })
});