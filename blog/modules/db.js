//建立数据库连接
var mysql = require('mysql');
var connect = mysql.createConnection({
	host 	 : '115.29.150.218',
	user 	 : 'pro',
	password : '080728',
	database : 'blog',
	port     : '3306',
});

connect.connect(function(err){
	if(err){
		console.log(err);
	}else{
		console.log('连接数据库成功！');
	}
});

exports.connect = connect;