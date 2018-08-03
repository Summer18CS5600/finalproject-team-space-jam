
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app){
  var boardModel = require("../../model/board/board.model.server");

  console.log("here at least");
  app.get("/api/a",findGame);
  app.get("/api/game/:gameId",findGame);
  app.post("/api/game/", createBoard);

  function findGame(req, res) {
    console.log("in the game");
    var numbers = [3, 4, 6, 9];
    res.json(numbers);
  }

  function createBoard(req, res) {
    console.log("in server...");
    var nums = req.body.numbers;
    console.log(nums);
    const board = {
      boardId: 1,
      numbers: nums
    };

    console.log(board);
    boardModel.createBoard(board).then(function (board) {
      console.log('hello punk');
      res.json(board);
    })
    // boardModel.initializeBoard(board).then(function (board) {
    //   console.log("hello")
    //   res.json(board);
    // });

    // before mongo:
    // board.numbers = [9, 3, 2, 5];

  }







};
