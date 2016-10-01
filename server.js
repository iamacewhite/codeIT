'use strict';

/*
 * nodejs-express-mongoose
 * Copyright(c) 2015 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */


const join = require('path').join;
const express = require('express');
const config = require('./config');

const port = process.env.PORT || 80;

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
