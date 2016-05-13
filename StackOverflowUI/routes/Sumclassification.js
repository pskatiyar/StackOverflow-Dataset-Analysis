/**
 * http://usejsdoc.org/
 */
var mysql = require("mysql");
var ejs = require("ejs");
exports.sumclassificationfunction = function(req, res){
	res.render('sumclassification');
};


exports.topten = function(req, res){
	
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'apriori',
		port : 3306
	});
	conn.connect();
	
	
	
	var insertquery=conn.query("SELECT tags,count(*) as totalquery FROM apriori.logistic_dataset where tags is not null group by tags order by totalquery desc",function(err,results){
		console.log(insertquery.sql);	
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			var top10 = 'top10.ejs';
			ejs.renderFile('./views/'+top10,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
				
		});
	conn.end();
};


exports.hiechart = function(req,res) {
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'apriori',
		port : 3306
	});
	conn.connect();
	
	
	
	var insertquery=conn.query("SELECT tags,count(*) as totalquery FROM apriori.logistic_dataset where tags is not null group by tags order by totalquery desc",function(err,results){
		console.log(insertquery.sql);	
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			var hi = 'hieChart.ejs';
			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
				
		});
	conn.end();
	
};

exports.questionpredictionhiechart = function(req,res) {
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'apriori',
		port : 3306
	});
	conn.connect();
	
	
	
	var insertquery=conn.query("SELECT tags as tag,(CASE WHEN rankpred >= 0 ANd rankpred <0.1 THEN '0' WHEN rankpred >=0.1 and rankpred <0.3  THEN '0.1-0.3' WHEN rankpred >= 0.3 and rankpred < 0.6 THEN '0.3-0.6' WHEN rankpred >=0.6  and rankpred < 0.9 THEN '0.6-0.9' ELSE '1' END) as rankpred1,count(*) as count  FROM apriori.logistic_dataset WHERE Tags='"+req.param("tag")+"' group BY rankpred1",function(err,results){
		console.log(insertquery.sql);	
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			var hi = 'questionpredictionhiechart.ejs';
			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
				
		});
	conn.end();
	
};

exports.showdata = function(req, res){
	
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'apriori',
		port : 3306
	});
	conn.connect();
	
	
	
	var insertquery=conn.query("select tags,title, TRUNCATE(rankpred,9) as rank from apriori.logistic_dataset where Tags='"+req.param("tag")+"' order by rankpred desc",function(err,results){
		console.log(insertquery.sql);	
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			var top10 = 'showdata.ejs';
			ejs.renderFile('./views/'+top10,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
				
		});
	conn.end();
};

exports.apriorirelation = function(req, res){
	
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'apriori',
		port : 3306
	});
	conn.connect();
	
	
	
	var insertquery=conn.query("select substr(substr(lhs,1,length(lhs)-1),2) as lhs, substr(substr(rhs,1,length(rhs)-1),2) as rhs, round((confidence*100),2) as confidence from apriori.apriori_rules",function(err,results){
		console.log(insertquery.sql);	
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			var top10 = 'apriorirelation.ejs';
			ejs.renderFile('./views/'+top10,{data:results},function(err,result){
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
				
		});
	conn.end();
};

exports.hiechartapriori = function(req,res) {
	console.log("abcasasassa");
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'apriori',
		port : 3306
	});
	conn.connect();
	
	var insertquery=conn.query("select substr(substr(lhs,1,length(lhs)-1),2) as lhs, substr(substr(rhs,1,length(rhs)-1),2) as rhs , round((confidence*100),2) as confidence from apriori.apriori_rules",function(err,results){
		if(err)
		{	
			console.log("error");
			console.error(err.errorno);
			return;
	}
		else{
			var hi = 'highchartapriori.ejs';
			console.log(insertquery.sql+"query access here");	

			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				console.log("abc")
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
				
		});
	conn.end();
	
};

exports.showSVMclassificationTag = function(req,res) {
	console.log("abcasasassa");
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'apriori',
		port : 3306
	});
	conn.connect();
	
	var insertquery=conn.query("SELECT PostMonth,Title,Postval,postcount   FROM apriori.html_cpp order by postcount,postval ",function(err,results){
		if(err)
		{	
			console.log("error");
			console.error(err.errorno);
			return;
	}
		else{
			var hi = 'showSVM.ejs';
			console.log(insertquery.sql+"query access here");	

			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				console.log("abc")
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
				
		});
	conn.end();
	
};

exports.showSVMclassificationTag1 = function(req,res) {
	console.log("abcasasassa");
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'apriori',
		port : 3306
	});
	conn.connect();
	
	var insertquery=conn.query("SELECT PostMonth,Title,Postval,postcount   FROM apriori.svm_cpp order by postcount,postval",function(err,results){
		if(err)
		{	
			console.log("error");
			console.error(err.errorno);
			return;
	}
		else{
			var hi = 'showSVM.ejs';
			console.log(insertquery.sql+"query access here");	

			ejs.renderFile('./views/'+hi,{data:results},function(err,result){
				console.log("abc")
				if(!err)
				{
					console.log("abc");
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
				
		});
	conn.end();
	
};

exports.one = function (req,res) {
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'apriori',
		port : 3306
	});
	conn.connect();
	
	
	
	var insertquery=conn.query("SELECT tags,count(*) as totalquery FROM apriori.logistic_dataset where tags is not null group by tags order by totalquery desc",function(err,results){
		console.log(insertquery.sql);	
		if(err)
		{			
			console.error(err.errorno);
		
			return;
	}
		else{
			var top10 = '1.ejs';
			ejs.renderFile('./views/'+top10,{data:results},function(err,result){
				if(!err)
				{
					
					res.end(result);
				}
			else
				{
				res.end('An error occured');
				console.log(err.errorno);
				}
			});
		}
				
		});
	conn.end();

};