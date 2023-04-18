var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "root",
   database: "meetup"
 });


router.post('/Response', function(req, res, next) {
   const email = req.body.email;
   console.log(email);
   const user_sql = "SELECT user_id FROM user WHERE email = ?";
   const user_val = [email];
   console.log(req.body.optionID);
   console.log(req.body.val);
 
   con.query(user_sql, user_val, function(e_err,e_result){
     const user_id = e_result[0].user_id;
     values = [user_id,req.body.optionID, req.body.val,req.body.eventID];
     const sql = "INSERT INTO response (user_id, option_id, likelihood, poll_id) VALUES (?, ?, ?,?)";
     
     con.query(sql, values, function(err, result) {
       if (err) throw err;
       console.log("Response inserted with ID:", result.insertId);
     });
   });
 });

 router.get('/allresponses/:eventID', function (req, res, next) {
  let id = parseInt(req.params.eventID);

  con.query('SELECT user_id,options.poll_id,options.option_id,likelihood FROM options JOIN response ON options.poll_id=response.poll_id AND options.option_id=response.option_id WHERE options.poll_id=' + mysql.escape(id), (error, results, fields)=> {
    if(error){
      res.status(500).json({error:error.message});
    } else{
      res.json(results);
    }
  })
});

module.exports = router;
