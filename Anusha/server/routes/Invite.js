var express = require('express');
var router = express.Router();


router.get('/Invite', function(req, res, next) {
   res.status(200).json();
  });

router.post ('/Invite', function(req, res, next) {
    console.log(req.body)
   });
  

module.exports = router;
