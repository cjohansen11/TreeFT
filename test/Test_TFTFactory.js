const TFTFactory = artifacts.require('TFTFactory.sol');

contract('TFTFactory', () => {
  it('should give me the address of the owner', async () => {
    let factory = await TFTFactory.new();
    let owner = await factory.owner();
    assert(owner === '0x627306090abaB3A6e1400e9345bC60c78a8BEf57');
  });

  it('should generate a new NFT and catch the event', async () => {
    let factory = await TFTFactory.new();
    let newNFT = await factory.generateNewTFT('test');
    assert(newNFT.logs[0].event === 'newTFT');
  })

  it('should generate a new NFT', async () => {
    let factory = await TFTFactory.new();
    let newNFT = await factory.generateNewTFT('test');
    let balance = await factory.balanceOf('0x627306090abaB3A6e1400e9345bC60c78a8BEf57');
    assert(balance.words[0] === 1);
  });

  it('should be able to generate 5 NFTs for a single account', async () => {
    let factory = await TFTFactory.new();
    for (let i = 0; i < 5; i++) {
      let newNFT = await factory.generateNewTFT('test');
    }
    let balance = await factory.balanceOf('0x627306090abaB3A6e1400e9345bC60c78a8BEf57');
    assert(balance.words[0] === 5);
  });

  it('should not mint a new NFT for an account that has a balance of 5', async () => {
    let factory = await TFTFactory.new();
    for (let i = 0; i < 5; i++) {
      let newNFT = await factory.generateNewTFT('test');
    }
    let balance = await factory.balanceOf('0x627306090abaB3A6e1400e9345bC60c78a8BEf57');
    factory.generateNewTFT('test')
    .then(err => {
      console.log('ERROR', err)
      assert(err)
    })
    // console.log(sixthNFT)
    assert(balance.words[0] === 5);
  })

});