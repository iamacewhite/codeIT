var request = require('request');
var async = require('async');
var config = require('../config');
var rsmq = config.rsmq;

var master = function() {
  function action(actions) {
    console.log("checkpoint");
    rsmq.sendMessage({
      qname: config.q1name,
      message: actions
    }, function(err, resp) {
      console.log(err);
      if (resp) {
        console.log("Message sent. ID:", resp);
      }
    });
  }
  var res = [];
  async.parallel([
      function(callback) {
        request({
            uri: "http://cis2016-exchange1.herokuapp.com/api/market_data",
            method: "GET"
          },
          function(error, response, body) {
            callback(null, JSON.parse(body));
          });
      },
      function(callback) {
        request({
            uri: "http://cis2016-exchange2.herokuapp.com/api/market_data",
            method: "GET"
          },
          function(error, response, body) {
            callback(null, JSON.parse(body));
          });
      },
      function(callback) {
        request({
            uri: "http://cis2016-exchange3.herokuapp.com/api/market_data",
            method: "GET"
          },
          function(error, response, body) {
            callback(null, JSON.parse(body));
          });
      }
    ],
    function(err, result) {
      res = result;
      console.log(res);
      //strategy goes here
      var actions = {
        symbol: "0388",
        side: "buy",
        qty: 1,
        order_type: "market",
        exchange: 1
      };
      action(JSON.stringify(actions));
    });
}
// setInterval(function() {
//   master();
// }, 1000)
module.exports = master;