var express = require('express');
//const app = express();
var router = express.Router();

var eventData = [{
  description: "Sprint 1 review meeting",

  "Polls": {
    "0": {
      ID: "1",
      date: "February 20, 2023",
      time: "4:30 pm",
      location: "zoom"
    },

    "1": {
      ID: "2",
      date: "February 20, 2023",
      time: "7:30 pm",
      location: "zoom"
    }
  }

}]


/* GET home page. */
router.get('/', function (req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json(eventData)
});

module.exports = router;
