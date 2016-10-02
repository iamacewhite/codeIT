/**
 * Created by Samuel on 1/10/2016.
 */
var config = require("../config");

//mongodb integration
//var mongoClient = require('mongodb').MongoClient;

//Include redis modules
var rsmq = config.rsmq;
var insertToDB = require("./helpers");

var mongo = function() {
  rsmq.receiveMessage({
    qname: config.q2name
  }, function(err, resp) {
    if (!err) {
      console.log("Message received.", resp);
      insertToDB(resp);
      rsmq.deleteMessage({
        qname: config.q2name,
        id: resp.id
      }, function(err, resp) {
        if (resp === 1) {
          ////console.log("Message" + resp.id + "deleted.");
        } else {
          ////console.log("Message not found.")
        }
      });
    }
  });
}
// mongo();
module.exports = mongo;
