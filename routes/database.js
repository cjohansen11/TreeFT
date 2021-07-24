const { Collector } = require('../database/index.js');

const addToCollection = async (_collector) => {
  console.log(_collector)
  let query = Collector.find({ address : _collector.address })
}

module.exports = {
  addToCollection
}