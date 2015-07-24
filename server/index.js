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

var reports = [
    {id:1, bid:1, sent:false, defect:47988, email: 'karanth@mahindraaerospace.com', comments: 'abcd', bnotes: '1234', select: false },
    {id:2, bid:1, sent:false, defect:47988, email: 'studio.rosnati@libero.it', comments: 'efgh', bnotes: '1234', select: false },
    {id:3, bid:1, sent:false, defect:47988, email: 'sono@mikami.co.jp', comments: 'ijkl', bnotes: '1234', select: false },
    {id:4, bid:2, sent:false, defect:47989, email: 'a@space.com', comments: 'abcd', bnotes: '1234', select: false },
    {id:5, bid:2, sent:false, defect:47989, email: 's@libero.it', comments: 'efgh', bnotes: '1234', select: false },
    {id:6, bid:3, sent:false, defect:47989, email: 's@mikami.co', comments: 'ijkl', bnotes: '1234', select: false }];

var templates = [
    {id: 1, name: 'General'},
    {id: 2, name: 'AutoCAD'},
    {id: 3, name: 'Inventor'},
    {id: 4, name: 'Bug 4'}];

app.use(express.static(__dirname + "/../app"));
app.get("/bucket/:id", function(req, res){
    var idStr = req.params.id;
    console.log('Retrieving bucket: ' + idStr);
      
    var result = reports.filter(function(item){
        return item.bid == parseInt(idStr);
    });
    
    res.json(result);
});
app.get("/report/:id", function(req, res){
    var idStr = req.params.id;
    console.log('Retrieving report: ' + idStr);
      
    var result = reports.filter(function(item){
        return item.id == parseInt(idStr);
    });
    
    res.json(result);
});
app.get("/templates", function(req, res){
    console.log('Retrieving templates:');
    
    res.json(templates);
});

var port = process.env.PORT || 8000;
var server = app.listen(port, function() {
    port = server.address().port;
    console.log('Listening on port %s', port);
});
