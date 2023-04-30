var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

let event_id = 0;

router.get("/setInvite/:id", (req, res) => {
   event_id = parseInt(req.params.id);
   res.json(event_id);
})

router.get("/getInvite", (req, res) => {
   res.json(event_id);
})

router.get("/Response/:id", (req, res) => {
   event_id = parseInt(req.params.id);
   //res.redirect("http://localhost:3001/#/Response");
   res.redirect("http://ec2-54-174-186-17.compute-1.amazonaws.com:3000/#/Response");
})

module.exports = router;
