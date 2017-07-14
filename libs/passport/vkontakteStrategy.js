const User = require('../../models/user');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const authenticateByProfile = require('./authenticateByProfile');
const config = require('config');
const request = require('request-promise');
const UserAuthError = require('./userAuthError');
const checkUserAuth = require('./checkUserAuth');
const log = require('../log');

module.exports = new VKontakteStrategy({
    clientID: config.providers.vkontakte.clientId,
    clientSecret: config.providers.vkontakte.clientSecret,
    callbackURL: "http://127.0.0.1:3000/oauth/vkontakte"
  },
  async function(accessToken, refreshToken, params, profile, done) {
    try {
      log.debug('Vkontakte strategy');
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