var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/cs1'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
  var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
  var password = process.env.MLAB_PASSWORD_WEBDEV;
  connectionString = 'mongodb://' + username + ':' + password;
  connectionString += '@ds247619.mlab.com:47619/heroku_cczp563z'; // use yours
}

var db = mongoose.connect(connectionString, {
  // useMongoClient: true
});

module.exports = db;
