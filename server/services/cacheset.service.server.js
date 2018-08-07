
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app){
  console.log("Cacheset Server started...");

  var cacheSetModel = require("../../model/cacheset/cacheset.model.server");

  app.get("/api/cache/:boardId",findCache);
  app.post("/api/cache/policy/:boardId", updatePolicy);

  function findCache(req, res) {
    cacheSetModel.findCacheSet(req.params['boardId']).then(function (cacheSet) {
      res.json(cacheSet);
    });
  }

  function updatePolicy(req, res) {
    cacheSetModel.findCacheSet(req.params['boardId']).then(function (cacheSet) {
      cacheSet['policy'] = req.body.policy;
      cacheSetModel.updateCacheSet(req.params['boardId'], cacheSet).then(function (cacheSet) {
        res.json(cacheSet);
      })
    })
  }





};
