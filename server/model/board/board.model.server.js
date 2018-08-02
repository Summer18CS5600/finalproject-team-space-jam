
// this API for the database
//encapsulate all CRUD operations in this
//Only database operations happen here
module.exports = function () {

  var mongoose = require ("mongoose");
  var BoardSchema = require("./game.schema.server")();
  var BoardModel =  mongoose.model("Board", BoardSchema); //mongo plurarizes

  var api = {
    initializeBoard: initalizeBoard,
  };
  return api;

  function initializeBoard(board) {
    board.numbers = []
    // I excluded the ID, we can make it an autoincrement in MongoDB hopefully
    return BoardModel.create(board);
  }

  function addNumber() {

  }

  // function updateBoard() {}


};
