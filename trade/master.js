var request = require('request');
var async = require('async');
var config = require('../config');
var rsmq = config.rsmq;
var delta = 0.1;  //can be put into config
var quantity = 10; //can be put into config

var master = function() {
  function action(actions) {
    //console.log("checkpoint");
    rsmq.sendMessage({
      qname: config.q1name,
      message: actions
    }, function(err, resp) {
      //console.log(err);
      if (resp) {
        //console.log("Message sent. ID:", resp);
      }
    });
  }
  function strategy(res){
    var minAsk, maxBid, buyIn, sellOut;
    for (var i=0; i<5; i++){ //for each stock
      minAsk = Number.MAX_VALUE; maxBid = 0; buyIn = 0; sellOut = 0;
      for (var j=0; j<3; j++){
        if (minAsk > res[j][i].ask) {
          minAsk = res[j][i].ask;
          buyIn = j;
        }
        if (maxBid < res[j][i].bid) {
          maxBid = res[j][i].bid;
          sellOut = j;
        }
      }
      if (minAsk + delta <= maxBid){
        var buyaction = {
          symbol: res[buyIn][i].symbol,
          side: "buy",
          qty: quantity,
          order_type: "limit",
          price: minAsk + delta * 0.1,
          exchange: buyIn
        };
        
        var sellaction = {
          symbol: res[sellOut][i].symbol,
          side: "sell",
          qty: quantity,
          order_type: "limit",
          price: maxBid - delta * 0.1,
          exchange: sellOut
        };
        actions = [JSON.stringify(buyaction), JSON.stringify(sellaction)];
        action(actions);
      }
    }
  }


  async.parallel([
      function(callback) {
        request({
            uri: "http://cis2016-exchange1.herokuapp.com/api/market_data",
            method: "GET"
          },
          function(error, response, body) {
            if (!error && body != null){
              callback(null, JSON.parse(body));
            }
          });
      },
      function(callback) {
        request({
            uri: "http://cis2016-exchange2.herokuapp.com/api/market_data",
            method: "GET"
          },
          function(error, response, body) {
            if (!error && body != null){
              callback(null, JSON.parse(body));
            }
          });
      },
      function(callback) {
        request({
            uri: "http://cis2016-exchange3.herokuapp.com/api/market_data",
            method: "GET"
          },
          function(error, response, body) {
            if (!error && body != null){
              callback(null, JSON.parse(body));
            }
          });
      }
    ],
    function(err, result) {
      ////console.log(result);
      //strategy goes here
      // var actions = {
      //   symbol: "0001",
      //   side: "sell",
      //   qty: 1,
      //   order_type: "market",
      //   exchange: 1
      // };
      strategy(result);
    });
}
// setInterval(function() {
//   master();
// }, 1000)
module.exports = master;
