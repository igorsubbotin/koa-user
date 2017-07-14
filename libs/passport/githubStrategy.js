const User = require('../../models/user');
const GitHubStrategy = require('passport-github').Strategy;
const authenticateByProfile = require('./authenticateByProfile');
const config = require('config');
const request = require('request-promise');
const UserAuthError = require('./userAuthError');
const checkUserAuth = require('./checkUserAuth');
const log = require('../log');

module.exports = new GitHubStrategy({
    clientID: config.providers.github.clientId,
    clientSecret: config.providers.github.clientSecret,
    callbackURL: "http://127.0.0.1:3000/oauth/github"
  },
  async function(req, accessToken, refreshToken, profile, done) {
    try {
      log.debug('Github strategy');
      log.trace(profile);

      checkUserAuth(profile);
      
      authenticateByProfile(req, profile, done);
    } catch (err) {
      log.error(err);
      if (err instanceof UserAuthError) {
        done(null, false, {message: err.message});
      } else {
        done(err);
      }
    }
  }
);