var express = require('express');

var app = express();
app.engine('jade', require('jade').__express);

app.get('/', function(req, res){
  res.render(__dirname + '/views/index.jade');
});

app.listen(3000);