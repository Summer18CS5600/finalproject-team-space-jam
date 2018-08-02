
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app, models){
  var boardModel = models.boardModel;


  app.get("/api/game/:gameId",findGame);
  app.post("/api/game/", createBoard);

  function findGame(req, res) {
    var numbers = [3, 2, 6, 9];
    res.json(numbers);
  }

  function createBoard(req, res) {
    console.log("in server...");
    var board = req.body;
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
