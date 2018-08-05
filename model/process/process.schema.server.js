var mongoose = require('mongoose');

var ProcessSchema = mongoose.Schema({
  pid: String,
  processCache: [{}],
  processHits: Number,
  processMisses: Number
}, {collection: 'process'});

module.exports = ProcessSchema;
