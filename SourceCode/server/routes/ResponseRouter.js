var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "database-1.cgvjmyk27ifv.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "12345678",
  database: "meetup"
});

router.get("/Viewpoll/:id", (req, res) => {
  console.log(req.params);
  const eventID = parseInt(req.params.id);
  console.log(eventID);
  res.redirect("http://localhost:3001/#/Viewpoll");
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

  con.query('SELECT user_id,options.option_id,start_time,end_time,location,likelihood FROM options JOIN response ON options.poll_id=response.poll_id AND options.option_id=response.option_id WHERE options.poll_id=' + mysql.escape(id), (error, results, fields)=> {
    if(error){
      res.status(500).json({error:error.message});
    } else{
      option_ids = [];
      time_location = [];
      const likelihood = ['0.00','0.25','0.50','0.75','1.00'];
      const response_count = [];
      let i = 0;
      //const unique = Array.from(new Set(results.map((item) => item.option_id)));
      const key='option_id';
      const unique = [...new Map(results.map(item => [item[key], item])).values()];
      unique_sorted = sortByKey(unique,key);
      //console.log(unique_sorted);
      
      //get valid option ids
      while (i < unique_sorted.length) {
          option_ids[i]=unique_sorted[i].option_id;
          console.log(option_ids[i]);
          start_time = unique_sorted[i].start_time.toString().substring(4, 21);
          end_time = unique_sorted[i].end_time.toString().substring(4, 21);
          location = unique_sorted[i].location;
          time_location[i]=[start_time,end_time,location];
          i++;
      }

      let prob = 0;
      const weighted_sums = Array(option_ids.length).fill(parseFloat(0));
      const response_count_opt = Array(option_ids.length).fill(0);
      for (i=0;i<5;i++){
        response_count[i]=new Array(option_ids.length).fill(0);
      }
      for (i=0; i < results.length; i++) {
          response_count[likelihood.indexOf(results[i].likelihood)][option_ids.indexOf(results[i].option_id)]++;
          response_count_opt[option_ids.indexOf(results[i].option_id)] += 1;
          weighted_sums[option_ids.indexOf(results[i].option_id)] += parseFloat(results[i].likelihood);
      }
      for (i=0; i < weighted_sums.length; i++){
        weighted_sums[i] = Math.ceil(weighted_sums[i] / response_count_opt[i] * 100);
      }

      let arrayCopy = [...weighted_sums];
      const recommendations = sortWithIndeces(arrayCopy);

      
      myres = {'time_location':time_location,'response_count':response_count, 'likelihoods':weighted_sums,'recommendations':recommendations,'optionIDs':option_ids};
      //console.log(myres);
      res.json(myres);
    }
  });


});

router.post('/finalize', function(req, res, next) {
  const optionID = req.body.optionID;
  const eventID = req.body.eventID;
  op_vals = [eventID,optionID];
  console.log(op_vals);

  con.query('SELECT start_time, end_time, location FROM options WHERE poll_id=? AND option_id=?', op_vals, function(o_err,o_result){
    
    values = [o_result[0].start_time,o_result[0].end_time, o_result[0].location, eventID];
    console.log(values);

    const sql = "UPDATE event SET start_time = ?, end_time = ?, location = ? WHERE event_id = ?";
    
    con.query(sql, values, function(err, result) {
      if (err) throw err;
      console.log("Event Updated And Finalized");
    });
  });
  
});

function sortWithIndeces(toSort) {
  for (var i = 0; i < toSort.length; i++) {
    toSort[i] = [toSort[i], i];
  }
  toSort.sort(function(left, right) {
    return left[0] > right[0] ? -1 : 1;
  });
  toSort.sortIndices = [];
  for (var j = 0; j < toSort.length; j++) {
    toSort.sortIndices.push(toSort[j][1]);
    toSort[j] = toSort[j][0];
  }
  return toSort.sortIndices;
}

function sortByKey(array, key) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

module.exports = router;
