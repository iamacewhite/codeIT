var config = require("../config");

//mongodb integration
//var mongoClient = require('mongodb').MongoClient;

//Firebase
var firebase = require("firebase");
var path = require("path");
firebase.initializeApp({
    serviceAccount: path.resolve(__dirname, './codeit-suisse-team-ace-1e09ffc96f62.json'),
    databaseURL: "https://codeit-suisse-team-ace.firebaseio.com/"
});

var db = firebase.database();
var ref = db.ref("server/testing");
var usersRef = ref.child("transactionHistory");


var insertToDB = function(entry) {
    usersRef.push().set(entry);
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



module.exports = insertToDB;
