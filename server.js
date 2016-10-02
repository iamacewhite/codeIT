'use strict';

const join = require('path').join;
const express = require('express');
const config = require('./config');

const port = process.env.PORT || 3000;

const app = express();

/**
 * Expose
 */

module.exports = {
  app
};


// Bootstrap routes
//require('./config/passport')(passport);
require('./config/express')(app);
require('./config/routes')(app);

function listen () {
  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log('Express app started on port ' + port);
}

listen();
