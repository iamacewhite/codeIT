var request = require('request');
var async = require('async');
var config = require('../config');
var rsmq = config.rsmq;


var res = [];

function action(actions){
	console.log("checkpoint");
	rsmq.sendMessage({qname:config.q1name, message: actions},function(err, resp){
		console.log(err);
	    if (resp) {
	        console.log("Message sent. ID:", resp);
	    }
	});
}

async.parallel([
	function(callback){
		request({
			uri: "http://cis2016-exchange1.herokuapp.com/api/market_data",
			method: "GET"
		},
		function(error, response, body){
			callback(null, JSON.parse(body));
		});
	},
	function(callback){
		request({
			uri: "http://cis2016-exchange2.herokuapp.com/api/market_data",
			method: "GET"
		},
		function(error, response, body){
			callback(null, JSON.parse(body));
		});
	},
	function(callback){
		request({
			uri: "http://cis2016-exchange3.herokuapp.com/api/market_data",
			method: "GET"
		},
		function(error, response, body){
			callback(null, JSON.parse(body));
		});
	}],
	function(err,result){
		res = result;
		console.log(res);
		//strategy goes here
		var actions = {
			symbol: "0001",
			side: "buy",
			qty: 100,
			order_type: "market",
			exchange: 1
		};
		action(JSON.stringify(actions));
	});
