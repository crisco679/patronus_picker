var express = require('express');
var router = express.Router();
var path = require('path');
var people = require('./peopleRoutes');
var patronus = require('./patronusRoutes');

router.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.use('/people', people);
router.use('/patronus', patronus);


module.exports = router;
