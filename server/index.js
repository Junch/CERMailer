'use strict';

var express = require('express');
var app = express();

if (app.get('env') === 'development') {
	app.locals.pretty = true;
}

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + "/../app"));

var server = app.listen(8000, function() {
    var port = server.address().port;
    console.log('Listening on port %s', port);
});
