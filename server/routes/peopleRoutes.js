var express = require('express');
var app = express();
var router= express.Router();
var pg = require('pg');
var connection = require('../db/connection');

var connectionString = connection.connectionString;

router.post('/', function(req, res){
  console.log(req.body);
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }else {
      var first_name = req.body.first_name;
      var last_name = req.body.last_name;
      var results = [];

      var query = client.query('INSERT INTO people(first_name,last_name)' + 'VALUES ($1, $2) RETURNING first_name, last_name',
      [first_name, last_name]);

      query.on('error', function(error){
        console.log(error);
        res.sendStatus(500);
      });
      query.on('row',function(rowData){
        results.push(rowData);
      })
      query.on('end',function(){
        res.send(results);
          done();
      });
    }
  });
});
router.get('/', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }else {
      var query = client.query('SELECT * FROM people');
      var results = [];

      query.on('error', function(error){
        console.log(error);

        res.sendStatus(500);
      });
      query.on('row',function(rowData){
        results.push(rowData);
      })
      query.on('end',function(){
        res.send(results);
        done();
      });
    }
  });
});
module.exports = router;
