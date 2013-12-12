// Module dependencies.

var http = require('http'); 
var path = require('path');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');

/**
*  Instantiate Express and assign app variable.
-- Note: Call after express is loaded
*/
var app = express();


// Connect to DB
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest2');




// all Express environments
app.set('port', process.env.PORT || 3030);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	  app.use(express.errorHandler());	// ToDo
}

// Add URI's for routes. What are roots Allison?
// The index route is in index.js
app.get('/', routes.index);           
app.get('/users', user.list);         
app.get('/helloworld', routes.helloworld);  // request hello
app.get('/userlist', routes.userlist(db));
app.get('/newuser', routes.newuser);

app.post('/adduser', routes.adduser(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
