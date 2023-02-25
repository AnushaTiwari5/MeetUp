var express = require('express');
var router = express.Router();


router.get('/CreatePoll', function(req, res, next) {
   res.status(200).json();
  });

router.post ('/CreatePoll', function(req, res, next) {
    console.log(req.body)
   });
  

module.exports = router;
