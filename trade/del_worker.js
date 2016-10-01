var config = require("../config");
var request = require('request');
var delta = 0.1;
var del_worker = function() {

  var rsmq = config.rsmq;
    rsmq.receiveMessage({
      qname: config.q3name
    }, function(err, resp) {
      if (resp.id) {
        console.log("Message received.", resp);
        var msg = resp.message;
        rsmq.deleteMessage({
          qname: config.q3name,
          id: resp.id
        }, function(err, resp) {
          if (resp === 1) {
            console.log("Message deleted.")
          } else {
            console.log("Message not found.")
          }
        });
        var obj = JSON.parse(msg);
        var url = "";
        url = url.concat("http://cis2016-exchange", obj.exchange, ".herokuapp.com/api/orders/", obj.id);

        var options = {
          uri: url,
          method: 'DELETE'
        };
        var now = new Date();
        var past = new Date(obj.time);
        if (obj.side == "buy") {
          var exec_time = (1000 - (now - past)) >= 0 ? 1000 - (now - past) : 0;
          console.log(exec_time);
          setTimeout(function() {
            request(options, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                console.log("delete buy order success");
              }
            });
          }, exec_time);
        } else {
          var exec_time = (1000 - (now - past)) >= 0 ? 1000 - (now - past) : 0;
          console.log(exec_time);
          setTimeout(function() {
            request(options, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                console.log("delete sell order success");
                obj.action.price = obj.action.price - delta;
                rsmq.sendMessage({
                  qname: config.q1name,
                  message: JSON.stringify(obj.action)
                }, function(err, resp) {
                  console.log(err);
                  if (resp) {
                    console.log("Message sent. ID:", resp);
                  }
                });
              }
            });
          }, exec_time);
        }


      } else {
        //console.log("No messages for me...");
      }
    });
};

module.exports = del_worker;
