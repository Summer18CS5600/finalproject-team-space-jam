//we create a schema

module.exports = function () {
  var mongoose = require("mongoose"); // mongoDb has no notion of schemas. this is at the application level

  var GameSchema = mongoose.Schema ({
    gameId: Number,
    boardId: Number,
    users: [Number]
  }, {collection: "game" });

  return GameSchema;
};
