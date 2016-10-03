var config = require("../config");

//mongodb integration
//var mongoClient = require('mongodb').MongoClient;

//Firebase
var firebase = require("firebase");
var path = require("path");
firebase.initializeApp({
    serviceAccount: path.resolve(__dirname, ''),
    //REMARK: Firebase details deleted in order to make this project open-source
    databaseURL: ""
});

var db = firebase.database();
var ref = db.ref("server/testing");
var usersRef = ref.child("transactionHistory");


var insertToDB = function(entry) {
    if(entry.message){
        entry.message = JSON.parse(entry.message);
        usersRef.push().set(entry);
    }

/*
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
  */
};

// insertToDB({"time":147262494723131,"message":{"symbol":"0001","price":33.45}});

module.exports = insertToDB;
