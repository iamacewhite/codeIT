var config=require("./config");
var RedisSMQ = require("rsmq");
var request = require('request');
var worker=function(){
    
	rsmq = new RedisSMQ( {host: config.rmsq.IP, port: config.rmsq.port, ns: config.rmsq.ns} );
	rsmq.receiveMessage({qname:config.rmsq.q1name}, function (err, resp) {
	    if (resp.id) {
	        console.log("Message received.", resp);
            var msg=resp.message;
	        rsmq.deleteMessage({qname:config.rmsq.q1name, id:resp.id}, function (err, resp) {
			    if (resp===1) {
			        console.log("Message deleted.") 
			    }
			    else {
			        console.log("Message not found.")
			    }
			});
			var obj=JSON.parse(msg);
			var url="";
			url=url.concat("http://cis2016-exchange",obj.exchange,".herokuapp.com/api/orders");
			
            var action = {
			  	"team_uid":teamUID,
			  	"symbol":obj.symbol,
			  	"side":obj.side,
			  	"qty":obj.qty,
			  	"order_type":obj.order_type
			  };
			if(obj.order_type=="limit")
				action.price=obj.price;
			
			var options = {
			  uri: url,
			  method: 'POST',
			  json: action
			};

			request(options, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    rsmq.sendMessage({qname:config.rmsq.q2name, message:body}, function (err, resp) {
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