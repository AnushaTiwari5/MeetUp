var express = require('express');
var router = express.Router();

var pollData = [];

router.get('/CreatePoll', function(req, res, next) {
   res.status(200).json();
  });

router.post ('/CreatePoll', function(req, res, next) {
   pollData = req.body;
   console.log(pollData)
   });
  

module.exports = router;