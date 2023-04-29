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
   res.redirect("http://localhost:3001/#/Response");
})

module.exports = router;
