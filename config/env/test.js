'use strict';

var HOST = process.env.WERCKER_MONGODB_HOST || 'localhost';

module.exports = {
  db: 'mongodb://' + HOST + '/meanadex-test',
  port: 3001,
  app: {
    title: 'meanadex - Test Environment'
  },
  assets: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.min.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
        'public/lib/font-awesome/css/font-awesome.min.css',
        'public/lib/angular-bootstrap-colorpicker.min.css/colorpicker.min.css',
        'public/lib/ng-table/ng-table.min.css',
        'public/lib/nvd3/nv.d3.min.css',
        'public/lib/angular-rangeslider/angular.rangeSlider.css'
      ],
      js: [
        'public/lib/jquery/jquery.min.js',
        'public/lib/underscore/underscore.js',
        'public/lib/async/lib/async.js',
        'https://checkout.stripe.com/checkout.js',
        'public/lib/angular/angular.min.js',
        'public/lib/angular-resource/angular-resource.min.js',
        'public/lib/angular-cookies/angular-cookies.min.js',
        'public/lib/angular-animate/angular-animate.min.js',
        'public/lib/angular-touch/angular-touch.min.js',
        'public/lib/angular-sanitize/angular-sanitize.min.js',
        'public/lib/angular-ui-router/release/angular-ui-router.min.js',
        'public/lib/angular-ui-utils/ui-utils.min.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'public/lib/fabric/dist/fabric.min.js',
        'public/lib/bootstrap/dist/js/bootstrap.min.js',
        'public/lib/textAngular/dist/textAngular-sanitize.min.js',
        'public/lib/textAngular/dist/textAngular.min.js',
        'public/lib/moment/min/moment.min.js',
        'public/lib/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
        'public/lib/angular-rangeslider/angular.rangeSlider.js',
        'public/lib/angular-local-storage/angular-local-storage.min.js',
        'public/lib/ng-table/ng-table.min.js',
        'public/lib/angular-data/dist/angular-data.min.js',
        'public/lib/angular-timer/dist/angular-timer.min.js',
        'public/lib/angular-file-upload/angular-file-upload.min.js',
        'public/lib/d3/d3.min.js',
        'public/lib/nvd3/nv.d3.min.js',
        'public/lib/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.min.js',
        'public/lib/bootstrap-autohidingnavbar/dist/jquery.bootstrap-autohidingnavbar.min.js'
      ]
    },
    css: 'public/dist/application.min.css',
    js: 'public/dist/application.min.js'
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || 'APP_ID',
    clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
    callbackURL: 'http://localhost:3001/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
    clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
    callbackURL: 'http://localhost:3001/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || 'APP_ID',
    clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
    callbackURL: 'http://localhost:3001/auth/google/callback'
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID || 'APP_ID',
    clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
    callbackURL: 'http://localhost:3001/auth/linkedin/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || 'APP_ID',
    clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
    callbackURL: 'http://localhost:3001/auth/github/callback'
  },
  ssl: {
    privateKeyPath: process.env.SSL_PATH_PRIVATE_KEY || './config/env/ssl/development/key.pem',
    certificatePath: process.env.SSL_PATH_CERTIFICATE || './config/env/ssl/development/cert.pem'
  },
  stripe: {
    clientID: process.env.STRIPE_ID || 'ca_53emHeHCgJWdAOPGsIp4uIdFCCEXkdal',
    clientSecret: process.env.STRIPE_SECRET || 'sk_test_POGF3C0J4jmm8rFZNGwLrLaH',
    publishableKey: process.env.PUBLISHABLE_KEY || 'pk_test_WMSaxecz5HSTGZxlFbuxdF7B',
    callbackURL: 'http://127.0.0.1:3000/auth/stripe/callback'
  },
  job: {
    campaignJob: {
      start: 'Saturday at noon',
      frequency: '1 week'
    }
  },
  imageUploaderOptions: {
    tmpDir: './public/uploads/tmp',
    uploadDir: './public/uploads',
    uploadUrl: '/uploads/',
    maxPostSize: 500000, // 50MB
    minFileSize: 1,
    maxFileSize: 500000, // 50MB
    imageTypes:  /\.(gif|jpe?g|png)/i,
    storage: {
      type: 'aws',
      aws: {
        accessKeyId: 'AKIAIXDR74RCRQ2VSFLA',
        secretAccessKey: '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',
        region: 'eu-west-1',
        bucketName: 'meanadex-images-test'
      }
    }
  },
  logging: {
    console: {
      level: 'verbose'
    },
    file: {
      debug: {
        filename: './logs/meanadex-debug.log',
        level: 'debug'
      },
      info: {
        filename: './logs/meanadex-info.log',
        level: 'info'
      },
      error: {
        filename: './logs/meanadex-error.log',
        level: 'error'
      }
    }
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  }
};
