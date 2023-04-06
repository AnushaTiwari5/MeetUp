var express = require('express');
//const app = express();
var router = express.Router();
var mysql = require('mysql2');

/* router.post ('/CreatePoll', function(req, res, next) {
  pollData = req.body;
  console.log(pollData)
  }); */


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "meetup"
});

router.post('/CreatePoll', function(req, res, next) {
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
    res.send({ event_id });
  });
});


/* GET home page. */
router.get('/PollData', function (req, res, next) {
  con.query('SELECT * FROM options WHERE poll_id = (SELECT MAX(poll_id) from options)', (error, results, fields)=> {
    if(error){
      res.status(500).json({error:error.message});
    } else{
      res.json(results);
    }

  })
});

router.get('/PollTitle', (req, res) => {
  con.query('SELECT * FROM event WHERE event_id = (SELECT MAX(event_id) from event)', (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });

});


module.exports = router;