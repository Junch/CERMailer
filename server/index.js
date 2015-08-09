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

var templateNames = [
    {  id: 1,
       name: "General",
       author: "Jun Chen",
       note: "A template for all products",
       email: "jun.chen@autodesk.com",
       content: "# Title\n## Section\nIt is a **general** template"
    },
    {  id: 2,
       name: "AutoCAD",
       author: "Tom Cat",
       note: "A template for AutoCAD",
       email: "tom.cat@autodesk.com",
       content: "# Title\n## Section\nIt is a **AutoCAD** template"
    },
    {  id: 3,
       name: "Bug 64",
       author: "Jun Chen",
       note: "A template specified for the TFS bug 64",
       email: "jun.chen@autodesk.com",
       content: "# Title\n## Section\nIt is a template for **Bug 64**"
    }];

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

    // TODO: the following three lines will be removed once the windows authentication is done
    // They are just for test in windows domain
    var domain_account = req.headers["x-iisnode-auth_user"];
    if (domain_account) {
        result[0].bnotes = domain_account;
    }
    
    res.json(result);
});
app.get("/templateNames", function(req, res){
    console.log('Retrieving email template names:');
    
    res.json(templateNames);
});
app.get("/templateNames/:id", function(req, res){
    var id = req.params.id;
    console.log('Retrieving template: ' + id);
  
    templateNames.forEach(function(item){
      if (item.id == id) {
        return res.json(item);
      }
    });
});
app.post("/templateNames", function(req, res){
    var tmpl = req.body;
    console.log('Adding template: ' + JSON.stringify(tmpl));
  
    tmpl.author = 'todo';
    tmpl.email = 'todo';
    tmpl.id = templateNames.length + 1;
    
    templateNames.push(tmpl);
    res.send(tmpl);
});
app.post("/templateNames/:id", function(req, res){
    var id = req.params.id;  
    var tmpl = req.body;
    console.log('Updating template: ' + JSON.stringify(tmpl));
  
    for (var i=0; i<templateNames.length; ++i){
      if (templateNames[i].id == id){
        templateNames[i] = tmpl;
      }  
    }

    res.send(tmpl);
});
app.delete("/templateNames/:id", function(req, res){
    var id = req.params.id;
    console.log('Deleting template: ' + id);
  
    for (var i=0; i<templateNames.length; ++i){
      if (templateNames[i].id == id){
        templateNames.splice(i, 1);
        return res.send(id);
      }  
    }
  
    res.send({'error': id + ' is not found'});
});

var port = process.env.PORT || 8000;
var server = app.listen(port, function() {
    port = server.address().port;
    console.log('Listening on port %s', port);
});
