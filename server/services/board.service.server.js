
/* unlike angular, if w e ask by name, we cant get it */

module.exports = function(app){
  var boardModel = require("../../model/board/board.model.server");

  console.log("Server started...");
  app.get("/api/game/:boardId",findGame);
  app.post("/api/game/:boardId", createBoard);
  app.post("/api/game/:boardId/accessMemory", accessMemory);

  function findGame(req, res) {
    //console.log("looking for game in server side");
    boardModel.findBoard(req.params['boardId']).then(function (board) {
      res.json(board);
    });
  }

  function createBoard(req, res) {
    //console.log("SERVER: creating board...");
    var nums = req.body.numbers;
    const board = {
      boardId: req.params['boardId'],
      numbers: nums
    };
    boardModel.createBoard(board).then(function (board) {
      //console.log('SERVER: board created, sending back to client...');
      res.json(board);
    })
  }

  /**
   *   Updates the database by changing every number(object) to not-hidden and (not-yet: locked).
   *   (and everything in the cacheline to not-hidden).
   */
  function accessMemory(req, res) {
    let v = req.body.value; // the value to be updated.
    // console.log("in server accessing memory: value is - " + v);
    let theCLine; // the cache line of the number accessed.

    // Find the board
    boardModel.findBoard(req.params['boardId']).then(function (boardToBeUpdated) {
      // Find the cacheline for this specific number that was accessed.
      for (let i = 0; i < boardToBeUpdated.numbers.length; i++) {
        if (boardToBeUpdated.numbers[i].value == v) {
          //console.log("SERVER: number found: " + boardToBeUpdated.numbers[i].value + " in cacheLine " + boardToBeUpdated.numbers[i].cacheLine);
          theCLine = boardToBeUpdated.numbers[i].cacheLine;
          break;
        }
      }

      // Update the hidden fields.
      for (let i = 0; i < boardToBeUpdated.numbers.length; i++) {
        if (boardToBeUpdated.numbers[i].cacheLine == theCLine) {
          boardToBeUpdated.numbers[i].hidden = false;
        }
      }

      // Update the board in the database and send back to client.
      boardModel.updateBoard(req.params['boardId'], boardToBeUpdated).then(function (updatedBoard) {
        res.json(updatedBoard);
      });

    })
  }









};
