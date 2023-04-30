var express = require('express');
//const app = express();
var router = express.Router();
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "database-01.cgvjmyk27ifv.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "1TeamMDataBase0010",
  database: "meetup"
});


/* GET home page. */
router.get('/PollData/:eventID', function (req, res, next) {
  let id = parseInt(req.params.eventID);

  /* con.query('SELECT * FROM options WHERE poll_id = (SELECT MAX(poll_id) from options)', (error, results, fields)=> {
    if(error){
      res.status(500).json({error:error.message});
    } else{
      res.json(results);
    }
  }) */

  con.query('SELECT * FROM options WHERE poll_id = ' + mysql.escape(id), (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  })
});

router.get('/PollTitle/:eventID', (req, res) => {
  let id = parseInt(req.params.eventID);

  /* con.query('SELECT * FROM event WHERE event_id = (SELECT MAX(event_id) from event)', (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  }); */

  con.query('SELECT * FROM event WHERE event_id = ' + mysql.escape(id), (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });

});

router.post('/user', function (req, res, next) {
  const email = req.body.email;
  const name = req.body.name;
  var myres;
  const sql = 'INSERT INTO user (email,name) SELECT ?,? WHERE NOT EXISTS (SELECT email,name from user WHERE email = ? AND name = ?)';
  console.log(sql);
  const values = [email, name, email, name];
  console.log(email);
  console.log(values);
  con.query(sql, values, (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      myres = results;
      console.log(results);

    }
  });

});

function isValidDate(date) {
  return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
}

router.post('/Events', function (req, res, next) {
  const email = [req.body.email];
  con.query('SELECT * FROM event JOIN user ON organizer=user_id WHERE email=?', email, (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      let i = 0;
      for (i = 0; i < results.length; i++) {
        /* results[i].start_time = results[i].start_time.toString().substring(4, 21);
        results[i].end_time = results[i].end_time.toString().substring(4, 21); */

        if (isValidDate(results[i].start_time))
          results[i].start_time = results[i].start_time.toString().substring(4, 21);
        if (isValidDate(results[i].end_time))
          results[i].end_time = results[i].end_time.toString().substring(4, 21);

      }
      //console.log(results);
      res.json(results);
    }
  });
});

module.exports = router;
