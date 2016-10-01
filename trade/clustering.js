var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var config = require("../config");
var master = require("./master");
var worker = require("./worker");
var mongo = require("./mongo");
var del_worker = require("./del_worker");

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  //  Object.keys(cluster.workers).forEach(function(id) {
  //   console.log("I am running with ID : "+cluster.workers[id].process.pid);
  // });

  cluster.on('exit', function(worker, code, signal) {
    // console.log('worker ' + worker.process.pid + ' died');
  });
  setInterval(function() {
    master();
  }, config.master_frequency)
}

else if (cluster.worker.id == 3) {
  // console.log("I am mongo worker " + cluster.worker.id);
  setInterval(function() {
    mongo();
  }, config.worker_frequency)
}
else if (cluster.worker.id == 2) {
  // console.log("I am del worker " + cluster.worker.id);
  setInterval(function() {
    del_worker();
  }, config.worker_frequency)
}

else {
  // console.log("I am slave worker " + cluster.worker.id);
  setInterval(function() {
    worker();
  }, config.worker_frequency)
  // worker.on( "message", function( msg, next, id ){
  //   // process your message
  //   console.log("Message id : " + id);
  //   console.log(msg);
  //   next()
  // });
  //
  // // optional error listeners
  // worker.on('error', function( err, msg ){
  //     console.log( "ERROR", err, msg.id );
  // });
  // worker.on('exceeded', function( msg ){
  //     console.log( "EXCEEDED", msg.id );
  // });
  // worker.on('timeout', function( msg ){
  //     console.log( "TIMEOUT", msg.id, msg.rc );
  // });
  //
  // worker.start();
}
