var express = require('express');
//const app = express();
var router = express.Router();
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
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

  con.query('SELECT * FROM options WHERE poll_id = ' + mysql.escape(id), (error, results, fields)=> {
    if(error){
      res.status(500).json({error:error.message});
    } else{
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

router.post('/user', function(req, res, next) {
  const { email } = req.body;
  var myres;
  const sql = 'INSERT INTO user(email) SELECT ? WHERE NOT EXISTS (SELECT email from user WHERE email = ?)'
  const values = [email,email];
  con.query(sql,values, (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      myres = results;
      console.log(results);
      //res.json(results);
    }
  });
});

router.post('/Events', function(req, res, next) {
  con.query('SELECT * FROM event', (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;