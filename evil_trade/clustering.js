var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var config = require("../config");
var master = require("./master");
var mongo = require("./mongo");

if (cluster.isMaster) {
  // Fork workers.
  cluster.fork();

  Object.keys(cluster.workers).forEach(function(id) {
    console.log("I am running with ID : " + cluster.workers[id].process.pid);
  });
  var bidId = [{}, {}, {}];
  var askId = [{}, {}, {}];
  for (var j = 0; j < 3; ++j) {
    bidId[j] = {
      "0001": null,
      "0005": null,
      "0388": null,
      "0386": null,
      "3988": null
    };
    askId[j] = {
      "0001": null,
      "0005": null,
      "0388": null,
      "0386": null,
      "3988": null
    };
  }
  cluster.on('exit', function(worker, code, signal) {});
  while (true) {
    setTimeout(function() {
      master(bidId, askId);
    }, 1000)
  }
} else if (cluster.isWorker) {
  // console.log("I am mongo worker " + cluster.worker.id);
  setInterval(function() {
    mongo();
  }, 1000)
}
