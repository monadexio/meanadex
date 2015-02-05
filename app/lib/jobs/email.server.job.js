'use strict';
var nodemailer = require('nodemailer');

module.exports = function(agenda, config) {
  agenda.define('send email', {priority: 'high'}, function(job, done) {
    var data = job.attrs.data;

    var smtpTransport = nodemailer.createTransport(config.mailer.options);
    var mailOptions = {
      to: data.email,
      from: config.mailer.from,
      subject: data.subject,
      html: data.emailHTML
    };

    smtpTransport.sendMail(mailOptions, function(err) {
      done();
    });
  });
};
