var express = require('express');
var app = express();
var index = require('./routes/index');
var bodyParser = require('body-parser');
var connection = require('./db/connection');

app.use(bodyParser.json());
app.use('/', index);
app.use(express.static('server/public'));


//connection.initializeDB();




var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listening on port',port);
});
