var mongoose = require('mongoose');
var BoardSchema = require("./board.schema.server");
var BoardModel = mongoose.model("BoardModel", BoardSchema);

//are bound to the functions below. this is essentially defining the api.
BoardModel.createBoard = createBoard;
BoardModel.findBoard = findBoard;
BoardModel.updateBoard = updateBoard;

module.exports = BoardModel;

//call the db specific functions.
function createBoard(board) {
  //console.log("MODEL: creating board: " + board.boardId);
  //console.log(board);
  var newBoard = board;
  return BoardModel.create(newBoard);
}

function findBoard(boardId) {
  //console.log("MODEL: finding board: " + boardId);
  return BoardModel.findOne({boardId: boardId});
}

function updateBoard(boardId, board) {
  //console.log("MODEL: updating board: " + boardId);
  return BoardModel.update({boardId: boardId}, board);
}
