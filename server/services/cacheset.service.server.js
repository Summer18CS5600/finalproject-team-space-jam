
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app){
  var cacheSetModel = require("../../model/cacheset/cacheset.model.server");
  var boardService = require("./board.service.server");

  console.log("Server started...");
  app.get("/api/cache/:boardId",findCache);
  app.post("/api/cache/:boardId", createCacheSet);
  app.post("/api/cache/:boardId", updateCacheSet);

  function findCache(req, res) {
    console.log("looking for game in server side");
    cacheSetModel.findCacheSet(req.params['boardId']).then(function (cacheSet) {
      res.json(cacheSet);
    });
  }

  function createCacheSet(req, res) {
    console.log("SERVER: creating cacheSet...");
    var set = req.body.cacheLines;
    const cacheSet = {
      cacheSetId: req.params['cacheSetId'],
      setOfCacheLines: [{}],
      totalOccurrences: 0,
    };
    cacheSetModel.createCacheSet(cacheSet).then(function (cacheSet) {
      console.log('SERVER: cacheSet created, sending back to client...');
      res.json(cacheSet);
    })
  }

  function updateCacheSet(boardId, tiles) {
    // tiles: [{}, {}, {}. {}]
    var oldestLine = -1;
    var cachePolicyIsLRU = true; // later implement a way to have a different cache Policy that can tweak this, we'll
    // then just make this a global variable. Maybe best to pass the evict policy type from the board Service.
    // Fist grab the current cacheSet from the Model
    cacheSetModel.findCacheSet(boardId).then(function(cacheSet) {
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
        this.boardService.hideCacheLine(oldestLine);
      }
    });
  }



};
