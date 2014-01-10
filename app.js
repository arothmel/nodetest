// Module dependencies.
// This creates a bunch of basic JavaScript variables and ties them to certain 
// packages, dependencies, node functionality, and routes.
var express = require('express');
var routes = require('./routes');     // top level route
var user = require('./routes/user');  // ignore for now...
var http = require('http'); 
var path = require('path');

/**
*  Instantiate Express and assign app variable.
-- Note: Call after express is loaded
*/
var app = new express();

// Connect to DB
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');


// all Express environments
app.set('port', process.env.PORT || 3030);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));   // serve static objects from public

// development only
if ('development' == app.get('env')) {
	  app.use(express.errorHandler());	// ToDo
}

   // Add URI's for routes. What are roots Allison?
   // The index route is in index.js
   app.get('/', routes.index);
   app.get('/users', user.list);    // still ignoring for now....
   app.get('/helloworld', routes.helloworld);
   app.get('/userlist', routes.userlist(db));    // where the rubber hits the road!
                                                 // pass the db object to userlist routes
   app.get('/newuser', routes.newuser);  
   // after adding these lines adjust the route to tell it what to serve up....   
   app.post('/adduser', routes.adduser(db))      // POST not GET . Now add route to index.js                                   

// Creates our http server and launches it. Good times! 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
