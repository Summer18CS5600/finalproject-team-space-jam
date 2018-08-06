module.exports = function(app){
  var boardModel = require("../../model/board/board.model.server");
  var cacheSetModel = require("../../model/cacheset/cacheset.model.server");

  console.log("Server started...");

  app.post("/api/cache/create/:boardId", createCacheSet);
  app.get("/api/game/:boardId",findGame);
  app.post("/api/game/:boardId", createBoard);
  app.post("/api/game/:boardId/accessMemory", accessMemory);
  function findGame(req, res) {
   // console.log("looking for game in server side");
    boardModel.findBoard(req.params['boardId']).then(function (board) {
      res.json(board);
    });
  }

  /* Look to see if the board is already in the database, else, create it */
  function createBoard(req, res) {
   console.log("SERVER: creating board...");
    var nums = req.body.numbers;
    var bID = req.params['boardId'];
    const board = {
      boardId: bID,
      numbers: nums
    };

    boardModel.findBoard(bID)
      .then(function (board1) {
        if(board1 != null) {
          res.json(board1);
        } else {
          boardModel.createBoard(board)
            .then(function (board2) {
              res.json(board2);
            });
        }
      });
  }

  /**
   *   Updates the database by changing every number(object) to not-hidden and (not-yet: locked).
   *   (and everything in the cacheline to not-hidden).
   */
  function accessMemory(req, res) {
    let v = req.body.value; // the value to be updated.
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
    // Reminder on what tiles reprsents:
    // tiles: [
    // {hidden: bool, value: int, position: int, cacheLine: int},
    // {hidden: bool, value: int, position: int, cacheLine: int},
    // {hidden: bool, value: int, position: int, cacheLine: int},
    // {hidden: bool, value: int, position: int, cacheLine: int},
    // ]
    var oldestLine = -1;
    var cachePolicyIsLRU = false; // later implement a way to have a different cache Policy that can tweak this, we'll
    // then just make this a global variable. Maybe best to pass the evict policy type from the board Service.

    // STEP 1:
    // Grab the Current CacheSet from the Model
    cacheSetModel.findCacheSet(boardId).then(function(cacheSet) {
      // STEP 2: Cache Policy Logic

      // update the current age:
      cacheSet['totalOccurrences'] = cacheSet['totalOccurrences'] + 1;
      var policy = cacheSet['policy'];
      console.log(cacheSet['policy']);
      // determines the current cacheLine to be evaluated against the current cache.
      var cacheLine = tiles[0]['cacheLine'];
      // bool to track if we hit or miss.
      var didWeMiss = true;
      // Find out if there's been a cacheHit
      for (let a = 0; a < cacheSet['setOfCacheLines'].length; a++) {
        // console.log("Comparing: " + cacheLine + "with " + cacheSet['setOfCacheLines'][a]['lineId']);
        if (cacheSet['setOfCacheLines'][a]['lineId'] == cacheLine) {
          // the cacheHasBeenHit
          cacheSet['setOfCacheLines'][a]['age'] = cacheSet['totalOccurrences'];
          cacheSet['cacheHits'] = cacheSet['cacheHits'] + 1;
          cacheSet['cacheHistory'].push('Cache was hit by the cache line #' + cacheLine + '!');
          didWeMiss = false; // set to false so we no longer treat this as a miss
        }
      }
      if (didWeMiss) {
        cacheSet['cacheMisses'] = cacheSet['cacheMisses'] + 1;
        // First Check is there open room in the cache. If so, it's a cold miss.
        var firstEmptyPosition = cacheSet['setOfCacheLines'].length;
        if (firstEmptyPosition < 4) {
          cacheSet['setOfCacheLines'].push({lineId: cacheLine, tiles: tiles, age: cacheSet['totalOccurrences']});
          cacheSet['cacheHistory'].push('Cache Line ' + cacheLine + ' caused a cold miss!')
        } else{
          // there's no more room in the cache, let's check for the LRU of the group, later we can make a flag for the
          if (policy == 'LRU') {
            var currentAge = 100000000000000000000;
            var tracker = -1;
            // find the oldest line (the one to replace).
            for (var t = 0; t <cacheSet['setOfCacheLines'].length; t++) {
              if (cacheSet['setOfCacheLines'][t]['age'] < currentAge) {
                currentAge = cacheSet['setOfCacheLines'][t]['age'];
                oldestLine = cacheSet['setOfCacheLines'][t]['lineId'];
                tracker = t;
              }
            }
            // now update the cacheSet by replacing the oldestLine
            cacheSet['cacheHistory'].push('CONFLICT MISS: The Cache Line #' + cacheSet['setOfCacheLines'][tracker]['lineId'] + ' was replaced by Cache Line #' + cacheLine);
            cacheSet['setOfCacheLines'][tracker] = {lineId: cacheLine, tiles: tiles, age: cacheSet['totalOccurrences']};
            // send boardService back the oldestLine for eviction
          } else {
            // Policy equals random
            var index = Math.floor(Math.random() * 4);     // returns a random integer from 0 to 9
            console.log('Index to replace is: ' + index);
            oldestLine = cacheSet['setOfCacheLines'][index]['lineId'];// has to equal the cacheLine that's getting evicted.
            cacheSet['cacheHistory'].push('CONFLICT MISS: The Cache Line #' + cacheSet['setOfCacheLines'][index]['lineId'] + ' was replaced by Cache Line #' + cacheLine);
            cacheSet['setOfCacheLines'][index] = {lineId: cacheLine, tiles: tiles, age: cacheSet['totalOccurrences']};
          }
        }
      }
      // Third, push the updates to the model
      cacheSetModel.updateCacheSet(boardId, cacheSet).then(function (updatedCacheSet) {
        cacheSetModel.findCacheSet(boardId).then(function (updatedCacheSet) {
        });
        if (oldestLine > -1) {
          hideCacheLine(boardId, oldestLine);
        }
      });
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
          console.log(boardToBeUpdated.numbers[i]);
        }
      }
      // Update the board in the database and send back to client.
      boardModel.updateBoard(boardId, boardToBeUpdated).then(function (updatedBoard) {
      });
    })
  }


  function createCacheSet(req, res) {
    console.log("SERVER: creating cacheSet...");
    cacheSetModel.findCacheSet(req.params['boardId']).then(function (cacheSet) {
      if (cacheSet != null) {
        res.json(cacheSet);
      } else {
        const cacheSet = {
          boardId: req.params['boardId'],
          setOfCacheLines: [],
          totalOccurrences: 0,
          cacheHits: 0,
          cacheMisses: 0,
          policy: 'LRU'
        };
        cacheSetModel.createCacheSet(cacheSet).then(function (cacheSet) {
          console.log('SERVER: cacheSet created, sending back to client...');
          console.log('in server, should get exact same cacheset that was sent to the model above..');
          console.log(cacheSet);
          res.json(cacheSet);
        })
      }
    })
  }



};
