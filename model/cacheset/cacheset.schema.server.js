var mongoose = require('mongoose');


/**
 *
 * Represents a CacheSet. This is essentialy a four way associative cache with only one set.
 *
 * We currently have a cacheLine implicilty implemented here:
 *
 * Set 0:
 * Cache Line: [{cacheId: n, values: [a, b, c, d], age: x}] // age represents
 *
 *
 */
var CacheSetSchema = mongoose.Schema ( {
  cacheSetId: String,
  setOfCacheLines: [{}]
}, {collection: "cacheSet" });

module.exports = CacheSetSchema;
