/**
 * Created by Samuel on 2/10/2016.
 */


var request = require('request');
exports.getinfo = function (req, res) {
    var message = {};
    request({
        uri: "http://cis2016-dashboard.herokuapp.com/api/teams",
        method: "GET"
    }, function (error, response, body) {
        if (!error) {
            var bodyJson = JSON.parse(body);
            for (var i = 0; i < bodyJson.length; i++) {
                console.log(i);
                if (bodyJson[i].name === 'Ace') {
                    console.log('ace found');
                    message["holdings"] = bodyJson[i].holdings;
                    message["cash"] = bodyJson[i].cash;
                    res.status('200').send(message);
                }
            }
        }
    });
/*
    request({uri:'http://cis2016-teamtracker.herokuapp.com/api/teams/',method:"GET"},function(error,response,body){
        if(!error){
            bodyJson = JSON.parse(body);
        }
    });
    */

};

