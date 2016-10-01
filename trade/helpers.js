var config = require("../config");

//mongodb integration
var mongoClient = require('mongodb').MongoClient;
var insertToDB = function(entry) {
  mongoClient.connect(config.mongo.uri, function(err, db) {
    if (err) {
      console.log('an error');
    } else {
      console.log('no error');
      console.log(db);
      db.collection('executionHistory').insertOne(entry, function(err, result) {
        if (!err) {
          //console.log(result);
          console.log('A trading history entry has been inserted.')
        }
      });
      // db.collection('executionHistory').find({}).toArray(function (err, result) {
      //     if(!err){
      //         console.log(result);
      //     }
      // });
    }
  });
}
module.exports = insertToDB;
