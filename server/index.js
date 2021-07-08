const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { PORT } = require('../config/config.js');
const { uploadFile } = require('../routes/upload.js');
const { addFile } = require('../routes/ipfs.js');

/**
 * Ended up using the blockchain and S3 for data storage
 */
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/tft', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// const db = mongoose.connection;
// db.on('error', error => console.log(error.message));
// db.once('open', () => console.log('Connection open to TFT database'));

const activePort = process.env.PORT || PORT;

app.use(bodyParser.json({ limit : '50mb' }));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'))

app.route('/fileUpload')
  // .post(uploadFile)
  .post(addFile)

app.listen(activePort, () => {
  console.log(`NFT Creator listening on port: ${activePort}`);
});