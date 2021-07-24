const NFTCreatorFactory = artifacts.require('NFTCreatorFactory');

contract('NFTCreatorFactory', () => {
  it('should give me the address of the owner', async () => {
    let factory = await NFTCreatorFactory.new();
    let owner = await factory.owner();
    assert(owner === '0x78B713a1B23f0514D4D64118156BC26F0B8d137c');
  });

  it('should generate a new NFT and catch the event', async () => {
    let factory = await NFTCreatorFactory.new();
    let newNFT = await factory.generateNewTFT('test');
    assert(newNFT.logs[0].event === 'NewTFT');
  })

  it('should generate a new NFT', async () => {
    let factory = await NFTCreatorFactory.new();
    let newNFT = await factory.generateNewTFT('test');
    let balance = await factory.balanceOf('0x78B713a1B23f0514D4D64118156BC26F0B8d137c');
    assert(balance.words[0] === 1);
  });

  it('should be able to generate 5 NFTs for a single account', async () => {
    let factory = await NFTCreatorFactory.new();
    for (let i = 0; i < 5; i++) {
      let newNFT = await factory.generateNewTFT('test');
    }
    let balance = await factory.balanceOf('0x78B713a1B23f0514D4D64118156BC26F0B8d137c');
    assert(balance.words[0] === 5);
  });

  it('should not mint a new NFT for an account that has a balance of 5', async () => {
    let factory = await NFTCreatorFactory.new();
    for (let i = 0; i < 5; i++) {
      let newNFT = await factory.generateNewTFT('test');
    }
    let sixthMint = await factory.generateNewTFT('test')
    let balance = await factory.balanceOf('0x78B713a1B23f0514D4D64118156BC26F0B8d137c');
    assert(balance.words[0] === 5);
  })

});