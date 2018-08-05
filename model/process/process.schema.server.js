var mongoose = require('mongoose');

var ProcessSchema = mongoose.Schema({
  pid: String,
  processCache: [{}]
}, {collection: 'process'});

module.exports = ProcessSchema;
