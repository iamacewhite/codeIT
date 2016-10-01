/**
 * Created by Samuel on 1/10/2016.
 */
var config = require("./config");

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
rsmq = new RedisSMQ({host: config.rsmq.IP, port: config.rsmq.port, ns: config.rsmq.ns});


function insertToDB(entry) {
    mongoClient.connect(config.mongo.uri, function (err, db) {
        if (err) {
            console.log('an error');
        } else {
            console.log('no error');
                db.collection('executionHistory').insertOne(entry, function (err, result) {
                    if(!err){
                        console.log(result);
                        console.log('A trading history entry has been inserted.')
                    }
                });
                collection.find({}).toArray(function (err, result) {
                    console.log(result);
                });
        }
    });
}

/*
 function queryFromMongodb(criteria) {
 mongoClient.connect(config.mongo.uri, function (err, db) {
 if(!err){

 }
 });
 }
 */

/*
rsmq.createQueue({qname: config.rsmq.q2name}, function (err, resp) {
    if (!err) {
        console.log("Queue " + resp + " created.");
        rsmq.sendMessage({
            qname: config.rsmq.q2name, message: JSON.stringify({
                "symbol": "0001",
                "side": "sell",
                "qty": 1,
                "order_type": "limit",
                "price": 200,
                "team_uid": "eETKmZ1JvPC2wM_UsA8sHw",
                "exchange_id": 1
            })
        }, function (err, resp) {
            if (!err) {
                console.log("Message sent. ID:", resp);
                rsmq.receiveMessage({qname: config.rsmq.q2name}, function (err, resp) {
                    if (!err) {
                        console.log("Message received.", resp);
                        insertToDB(resp);
                        rsmq.deleteMessage({qname: config.rsmq.q2name, id: resp.id}, function (err, resp) {
                            if (resp === 1) {
                                console.log("Message" + resp.id + "deleted.");
                            }
                            else {
                                console.log("Message not found.")
                            }
                        });
                    }
                });
            }
        });
    }
});
*/

rsmq.receiveMessage({qname: config.rsmq.q2name}, function (err, resp) {
    if (!err) {
        console.log("Message received.", resp);
        insertToDB(resp);
        rsmq.deleteMessage({qname: config.rsmq.q2name, id: resp.id}, function (err, resp) {
            if (resp === 1) {
                console.log("Message" + resp.id + "deleted.");
            }
            else {
                console.log("Message not found.")
            }
        });
    }
});
