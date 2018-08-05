
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app){
  console.log("Cacheset Server started...");

  var cacheSetModel = require("../../model/cacheset/cacheset.model.server");

  app.get("/api/cache/:boardId",findCache);

  function findCache(req, res) {
    console.log("looking for game in server side");
    cacheSetModel.findCacheSet(req.params['boardId']).then(function (cacheSet) {
      res.json(cacheSet);
    });
  }





};
