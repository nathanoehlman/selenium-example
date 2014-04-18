
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');
var serveStatic = require('serve-static');

var app = express();

// Configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(favicon(__dirname + '/public/favicon.ico')); - add static-favicon to dependencies, too
//app.use(express.logger('dev')); replaced by morgan
app.use(require('body-parser')());
app.use(require('method-override')());

// Routes
app.get('/', routes.index);
app.get('/authors', routes.authors);
app.get('/books', routes.books);

app.use(serveStatic(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(require('errorhandler')());
}

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port %d in %s mode...", app.get('port'), app.get('env'));
});
