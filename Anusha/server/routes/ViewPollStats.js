var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

let event_id = 0;

router.get("/setStatID/:id", (req, res) => {
   event_id = parseInt(req.params.id);
   res.json(event_id);
})

router.get("/getStatID", (req, res) => {
   res.json(event_id);
})

router.get("/ViewPollStats/:id", (req, res) => {
    console.log(req.params);
    event_id = parseInt(req.params.id);
    console.log(event_id);
    res.redirect("http://localhost:3001/#/Viewpoll");
})

module.exports = router;