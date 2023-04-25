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
  const  email  = req.body.email;
  const name1 = req.body.name
  var myres;
  const sql = 'INSERT INTO user (email) SELECT ? WHERE NOT EXISTS (SELECT email from user WHERE email = ?)'
  const values = [email,email];
  console.log(email)
  console.log(values)
  con.query(sql,values, (error, results, fields) => {
     if (error) {
       res.status(500).json({ error: error.message });
     } else {
       myres = results;
       console.log(results);
       
     }});


  // const sql2 = 'update user set name=? where email=?';
  // con.query(sql2,{name:name1,email:email}, (error, results, fields) => {
  //   if (error) {
  //     res.status(500).json({ error: error.message });
  //   } else {
  //     myres = results;
  //     console.log(results);
  //     res.json(results);
  //   }
  //  });


  
});

router.post('/Events', function(req, res, next) {
  const email = [req.body.email];
  con.query('SELECT * FROM event JOIN user ON organizer=user_id WHERE email=?', email, (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      let i=0;
      for (i=0; i<results.length; i++){
        results[i].start_time = results[i].start_time.toString().substring(4, 21);
        results[i].end_time = results[i].end_time.toString().substring(4, 21);
      }
      //console.log(results);
      res.json(results);
    }
  });
});

module.exports = router;
