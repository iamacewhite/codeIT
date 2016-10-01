var cluster = require('cluster');
var http = require('http');
var RSMQWorker = require( "rsmq-worker" );
var worker = new RSMQWorker( "myqueue" );

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

   Object.keys(cluster.workers).forEach(function(id) {
    console.log("I am running with ID : "+cluster.workers[id].process.pid);
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
}

else if (cluster.worker.id == 1) {
  console.log("I am mongo worker " + cluster.worker.id);
}


else {
  console.log("I am slave worker " + cluster.worker.id);
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
