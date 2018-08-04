
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app){
  var cacheSetModel = require("../../model/cacheset/cacheset.model.server");

  console.log("Server started...");
  app.get("/api/cache/:boardId",findCache);
  app.post("/api/cache/:boardId", createCacheSet);
  app.post("/api/cache/:boardId", updateCacheSet);
  ;


  // /**
  //  * Finds the tile in the board that matches this value
  //  * @param value
  //  * returns the cacheLine
  //  */
  // function findTile(value) {
  //
  // }
  //
  // /**
  //  *
  //  * @param cacheLine
  //  */
  // function retrieveValuesForCacheLine(cacheLine) {
  //
  // }


//  {cacheId: cacheLine, data}

  // I then have to send a resposne back....
  // when I evict something call, boardService.hideCacheLine(cacheLineNum) when I evict something.
  // else don't do anything.


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

    // Fist grab the current cacheSet from the Model
    cacheSetModel.findCacheSet(boardId).then(function(cacheSet) {
      // Second, do the update logic on the cacheSet (cacheHit, cacheMiss, if cacheMiss, evict or cold miss?)
      cacheSet = // something here
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
