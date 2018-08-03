
// Get the dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cookieParser());
app.use(session({
  secret: 'ablk',
  resave: true,
  saveUninitialized: true
})); //process.env.SESSION_SECRET
//Passport set up after cookie and session
app.use(passport.initialize());
app.use(passport.session());


// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // change to *
  res.header("Access-Control-Allow-Headers", "Origin, x-requested-with, Content-Type, Accept, authorization, client-security-token, Accept-Encoding");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


const port = process.env.PORT || '3100';
app.set('port', port);
const server = http.createServer(app);

require("./server/app")(app);
server.listen( port );

// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/finalproj/index.html'));
});


