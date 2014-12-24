'use strict';

/**
 * Module dependencies.
 */
exports.root = function(req, res) {
  res.redirect('/main');
};

exports.main = function(req, res) {
  res.render('index', {
    user: req.user || null
  });
};

exports.dashboard = function(req, res) {
  res.render('dashboard', {
    user: req.user || null
  });
};
