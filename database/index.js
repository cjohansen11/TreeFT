const mongoose = require('mongoose');

const collectorSchema = new mongoose.Schema({
  address: String,
  date: String,
  transaction: String,
  tokenURI: [mongoose.Schema.Types.Mixed]
});

const Collector = mongoose.model('Collector', collectorSchema);

module.exports = {
  Collector
}