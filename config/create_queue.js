var config = require("../config");
config.rsmq.createQueue({qname:config.q1name}, function (err, resp) {
        if (resp===1) {
            console.log("queue1 created")
        }
        config.rsmq.createQueue({qname:config.q2name}, function (err, resp) {
                if (resp===1) {
                    console.log("queue2 created")
                }
                config.rsmq.createQueue({qname:config.q3name}, function (err, resp) {
                        if (resp===1) {
                            console.log("queue3 created")
                        }
                });
        });
});
