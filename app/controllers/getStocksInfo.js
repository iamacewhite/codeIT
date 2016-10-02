/**
 * Created by Samuel on 2/10/2016.
 */
var request = require('request');
exports.getstock = function (req, res) {
    var message = {};
    request({
        uri: "http://cis2016-teamtracker.herokuapp.com/api/teams/KRqQUneWyzHPCM4yzFeesw",
        method: "GET"
    }, function (error, response, body) {
        if (!error) {
            var bodyJson = JSON.parse(body);
            var stock0 = {};
            //stock0["name"] = "0001";
            stock0["actualHold"] = bodyJson["0001"];
            stock0["reserved"] = bodyJson["0001_reserved"];
            message["0001"] = stock0;

            var stock1 = {};
            //stock1["name"] = "0005";
            stock1["actualHold"] = bodyJson["0005"];
            stock1["reserved"] = bodyJson["0005_reserved"];
            message["0005"] = stock1;

            var stock2 = {};
            //stock2["name"] = "0386";
            stock2["actualHold"] = bodyJson["0386"];
            stock2["reserved"] = bodyJson["0386_reserved"];
            message["0386"] = stock2;

            var stock3 = {};
            //stock3["name"] = "0388";
            stock3["actualHold"] = bodyJson["0388"];
            stock3["reserved"] = bodyJson["0388_reserved"];
            message["0388"] = stock3;

            var stock4 = {};
            //stock4["name"] = "3988";
            stock4["actualHold"] = bodyJson["3988"];
            stock4["reserved"] = bodyJson["3988_reserved"];
            message["3988"] = stock4;


            res.status('200').send(message);

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