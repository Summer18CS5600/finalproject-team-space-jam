
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app){
  var boardModel = require("../../model/board/board.model.server");

  console.log("here at least");
  app.get("/api/game/:boardId",findGame);
  app.post("/api/game/:boardId", createBoard);

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
    // boardModel.initializeBoard(board).then(function (board) {
    //   console.log("hello")
    //   res.json(board);
    // });

    // before mongo:
    // board.numbers = [9, 3, 2, 5];

  }







};
