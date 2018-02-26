var express = require('express');
var router = express.Router();
var md5 = require("md5");
var UserModel = require("../model/UserModel");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '登录页面' });
});

module.exports = router;
