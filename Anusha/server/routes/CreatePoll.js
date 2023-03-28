/* var express = require('express');
var router = express.Router();

var pollData = [];

router.get('/CreatePoll', function(req, res, next) {
   res.status(200).json();
  });

router.post ('/CreatePoll', function(req, res, next) {
   pollData = req.body;
   console.log(pollData)
   });
  

module.exports = router; */

var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "root",
   database: "meetup"
 });

router.post('/CreatePoll', function(req, res, next) {
   const pollData = req.body;
   const title = pollData[0].title;
   const description = pollData[0].desc;
   const user_id = 1;
   const sql = "INSERT INTO event (organizer, title, description) VALUES (?, ?, ?)";
   const values = [user_id, title, description];
 
   con.query(sql, values, function(err, result) {
     if (err) throw err;
     console.log("Event created with ID:", result.insertId);
     res.send({ event_id: result.insertId });
   });
 });

module.exports = router;