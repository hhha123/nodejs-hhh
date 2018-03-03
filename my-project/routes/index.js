var express = require('express');
var router = express.Router();
var md5 = require("md5");
var UserModel = require("../model/UserModel");
var GoodsModel = require("../model/GoodsModel");
var multiparty = require('multiparty');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '登录页面' });
});

router.get('/index', function(req, res, next) {
  res.render('houtai', { title: '后台php' });
});

router.get('/goods_add', function(req, res, next) {
  res.render('goods_add', {});
});

router.get('/goods_list', function(req, res, next) {
	var pageNo = parseInt(req.query.pageNo || 1);;
	var count = parseInt(req.query.count || 3);
	console.log(pageNo,count);
	var query = GoodsModel.find({}).skip( (pageNo-1)*count ).limit(count).sort({create_date:-1});
	query.exec(function(err,docs){
		if(err){
    		console.log(err);
    	}else{
    		GoodsModel.find(function(err,results){
                res.render("goods_list",{list:docs, sum:results.length, sumgood:results.length, pageNo:pageNo, count:count});
    		})
    	}
	})
	// GoodsModel.find({},function(err,docs){
 //   	  res.render("goods_list",{list:docs});
 //    })
});

router.get('/api/goods_del', function(req, res, next) {
	GoodsModel.findByIdAndRemove({_id : req.query.gid},function(err){
        var result= {
	    	status : 1,
	    	message : "商品删除成功"
	    };
	    if(err){
	    	console.log(err);
	    	result.status = -119;
	    	result.message = "商品删除失败";
	    	res.send(result);
	    }else{
	    	res.send(result);
	    }
   })
});

router.post("/api/add_goods",function(req,res){
	var form = new multiparty.Form({
		uploadDir : "./public/imgs"
	})
	form.parse(req,function(err,body,files){
		var is_best = body.is_best;
		var goods_name = body.goods_name[0];
		var goods_sn = body.goods_sn[0];
		var goods_price = body.goods_price[0];
		var virtual_sales = body.virtual_sales[0];
		var goods_number = body.goods_number[0];
		var goods_img01Name = files.goods_img[0].path;
		var goods_img02Name = files.goods_img[1].path;
		goods_img01Name = goods_img01Name.substr(goods_img01Name.lastIndexOf("\\")+1);
		goods_img02Name = goods_img02Name.substr(goods_img02Name.lastIndexOf("\\")+1);
		console.log(is_best);
        var gm = new GoodsModel();
        gm.goods_name = goods_name;
        gm.goods_sn = goods_sn;
        gm.goods_price = goods_price;
        gm.virtual_sales = virtual_sales;
        gm.goods_number = goods_number;
        gm.is_best = is_best;
        gm.goods_img01Name = goods_img01Name;
        gm.goods_img02Name = goods_img02Name;
        gm.save(function(err){
        	if(!err){
        		res.send("添加商品成功");
        		console.log("添加商品成功");
        	}else{
        		res.send("添加商品失败");
        	}
        })
	})
})

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
