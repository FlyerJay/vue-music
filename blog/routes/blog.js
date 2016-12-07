var express = require('express');
var router = express.Router();
var db = require('../modules/db.js');
var url = require('url');
var connect = db.connect;

router.get('/', function(req, res, next) {
	res.render('blog/index', { title: 'Express' });
});

router.get('/getbloglist',function(req,res,next){
	var page = req.query.page - 0;
	var pageSize = req.query.pageSize - 0;
	var start = (page - 1) * (pageSize);
	var end = pageSize;
	var querystring = 'select b.title,b.blog_id,b.summary,bc.category,b.publish_date,b.hit,b.image_url '+
					  'from blogs b,blog_class bc '+
					  'where b.category_id = bc.category_id order by b.publish_date limit ?,?';
	var data = {};
	data.bloglist = [];
	data.count = '';
	data.code = '';
	var operateCounts = 0;
	connect.query(querystring,[start,end],function(err,rows,fileds){
		if(err){
			console.log(err);
			next(err);
		}else{
			var bloglist =[];
			for(var i=0;i<rows.length;i++){
				var myblog = {};
				myblog.title = rows[i].title;
				myblog.blogId = rows[i].blog_id;
				myblog.blogUrl = "../blog?blogId="+rows[i].blog_id;
				myblog.summary = rows[i].summary;
				myblog.time = rows[i].publish_date;
				myblog.hit = rows[i].hit;
				myblog.img = rows[i].image_url;
				myblog.time = (myblog.time+"").substring(0,4)+"-"+(myblog.time+"").substring(4,6)+"-"+(myblog.time+"").substring(6,8);
				bloglist.push(myblog);
			}
			data.bloglist = bloglist;
			operateCounts++;
			if(operateCounts >= 2){
				res.json(data);
			}
		}
	}),
	connect.query('select count(1) as count from blogs',function(err,row,fields){
		if(err){
			console.log(err);
			next(err);
		}else{
			data.count = row[0].count;
			operateCounts++;
			if(operateCounts >= 2){
				res.json(data);
			}
		}
	})
})

router.get('/viewdetail',function(req,res,next){
	var id = req.query.id;
	var queryString = 'select * from blogs where blog_id = ?';
	connect.query(queryString,[id],function(err,rows,fileds){
		if(err){
			console.log(err);
			next(err);
		}else{
			res.json(rows[0]);
		}
	})
})
module.exports = router;