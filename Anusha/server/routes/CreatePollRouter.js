var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "meetup"
});

router.post('/CreatePoll', function(req, res, next) {
  const email = req.body.email;
  console.log(email);
  const user_sql = "SELECT user_id FROM user WHERE email = ?";
  const user_val = [email];

  con.query(user_sql, user_val, function(e_err,e_result){
    const pollData = req.body.polldata;
    const title = pollData[0].title;
    const description = pollData[0].description;
    const user_id = e_result[0].user_id;
    const sql = "INSERT INTO event (organizer, title, description) VALUES (?, ?, ?)";
    const values = [user_id, title, description];
    
    con.query(sql, values, function(err, result) {
      if (err) throw err;
      console.log("Event created with ID:", result.insertId);
      const event_id = result.insertId;
      const pollOptions = pollData.slice();
      const pollSql = "INSERT INTO options ( poll_id, start_time, end_time, location) VALUES (?, ?, ?, ?)";
      
      pollOptions.forEach((option) => {
        const pollValues = [event_id, option.startTime, option.endTime, option.location];
        con.query(pollSql, pollValues, function(err, result) {
          if (err) throw err;
          console.log("Poll option created with ID:", result.insertId);
        });
      });
      res.json({ event_id });
    });
  });
});

/* router.post('/CreatePoll', function(req, res, next) {
  const pollData = req.body;
  const title = pollData[0].title;
  const description = pollData[0].description;
  const user_id = 1;
  const sql = "INSERT INTO event (organizer, title, description) VALUES (?, ?, ?)";
  const values = [user_id, title, description];

  con.query(sql, values, function(err, result) {
    if (err) throw err;
    console.log("Event created with ID:", result.insertId);
    const event_id = result.insertId;
    const pollOptions = pollData.slice();
    const pollSql = "INSERT INTO options ( poll_id, start_time, end_time, location) VALUES (?, ?, ?, ?)";
    
    pollOptions.forEach((option) => {
      const pollValues = [event_id, option.startTime, option.endTime, option.location];
      con.query(pollSql, pollValues, function(err, result) {
        if (err) throw err;
        console.log("Poll option created with ID:", result.insertId);
      });
    });

    res.json({ event_id });
  });
});
 */

module.exports = router;
