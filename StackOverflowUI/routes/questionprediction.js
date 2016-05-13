/**
 * http://usejsdoc.org/
 */

var mysql = require("mysql");
var ejs = require("ejs");

exports.queprediction = function(req,res){
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
			var top10 = 'QuePrediction.ejs';
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