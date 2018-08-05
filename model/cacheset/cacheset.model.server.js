var mongoose = require('mongoose');
var CacheSetSchema = require("./cacheset.schema.server");
var CacheSetModel = mongoose.model("CacheSetModel", CacheSetSchema);

//are bound to the functions below. this is essentially defining the api.
CacheSetModel.createCacheSet = createCacheSet;
CacheSetModel.findCacheSet = findCacheSet;
CacheSetModel.updateCacheSet = updateCacheSet;

module.exports = CacheSetModel;

//call the db specific functions.
function createCacheSet(cacheSet) {
  console.log("MODEL: creating cacheSet: " + cacheSet.boardId);
  console.log("sent to the model from server:");
  console.log(cacheSet);
  var newCacheSet = cacheSet;
  return CacheSetModel.create(newCacheSet);
}

function findCacheSet(cacheSetId) {
  console.log("MODEL: finding cacheSet: " + cacheSetId);
  return CacheSetModel.findOne({boardId: cacheSetId});
}

function updateCacheSet(cacheSetId, cacheSet) {
  console.log("MODEL: updating cacheSet: " + cacheSetId);
  console.log("this is what the cacheset looks like before being updated in the model...");
  console.log(cacheSet);
  return CacheSetModel.update({boardId: cacheSetId}, cacheSet);
}
