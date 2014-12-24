'use strict';

module.exports = function(app) {
  // Root routing
  var core = require('../../app/controllers/core');
  var users = require('../../app/controllers/users');

  app.route('/main').get(core.index);
  app.route('/dashboard').get(core.dashboard);
};
