var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var config = require("../config");
var master = require("./master");
var mongo = require("./mongo");

if (cluster.isMaster) {
  // Fork workers.
  cluster.fork();

   Object.keys(cluster.workers).forEach(function(id) {
    console.log("I am running with ID : "+cluster.workers[id].process.pid);
  });

  cluster.on('exit', function(worker, code, signal) {
  });
  setInterval(function() {
    master();
  }, 1000)
}

else if (cluster.isWorker) {
  // console.log("I am mongo worker " + cluster.worker.id);
  setInterval(function() {
    mongo();
  }, 1000)
}
