var request = require('request');
var async = require('async');
var config = require('../config');
var rsmq = config.rsmq;
var amt = 4;

var master = function() {
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
  var bidId = [{},{},{}];
  var askId = [{},{},{}];
  for (var i=0; i<3; i++){
    bidId[i] = {"0001": null, "0005": null, "0388": null, "0386":null, "3988":null};
    askId[i] = {"0001": null, "0005": null, "0388": null, "0386":null, "3988":null};
  }  


  for (var i=0; i<3; i++){//for each stock
    for (var key in bidId[i]){
      if (bidId[i].key == null){
        var action = {
          "team_uid": config.token,
          "symbol": key,
          "side": "buy",
          "qty": 1,
          "order_type": "limit",
          "price": 0.1
        };
        var url = "";
        url = url.concat("http://cis2016-exchange", i, ".herokuapp.com/api/orders");

        var options = {
          uri: ,
          method: 'POST',
          json: action
        };
        request(options, function(error, response, body){
          if (!error && response.statusCode == 200){
            bidId[i].key = body.id;
          }
        });
      }
      if (askId[i].key == null){
        var action = {
          "team_uid": config.token,
          "symbol": key,
          "side": "sell",
          "qty": 1,
          "order_type": "limit",
          "price": 500000
        };
        var url = "";
        url = url.concat("http://cis2016-exchange", i, ".herokuapp.com/api/orders");

        var options = {
          uri: ,
          method: 'POST',
          json: action
        };
        request(options, function(error, response, body){
          if (!error && response.statusCode == 200){
            askId[i].key = body.id;
          }
        });
      }
    }

  }




}
// setInterval(function() {
//   master();
// }, 1000)
module.exports = master;
