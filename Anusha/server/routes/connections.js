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

router.post('/getconnections',function(req, res, next) {
  const email=req.body.email;
  console.log(email)
    const sql = `select * from connection where user_id1 = ?`;
    con.query(sql,[email] ,(error, results, fields) => {
      if (error) {
        res.status(500).json({ error: error.message }); 
      } else {
        let res2 = [];
        for(let i=0;i<results.length;i++){
          if(results[i].user_id1==email){
            res2.push(results[i].user_id2)
            
          }else{
            res2.push(results[i].user_id1)
          
          }
        }
        console.log(res2);
        res.status(200).json(res2);
        
      }});
    })

    router.post('/getUser',function(req, res, next) {
      const email=req.body.email;
      console.log(email)
        const sql = `select * from user where email like '%${email}%'`;
        con.query(sql ,(error, results, fields) => {
          if (error) {
            res.status(500).json({ error: error.message }); 
          } else {
            
            console.log(results);
            res.status(200).json(results);
            
          }});
        })
        router.post('/connect', function(req, res, next) {

          const sql = 'INSERT INTO connection (user_id1,user_id2) VALUES (?,?)'
          const values = [req.body.email,req.body.email2];
          console.log(values)
          con.query(sql,values, (error, results, fields) => {
             if (error) {
               res.status(500).json({ error: error.message });
             } else {
               myres = results;
               console.log("Connection Created Successfully");
             }});
        });



        router.post('/disconnect', function(req, res, next) {
          const sql = 'delete from connection where (user_id1,user_id2) = (?,?)  '
          const values = [req.body.email,req.body.email2];
          console.log(values)
          con.query(sql,values, (error, results, fields) => {
             if (error) {
               res.status(500).json({ error: error.message });
             } else {
               myres = results;
               console.log("disConnection Successfully");
             }});
        });

module.exports = router;