
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app){
  var boardModel = require("../../model/board/board.model.server");

  console.log("here at least");
  app.get("/api/game/:boardId",findGame);
  app.post("/api/game/:boardId", createBoard);
  app.post("/api/game/:boardId/accessMemory", accessMemory);

  function findGame(req, res) {
    console.log("looking for game in server side");
    boardModel.findBoard(req.params['boardId']).then(function (board) {
      console.log(board);
      res.json(board);
    });
  }

  function createBoard(req, res) {
    console.log("in server...");
    var nums = req.body.numbers;
    console.log(nums);
    const board = {
      boardId: req.params['boardId'],
      numbers: nums
    };

    console.log(board);
    boardModel.createBoard(board).then(function (board) {
      console.log('hello punk');
      res.json(board);
    })
  }

  function accessMemory(req, res) {
    var value = req.body.value;
    console.log("in server accessing memory: value is - " + value);
    boardModel.accessMemory(req.params['boardId'], req.body.value).then(function (board) {
      console.log("getting back from db");
      res.json(board);
    })
  }









};
