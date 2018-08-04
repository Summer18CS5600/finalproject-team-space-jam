
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app){
  var cacheSetModel = require("../../model/cacheset/cacheset.model.server");

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
      // Find out if there's been a cacheHit
      var cacheLine = tiles[0]['cacheLine'];
      var didWeMiss = true;
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
          cacheSet[cacheSet.length] = {lineId: tiles[0]['cacheLine'], tiles: tiles, age: cacheSet['totalOccurrences']};
        } else{
          // there's no more room in the cache, let's check for the LRU of the group, later we can make a flag for the
          if (cachePolicyIsLRU) {
            // find the oldest one.
            var oldestLine = -1;
            var currentAge = 100000000000000000000;
            for (var t = 0; t <cacheSet.length; t++) {
              if (cacheSet[t]['age'] < currentAge) {
                currentAge = cacheSet[t]['age'];
                oldestLine = cacheSet[t]['lineId'];
              }
            }
            // now update the cacheSet with the oldestLine


            // send boardService back the oldestLine for eviction
          }


        }


        // If there was no room, let's say it's a conflict miss. We are not coding for the capacity miss since it'll default
        // into the open slot.

      }

      /*




      LOGIC HERE
       */

      // Third, push the updates to the model
      cacheSetModel.updateCacheSet(boardId, cacheSet)
      // now call the boardService and say what I evicted.
      // boardService.______

    });
  }



};
