
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app){
  var cacheSetModel = require("../../model/cacheset/cacheset.model.server");

  app.get("/api/cache/:boardId",findCache);
  app.post("/api/cache/:boardId", createCacheSet);

  function findCache(req, res) {
    console.log("looking for game in server side");
    cacheSetModel.findCacheSet(req.params['boardId']).then(function (cacheSet) {
      res.json(cacheSet);
    });
  }

  function createCacheSet(req, res) {
    console.log("SERVER: creating cacheSet...");
    const cacheSet = {
      boardId: req.params['boardId'],
      setOfCacheLines: [{}],
      totalOccurrences: 0,
    };
    cacheSetModel.createCacheSet(cacheSet).then(function (cacheSet) {
      console.log('SERVER: cacheSet created, sending back to client...');
      res.json(cacheSet);
    })
  }



};
