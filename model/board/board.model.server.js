var mongoose = require('mongoose');
var BoardSchema = require("./board.schema.server");
var BoardModel = mongoose.model("BoardModel", BoardSchema);

//are bound to the functions below. this is essentially defining the api.
BoardModel.createBoard = createBoard;
BoardModel.findBoard = findBoard;
BoardModel.accessMemory = accessMemory;

module.exports = BoardModel;

//call the db specific functions.
function createBoard(board) {
  console.log("in model");
  console.log(board);
  var newBoard = board;
  return BoardModel.create(newBoard);
}

function findBoard(boardId) {
  console.log("in model finding board: " + boardId);
  return BoardModel.findOne({boardId: boardId});
}

function accessMemory(boardId, value) {
  console.log("in model access memory" + boardId + " : " + value);
}
