var config = require("../config");
var request = require('request');
var worker = function() {

  var rsmq = config.rsmq;
  rsmq.receiveMessage({
    qname: config.q1name
  }, function(err, resp) {
    if (resp.id) {
      console.log("Message received.", resp);
      var msg = resp.message;
    } else {
      console.log("No messages for me...");
    }
  });
};
// worker();
module.exports=worker;
