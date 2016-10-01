var config = require("../config");
var request = require('request');
var worker = function() {

  var rsmq = config.rsmq;
    rsmq.receiveMessage({
      qname: config.q1name
    }, function(err, resp) {
      if (resp.id) {
        // console.log("Message received.", resp);
        var msg = resp.message;
        rsmq.deleteMessage({
          qname: config.q1name,
          id: resp.id
        }, function(err, resp) {
          if (resp === 1) {
            // console.log("Message deleted.")
          } else {
            // console.log("Message not found.")
          }
        });
        //console.log("checkpoint");
        var obj = JSON.parse(msg);
        var obj0 = obj.buyaction;
        var obj1 = obj.sellaction;

        if (obj0) {
          var url0 = "";
          url0 = url0.concat("http://cis2016-exchange", obj0.exchange, ".herokuapp.com/api/orders");

          var action = {
            "team_uid": config.token,
            "symbol": obj0.symbol,
            "side": "buy",
            "qty": obj0.qty,
            "order_type": obj0.order_type
          };
          if (obj0.order_type == "limit")
            action.price = obj0.price;

          var options = {
            uri: url0,
            method: 'POST',
            json: action
          };
          //console.log("begin request");
          var time = new Date();
          request(options, function(error, response, body) {
            //console.log(body);
            if (!error && response.statusCode == 200) {
                rsmq.sendMessage({
                  qname: config.q3name,
                  message: JSON.stringify({
                    id: body.id,
                    side: "buy",
                    time: time,
                    exchange: obj0.exchange
                  })
                }, function(err, resp) {
                  //console.log(err);
                  if (resp) {
                    //console.log("Message sent. ID:", resp);
                  }
                  rsmq.sendMessage({
                    qname: config.q2name,
                    message: JSON.stringify(body)
                  }, function(err, resp) {
                    //console.log(err);
                    if (resp) {
                      //console.log("Message sent. ID:", resp);
                    }
                  });
                });
            }
          });

        }

        var url1 = "";
        url1 = url1.concat("http://cis2016-exchange", obj1.exchange, ".herokuapp.com/api/orders");

        action = {
          "team_uid": config.token,
          "symbol": obj1.symbol,
          "side": "sell",
          "qty": obj1.qty,
          "order_type": obj1.order_type
        };
        if (obj1.order_type == "limit")
          action.price = obj1.price;

        options = {
          uri: url1,
          method: 'POST',
          json: action
        };
        //console.log("begin request");
        time = new Date();
        request(options, function(error, response, body) {
          //console.log(body);
          if (!error && response.statusCode == 200) {
              rsmq.sendMessage({
                qname: config.q3name,
                message: JSON.stringify({
                  action: action,
                  id: body.id,
                  side: "sell",
                  time: time,
                  exchange: obj1.exchange
                })
              }, function(err, resp) {
                //console.log(err);
                if (resp) {
                  //console.log("Message sent. ID:", resp);
                }
                rsmq.sendMessage({
                  qname: config.q2name,
                  message: JSON.stringify(body)
                }, function(err, resp) {
                  //console.log(err);
                  if (resp) {
                    //console.log("Message sent. ID:", resp);
                  }
                });
              });
          }
        });


      } else {
        //console.log("No messages for me...");
      }
    });
};

module.exports=worker;
