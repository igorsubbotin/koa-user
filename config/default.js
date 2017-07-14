const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
  // secret data can be moved to env variables
  // or a separate config
  secret:   'mysecret',
  server: {
    siteHost: 'http://localhost:3000'
  },
  providers: {
    facebook: {
      appId: '1385548714854904',
      appSecret: '999f33a311818b07ceff8625cdd41989',
      test: {
        login: 'course.test.facebook@gmail.com',
        password: 'course-test-facebook'
      },
      passportOptions: {
        display: 'popup',
        scope:   ['email']
      }
    },
    github: {
      clientId: 'Iv1.3fd3c298e17c530d',
      clientSecret: '0199682525038700aa0ac730b8b8469475d23486'
    },
    vkontakte: {
      clientId: '5PntKCWe1L90ve5cHFRW',
      clientSecret: '200e31f6200e31f6200e31f66120537bb12200e200e31f67966d2b463bb48d1489b33a9'
    }
  },
  mongoose: {
    uri:     'mongodb://localhost/app',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize:      5
      }
    }
  },
  bunyan: {
    name: 'koa-user',
    level: 'trace'
  },
  crypto: {
    hash: {
      length:     128,
      // may be slow(!): iterations = 12000 take ~60ms to generate strong password
      iterations: process.env.NODE_ENV == 'production' ? 12000 : 1
    }
  },
  template: {
    // template.root uses config.root
    root: defer(function(cfg) {
      return path.join(cfg.root, 'templates');
    })
  },
  root:     process.cwd()
};
