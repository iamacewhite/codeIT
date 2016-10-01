var config = require("./config");
var RedisSMQ = require("rsmq");
var request = require('request');
var worker = (function() {

  rsmq = new RedisSMQ({
    host: config.rsmq.IP,
    port: config.rsmq.port,
    ns: config.rsmq.ns
  });
  rsmq.receiveMessage({
    qname: config.rsmq.q1name
  }, function(err, resp) {
    if (resp.id) {
      console.log("Message received.", resp);
      var msg = resp.message;
      rsmq.deleteMessage({
        qname: config.rsmq.q1name,
        id: resp.id
      }, function(err, resp) {
        if (resp === 1) {
          console.log("Message deleted.")
        } else {
          console.log("Message not found.")
        }
      });
			console.log("checkpoint");
      var obj = JSON.parse(msg);
      var url = "";
      url = url.concat("http://cis2016-exchange", obj.exchange, ".herokuapp.com/api/orders");

      var action = {
        "team_uid": config.token,
        "symbol": obj.symbol,
        "side": obj.side,
        "qty": obj.qty,
        "order_type": obj.order_type
      };
      if (obj.order_type == "limit")
        action.price = obj.price;

      var options = {
        uri: url,
        method: 'POST',
        json: action
      };
      console.log("begin request");
      request(options, function(error, response, body) {
				console.log(body);
        if (!error && response.statusCode == 200) {
          rsmq.sendMessage({
            qname: config.rsmq.q2name,
            message: JSON.stringify(body)
          }, function(err, resp) {
						console.log(err);
            if (resp) {
              console.log("Message sent. ID:", resp);
            }
          });
        }
      });

    } else {
      console.log("No messages for me...");
    }
  });
})();
