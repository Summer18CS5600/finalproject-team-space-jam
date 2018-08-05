
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app){
  var boardModel = require("../../model/board/board.model.server");
  var cacheSetModel = require("../../model/cacheset/cacheset.model.server");

  console.log("Server started...");
  app.get("/api/game/:boardId",findGame);
  app.post("/api/game/:boardId", createBoard);
  app.post("/api/game/:boardId/accessMemory", accessMemory);
  app.post("/api/cache/:boardId", updateCacheSet);

  function findGame(req, res) {
   // console.log("looking for game in server side");
    boardModel.findBoard(req.params['boardId']).then(function (board) {
      res.json(board);
    });
  }

  /* Look to see if the board is already in the database, else, create it */
  function createBoard(req, res) {
   // console.log("SERVER: creating board...");
    var nums = req.body.numbers;
    var bID = req.params['boardId'];
    const board = {
      boardId: bID,
      numbers: nums
    };

    boardModel.findBoard(bID)
      .then(function (board1) {
        if(board1 != null) {
     //     console.log("FOUND A BOARD!");
          res.json(board1);
        } else {
          boardModel.createBoard(board)
            .then(function (board2) {
     //         console.log("DIDN'T FIND A BOARD CREATED ONE INSTEAD");
              res.json(board2);
            });
        }
      });
    // boardModel.createBoard(board).then(function (board) {
    //   console.log('SERVER: board created, sending back to client...');
    //   res.json(board);
    // })
  }

  /**
   *   Updates the database by changing every number(object) to not-hidden and (not-yet: locked).
   *   (and everything in the cacheline to not-hidden).
   */
  function accessMemory(req, res) {
    let v = req.body.value; // the value to be updated.
    // console.log("in server accessing memory: value is - " + v);
    let theCLine; // the cache line of the number accessed.
    let data = [];

    // Find the board
    boardModel.findBoard(req.params['boardId']).then(function (boardToBeUpdated) {
      // Find the cacheline for this specific number that was accessed.
      for (let i = 0; i < boardToBeUpdated.numbers.length; i++) {
        if (boardToBeUpdated.numbers[i].value == v) {
       //   console.log("SERVER: number found: " + boardToBeUpdated.numbers[i].value + " in cacheLine " + boardToBeUpdated.numbers[i].cacheLine);
          theCLine = boardToBeUpdated.numbers[i].cacheLine;
          break;
        }
      }

      // Update the hidden fields.
      for (let i = 0; i < boardToBeUpdated.numbers.length; i++) {
        if (boardToBeUpdated.numbers[i].cacheLine == theCLine) {
          boardToBeUpdated.numbers[i].hidden = false;
          data.push(boardToBeUpdated.numbers[i]);
        }
      }

      // Update the cacheset based on the number that was just clicked (update all numbers with associated cacheline.
      updateCacheSet(req.params['boardId'], data);

      // Update the board in the database and send back to client.
      boardModel.updateBoard(req.params['boardId'], boardToBeUpdated).then(function (updatedBoard) {
        res.json(updatedBoard);
      });

    })
  }


  /**
   * Updates the cacheset based on the eviction/replacement strategy.
   *
   * @param boardId the board Id to associate with the cacheset we're updating.
   * @param tiles Four numbers with the same associated cacheline.
   */
  function updateCacheSet(boardId, tiles) {
    // tiles: [{}, {}, {}. {}]
    var oldestLine = -1;
    var cachePolicyIsLRU = true; // later implement a way to have a different cache Policy that can tweak this, we'll
    // then just make this a global variable. Maybe best to pass the evict policy type from the board Service.
    // Fist grab the current cacheSet from the Model
    cacheSetModel.findCacheSet(boardId).then(function(cacheSet) {
      console.log(cacheSet);
      cacheSet['totalOccurrences'] = cacheSet['totalOccurrences'] + 1;
      // Second, do the update logic on the cacheSet (cacheHit, cacheMiss, if cacheMiss, evict or cold miss?)
      for (var i = 0; i < cacheSet.length; i++) {
        console.log("The lineId is: " + cacheSet[i]['lineId']);
        console.log("The tiles are is: " + cacheSet[i]['tiles']);
        console.log("The age is: " + cacheSet[i]['age']);
      }
      var cacheLine = tiles[0]['cacheLine'];
      var didWeMiss = true;
      // Find out if there's been a cacheHit
      for (var a = 0; i < cacheSet.length; a++) {
        if (cacheSet[a]['lineId'] == cacheLine) {
          // the cacheHasBeenHit
          cacheSet[a]['age'] = cacheSet[totalOccurrences];
          didWeMiss = false;
        }
      }
      if (didWeMiss) {
        // we didn't hit the cache.
        // First Check is there open room in the cache. If so, it's a cold miss.
        if (cacheSet.length < 4) {
          cacheSet[cacheSet.length] = {lineId: cacheLine, tiles: tiles, age: cacheSet['totalOccurrences']};
        } else{
          // there's no more room in the cache, let's check for the LRU of the group, later we can make a flag for the
          if (cachePolicyIsLRU) {
            var currentAge = 100000000000000000000;
            var tracker = -1;
            // find the oldest line (the one to replace).
            for (var t = 0; t <cacheSet.length; t++) {
              if (cacheSet[t]['age'] < currentAge) {
                currentAge = cacheSet[t]['age'];
                oldestLine = cacheSet[t]['lineId'];
                tracker = t;
              }
            }
            // now update the cacheSet by replacing the oldestLine
            cacheSet[tracker] = {lineId: cacheLine, tiles: tiles, age: cacheSet['totalOccurrences']};
            // send boardService back the oldestLine for eviction
          }
        }
      }

      // Third, push the updates to the model
      cacheSetModel.updateCacheSet(boardId, cacheSet);

      if (oldestLine > -1) {
        hideCacheLine(boardId, oldestLine);
      }
    });
  }


  /**
   *    Changes the hidden field to true for all numbers with the given cacheline in the given boardId.
   */

  function hideCacheLine(boardId, cacheLineToHide) {
    boardModel.findBoard(boardId).then(function (boardToBeUpdated) {

      // Update the hidden fields.
      for (let i = 0; i < boardToBeUpdated.numbers.length; i++) {
        if (boardToBeUpdated.numbers[i].cacheLine == cacheLineToHide) {
          boardToBeUpdated.numbers[i].hidden = true;
        }
      }

      // Update the board in the database and send back to client.
      boardModel.updateBoard(boardId, boardToBeUpdated);

    })
  }






};
