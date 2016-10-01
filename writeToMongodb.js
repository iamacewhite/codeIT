/**
 * Created by Samuel on 1/10/2016.
 */
//Samuel He == MongodDB

//mongodb integration
var mongoClient = require('mongodb').MongoClient;

//Express Module for routing, handle front-end http request
var express = require('express');
var app = express();

//body parser (req.body)
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//Include redis modules
RedisSMQ = require("rsmq");
rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

/*
 function databaseWorker(){
 client.on("error", function (err) {
 console.log("Error " + err);
 });
 }
 */
//databaseWorker();

function insertToDB(entry){
    mongoClient.connect("mongodb://localhost:27017/teamAce", function (err, db) {
        if (err) {
            console.log('an error');
        } else {
            console.log('no error');
            db.createCollection('executionHistory', function (err, collection) {
                db.collection('executionHistory').insertOne(entry, function (err, result) {
                    console.log(result);
                    console.log("Inserted a document into the executionHistory collection.");
                });
                collection.find({}).toArray(function(err, result){
                    console.log(result);
                });
            });
        }
    });
}

insertToDB({"price":3.55});