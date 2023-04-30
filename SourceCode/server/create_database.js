var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "database-1.cgvjmyk27ifv.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "12345678"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE meetup", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

});