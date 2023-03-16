var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "meetup"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "CREATE TABLE user (user_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), email VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Users Table created");
  });

  var sql = "CREATE TABLE connection (connection_id INT AUTO_INCREMENT PRIMARY KEY, user_id1 INT, user_id2 INT)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Connections Table created");
  });

  var sql = "CREATE TABLE event (event_id INT AUTO_INCREMENT PRIMARY KEY, organizer INT, title VARCHAR(250), description VARCHAR(400), final_time DATETIME, final_location VARCHAR(250))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Events Table created");
  });

  var sql = "CREATE TABLE poll (poll_id INT AUTO_INCREMENT PRIMARY KEY, event_id INT, deadline DATETIME)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Polls Table created");
  });

  var sql = "CREATE TABLE options (option_id INT AUTO_INCREMENT PRIMARY KEY, poll_id INT, start_time DATETIME, end_time DATETIME, location VARCHAR(250))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Options Table created");
  });

  var sql = "CREATE TABLE invites (invite_id INT AUTO_INCREMENT PRIMARY KEY, event_id INT, user_id INT)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Invites Table created");
  });

  var sql = "CREATE TABLE response (response_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, option_id INT, poll_id INT, likelihood DECIMAL(3,2))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Response Table created");
  });

});