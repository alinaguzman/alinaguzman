var express = require('express');
var router = express.Router();
var keys = require('../config/api');
var models = require("../models");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Alina Guzman' });
});


module.exports = router;