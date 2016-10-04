
/**
 * Expose
 */
 var RedisSMQ = require("rsmq");
 // redis message queue setup
 var rsmq = new RedisSMQ( {host: "<IP>", port: <PORT>, ns: "rsmq"} );

 module.exports = {
   token: "<TEAM_TOKEN>",
   rsmq: rsmq,
   // Message queue names
   q1name: "trade",
   q2name: "db",
   q3name: "del",
   // Time per trade, in ms
   master_frequency: 10,
   worker_frequency: 10,
   // Logging is completely disabled afterwards for better performance, this is just in case someone needs logger
   log_level: 'ERROR'
 };
