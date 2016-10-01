
/**
 * Module dependencies.
 */

var express = require('express');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jade = require('jade');
var config = require('./');
var pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function (app, passport) {

  // Compression middleware (should be placed before express.static)
  app.use(compression({
    threshold: 512
  }));

  // Static files middleware
  app.use(express.static(config.root + '/public'));

  // Use winston on production
  var log;
  if (env !== 'development') {
    log = {
      stream: {
        write: function (message, encoding) {
          winston.info(message);
        }
      }
    };
  } else {
    log = 'dev';
  }

  // Don't log during tests
  // Logging middleware

  // set views path and default layout
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  // bodyParser should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  // cookieParser should be above session
  app.use(cookieParser());

  // use passport session
  // app.use(passport.initialize());
  // app.use(passport.session());



  // adds CSRF support
  // if (process.env.NODE_ENV !== 'test') {
  //   app.use(csrf());
  //
  //   // This could be moved to view-helpers :-)
  //   app.use(function (req, res, next){
  //     res.locals.csrf_token = req.csrfToken();
  //     next();
  //   });
  // }
};
