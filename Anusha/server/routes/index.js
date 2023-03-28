var express = require('express');
//const app = express();
var router = express.Router();

/* router.post ('/CreatePoll', function(req, res, next) {
  pollData = req.body;
  console.log(pollData)
  }); */

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
      const event_id = result.insertId;
      const pollOptions = pollData.slice(1);
      const pollSql = "INSERT INTO poll_option (event_id, start_time, end_time, location) VALUES (?, ?, ?, ?)";
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
router.get('/pollData', function (req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json(pollData)
});


module.exports = router;
