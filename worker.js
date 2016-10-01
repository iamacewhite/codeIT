var worker=function(){

	RedisSMQ = require("rsmq");
	rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

	rsmq.receiveMessage({qname:"trade"}, function (err, resp) {
	    if (resp.id) {
	        console.log("Message received.", resp);
	        rsmq.deleteMessage({qname:"trade", id:resp.id}, function (err, resp) {
			    if (resp===1) {
			        console.log("Message deleted.") 
			    }
			    else {
			        console.log("Message not found.")
			    }
			});
			var obj=JSON.parse(resp.message);
			var url="";
			url=url.concat("http://cis2016-exchange",obj.exchange,".herokuapp.com/api/orders");
			var request = require('request');
			var options = {
			  uri: url,
			  method: 'POST',
			  json: {
			  	"team_uid":teamUID,
			  	"symbol":obj.symbol,
			  	"side":obj.side,
			  	"qty":obj.qty,
			  	"order_type":obj.order_type
			  }
			};

			request(options, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    rsmq.sendMessage({qname:"db", message:body}, function (err, resp) {
				    if (resp) {
				        console.log("Message sent. ID:", resp);
				    }
				});
			  }
			});

	    }
	    else {
	        console.log("No messages for me...");
	    }
	});
}