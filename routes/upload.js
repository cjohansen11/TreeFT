const fs = require('fs');
const AWS = require('aws-sdk');
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME } = require('../config/config.js');
const { addToCollection } = require('./database.js');

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY
});

const uploadFile = async (req, res) => {

  let base64ToImg = new Buffer.from(req.body.data.replace(/^data:image\/\w+;base64,/,""), 'base64')

  let type = req.body.data.split(';')[0].split('/')[1];

  const params = {
    Bucket: BUCKET_NAME,
    Key: `${req.body.customString}.${type}`,
    Body: base64ToImg,
    ContentEncoding: 'base64',
    ContentType: `image/${type}`
  }

  const tokenURI = {
    name: 'TreeFT',
    description: 'Generative art NFT',
    image: ''
  }

  let s3UploadAdd;
  let s3TokenURI;

  s3.upload(params, (err, data) => {
    if (err) throw err;
    console.log(`File uploaded successfully! ${data.Location}`);
    s3UploadAdd = data.Location;
    tokenURI.image = data.Location;

    const JSONparams = {
      Bucket: BUCKET_NAME,
      Key: `${req.body.customString}.json`,
      Body: JSON.stringify(tokenURI),
      ContentType: `application/json`
    }

    s3.upload(JSONparams, (err, json) => {
      console.log(`File uploaded successfully! ${json.Location}`);
      s3TokenURI = json.Location;
      addToCollection(tokenURI);
      res.status(201).send(tokenURI);
    })

  });

};

module.exports = {
  uploadFile
}