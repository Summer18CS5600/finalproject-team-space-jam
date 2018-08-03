//we create a schema

module.exports = function () {
  var mongoose = require("mongoose"); // mongoDb has no notion of schemas. this is at the application level

  var BoardSchema = mongoose.Schema ({
    boardId: Number,
    numbers: [Number]
  }, {collection: "board" });

  return BoardSchema;
};
