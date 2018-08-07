var mongoose = require('mongoose');
var BoardSchema = require("./board.schema.server");
var BoardModel = mongoose.model("BoardModel", BoardSchema);

//are bound to the functions below. this is essentially defining the api.
BoardModel.createBoard = createBoard;
BoardModel.findBoard = findBoard;
BoardModel.updateBoard = updateBoard;

module.exports = BoardModel;

function createBoard(board) {
  var newBoard = board;
  return BoardModel.create(newBoard);
}

function findBoard(boardId) {
  return BoardModel.findOne({boardId: boardId});
}

function updateBoard(boardId, board) {
  return BoardModel.update({boardId: boardId}, board);
}
