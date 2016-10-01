
/**
 * Expose
 */
 var RedisSMQ = require("rsmq");
 var rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

 module.exports = {
   db: 'mongodb://localhost/teamAce',
   token: "ub3xoKYYnv5007VCzJV_HA",
   mongo: {
     uri: "mongodb://localhost:27017/teamAce"
   },
   rsmq: rsmq,
   q1name: "trade",
   q2name: "db",
   q3name: "del",
   master_frequency: 600,
   worker_frequency: 300
 };
