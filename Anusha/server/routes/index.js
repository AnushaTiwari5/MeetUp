// var express = require('express');
// //const app = express();
// var router = express.Router();

// var eventData = [{
//   description: "Sprint 1 review meeting",

//   "Polls": {
//     "0": {
//       ID: "1",
//       date: "February 20, 2023",
//       time: "4:30 pm",
//       location: "zoom"
//     },

//     "1": {
//       ID: "2",
//       date: "February 20, 2023",
//       time: "7:30 pm",
//       location: "zoom"
//     }
//   }

// }]


// /* GET home page. */
// router.get('/', function (req, res, next) {
//   //res.render('index', { title: 'Express' });
//   res.json(eventData)
// });

// module.exports = router;

var express = require('express');
//const app = express();
var router = express.Router();

var eventData = [{
  0: {
    desc: "",
    startTime : "2023-02-27 11:15", 
    index : 0,
    endTime : "2023-02-27 11:30",
    location : "Zoom",
    title : "Meet"
  },

  1: {
    desc: "",
    startTime : "2023-02-27 11:15", 
    index : 1,
    endTime : "2023-02-27 11:30",
    location : "Person",
    title : "Meet"
  }
}]


/* GET home page. */
router.get('/', function (req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json(eventData)
});

module.exports = router;
