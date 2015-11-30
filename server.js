var express = require('express');
var ejsLayout = require('express-ejs-layouts');
var serveStatic = require('serve-static');
var http    = require( 'http' );
var path = require('path');
var session = require('express-session');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var engine  = require( 'ejs-locals' );
var multer = require('multer');

var routes = require('./routes/index');

var app = express();
app.set( 'port', process.env.PORT || 8080 );
app.engine( 'ejs', engine );

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ));
app.set( 'view engine', 'ejs' );

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/static/favicon.ico'));
//app.use(logger('dev'));
app.use(cookieParser()); //cookieparser must be before
app.use(session({ resave: false,
                  saveUninitialized: false,
                  secret: '12341234qwert' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ keepExtensions: true,extended: false }));
//app.use(ejsLayout);
app.use('/static', function(req, res, next) {
    setTimeout(next, 200);
});

app.use('/static', serveStatic(__dirname + '/static', {
    lastModified: false
}));

app.use('/', routes);
/*app.get(  '/header', routes.header );
app.get(  '/guest', routes.guest );
app.post( '/registeruser', routes.registeruser );
app.get( '/alreadyregistered', routes.alreadyregistered );
app.get('/login', routes.login );
app.post('/verify', routes.verify );
app.get('/createevent', routes.createevent );
app.post('/saveevent', routes.saveevent );
app.get('/viewevents', routes.viewevents );
app.get('/editevents', routes.editevents );
app.get('/searchevents', routes.searchevents );
app.post('/searcheventsbypincode', routes.searcheventsbypincode );*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});