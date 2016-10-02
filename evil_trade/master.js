var request = require('request');
var async = require('async');
var config = require('../config');
var rsmq = config.rsmq;
var amt = 4;

var master = function(bidId, askId) {
  // function action(actions) {
  //   //console.log("checkpoint");
  //   rsmq.sendMessage({
  //     qname: config.q1name,
  //     message: actions
  //   }, function(err, resp) {
  //     //console.log(err);
  //     if (resp) {
  //       // console.log("Message sent to trade. ID:", resp);
  //     }
  //   });
  // }


  for (var i=0; i<3; ++i){//for each stock
    for (var key in bidId[i]){
      if (bidId[i][key] == null){
        var action = {
          "team_uid": config.token,
          "symbol": key,
          "side": "buy",
          "qty": 1,
          "order_type": "limit",
          "price": 0.0001
        };
        var url = "";
        url = url.concat("http://cis2016-exchange", i+1, ".herokuapp.com/api/orders");
        var options = {
          uri: url,
          method: 'POST',
          json: action
        };
        // var res = request('POST', url, {
        //   json: action
        // });
        var b = function() {
          var x = i;
          var new_key = key;
          request(options, function(error, response, body){

            if (!error && response.statusCode == 200){
              console.log(bidId[x]);
              bidId[x][new_key] = body.id;
              rsmq.sendMessage({
                qname: config.q2name,
                message: JSON.stringify(body)
              }, function(err, resp) {
                //console.log(err);
                if (resp) {
                  console.log("Message sent. ID:", resp);
                }
              });
            }
          });
        }();

      }
      if (askId[i][key] == null){
        action = {
          "team_uid": config.token,
          "symbol": key,
          "side": "sell",
          "qty": 1,
          "order_type": "limit",
          "price": 500000
        };
        url = "";
        url = url.concat("http://cis2016-exchange", i+1, ".herokuapp.com/api/orders");

        options = {
          uri: url,
          method: 'POST',
          json: action
        };
        var c = function() {
          var y = i;
          var new_key1 = key;
          request(options, function(error, response, body){
            if (!error && response.statusCode == 200){
              console.log(askId[y]);
              askId[y][new_key1] = body.id;
              rsmq.sendMessage({
                qname: config.q2name,
                message: JSON.stringify(body)
              }, function(err, resp) {
                //console.log(err);
                if (resp) {
                  console.log("Message sent. ID:", resp);
                }
              });
            }
          });
        }();
      }
    }

  }




}
master();
// setInterval(function() {
//   master();
// }, 1000)
module.exports = master;
