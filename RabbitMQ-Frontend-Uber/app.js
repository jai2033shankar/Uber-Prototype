
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var customer = require('./routes/customerClient');
var driver = require('./routes/driverClient');
var http = require('http');
var path = require('path');
var amqp = require('amqp')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.post('/customer_signin', customer.signin);
app.post('/customer_signup', customer.signup);
app.post('/customer_remove_with_email', customer.remove_with_email);
app.post('/customer_remove_with_ssn', customer.remove_with_ssn);
app.post('/customer_selectAll', customer.selectAll);
app.post('/customer_search_with_name', customer.search_with_name);
app.post('/customer_search_with_ssn', customer.search_with_ssn);
app.post('/customer_update', customer.update);
app.post('/customer_approve', customer.approve);

app.post('/driver_signin', driver.signin);
app.post('/driver_signup', driver.signup);
app.post('/driver_remove_with_email', driver.remove_with_email);
app.post('/driver_remove_with_ssn', driver.remove_with_ssn);
app.post('/driver_selectAll', driver.selectAll);
app.post('/driver_search_with_name', driver.search_with_name);
app.post('/driver_search_with_ssn', driver.search_with_ssn);
app.post('/driver_update', driver.update);
app.post('/driver_approve', driver.approve);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
