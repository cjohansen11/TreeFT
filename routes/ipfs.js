const { create, urlSource } = require('ipfs-http-client');
const ipfs = create();

const addFile = async (req, res) => {
  let base64ToImg = new Buffer.from(req.body.data.replace(/^data:image\/\w+;base64,/,""), 'base64');

  const filesAdded = await ipfs.add(base64ToImg);

  const pinFile = await ipfs.pin.add(filesAdded.cid);

  const tokenURI = {
    title: 'TreeFT',
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'TreeFT'
      },
      image: {
        type: 'string',
        description: `http://localhost:8080/ipfs/${filesAdded.path}`
      }
    }
  }

  const jsonAdded = await ipfs.add(JSON.stringify(tokenURI));

  const pinJSON = await ipfs.pin.add(jsonAdded.cid);

  res.status(201).send(tokenURI);
}

module.exports = {
  addFile
}