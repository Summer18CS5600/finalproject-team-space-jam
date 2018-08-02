
// this API for the database
//encapsulate all CRUD operations in this
//Only database operations happen here
module.exports = function () {

  var mongoose = require ("mongoose");
  var GameSchema = require("./game.schema.server")();
  var GameModel =  mongoose.model("Game", GameSchema); //mongo plurarizes

  var api = {
    createGame: createGame,
  };
  return api;

  function createGame(game) {
    // I excluded the ID, we can make it an autoincrement in MongoDB hopefully
    return GameModel.create(game);
  }


};
