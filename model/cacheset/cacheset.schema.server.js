var mongoose = require('mongoose');

/**
 *
 * Represents a CacheSet. This is essentialy a four way associative cache with only one set.
 *
 * We currently have a cacheLine implicilty implemented here:
 *
 * Set 0:
 * Cache Line: [{cacheId: n, values: [a, b, c, d], age: x}] // age represents
 * Cache Line: [{cacheId: n, values: [a, b, c, d], age: x}] // age represents
 * Cache Line: [{cacheId: n, values: [a, b, c, d], age: x}] // age represents
 * Cache Line: [{cacheId: n, values: [a, b, c, d], age: x}] // age represents
 *
 * cacheId: represents the number values a-d share in the attribute, cacheLine (remember, each tile has a value, position, cacheLine, and hidden)
 * age: has to get updated each time the cache is interacted with (e.g cache hit, cache miss)
 *
 */
var CacheSetSchema = mongoose.Schema ( {
  boardId: String,
  totalAmountOfInteractions: Number,
  setOfCacheLines: [{}]
}, {collection: "cacheSet" });

module.exports = CacheSetSchema;
