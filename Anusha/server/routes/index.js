var express = require('express');
//const app = express();
var router = express.Router();

router.post ('/CreatePoll', function(req, res, next) {
  pollData = req.body;
  console.log(pollData)
  });

/* GET home page. */
router.get('/pollData', function (req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json(pollData)
});


module.exports = router;
