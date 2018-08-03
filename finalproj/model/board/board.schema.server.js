var mongoose = require('mongoose');

var BoardSchema = mongoose.Schema ( {
  boardId: String,
  numbers: [{}]
}, {collection: "board" });

module.exports = BoardSchema;
