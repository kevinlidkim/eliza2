// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var session        = require('express-session');

var port = process.env.PORT || 3000; // set our port

var MongoClient = require('mongodb').MongoClient;
var mongo_uri = 'mongodb://localhost:27017/eliza2';
MongoClient.connect(mongo_uri, function(err, db) {
  console.log("Connected to mongo");
  db.close();
})

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// Make our db accessible to our router
// app.use(function(req, res, next){
//     req.db = db;
//     next();
// });

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port); 
console.log('\nServer hosted on port ' + port);       // shoutout to the user
exports = module.exports = app;             // expose app