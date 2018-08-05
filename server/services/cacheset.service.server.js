
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app){
  console.log("Cacheset Server started...");

  var cacheSetModel = require("../../model/cacheset/cacheset.model.server");

  app.get("/api/cache/:boardId",findCache);
  app.post("/api/cache/policy/:boardId", updatePolicy);

  function findCache(req, res) {
    console.log("looking for game in server side");
    cacheSetModel.findCacheSet(req.params['boardId']).then(function (cacheSet) {
      res.json(cacheSet);
    });
  }

  function updatePolicy(req, res) {
    console.log("updating policy");
    cacheSetModel.findCacheSet(req.params['boardId']).then(function (cacheSet) {
      cacheSet['policy'] = req.body.policy;
      console.log(req.body.policy);
      cacheSetModel.updateCacheSet(req.params['boardId'], cacheSet).then(function (cacheSet) {
        res.json(cacheSet);
      })
    })
  }





};
