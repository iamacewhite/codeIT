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
var redis = require("redis"),
    client = redis.createClient();

function databaseWorker(){
    client.on("error", function (err) {
        console.log("Error " + err);
    });
}

databaseWorker();


