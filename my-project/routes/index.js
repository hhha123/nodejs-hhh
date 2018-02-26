var express = require('express');
var router = express.Router();
var md5 = require("md5");
var UserModel = require("../model/UserModel");
var multiparty = require('multiparty');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '登录页面' });
});

router.get('/index', function(req, res, next) {
  res.render('houtai', { title: '后台php' });
});

router.post("/api/login",function(req,res){
	var username = req.body.username;;
	var pwd = req.body.pwd;

	var result = {
		status : 1,
		message : "登录成功"
	}
	UserModel.find({username : username , pwd : pwd},function(err,docs){
		if(!err && docs.length > 0){
			console.log("登录成功");
			res.send(result);
		}else{
			console.log("登陆失败，请检查您的用户名或密码");
			result.status = -109;
        	result.message = "登录失败，请检查您的用户名或者密码";
        	res.send(result);
		}
	})
})

module.exports = router;
