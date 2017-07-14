const User = require('../../models/user');
const FacebookStrategy = require('passport-facebook').Strategy;
const authenticateByProfile = require('./authenticateByProfile');
const config = require('config');
const request = require('request-promise');
const UserAuthError = require('./userAuthError');
const checkUserAuth = require('./checkUserAuth');
const log = require('../log');


/*
  OAuth2,

  website -> facebook (clientID, clientSecret) -> website (code) (|)

      code -> request(code) -> access_token -> requestFacebookAPI(access_token) ->
      profile

  -> website (welcome)

*/
module.exports = new FacebookStrategy({
    clientID:          config.providers.facebook.appId,
    clientSecret:      config.providers.facebook.appSecret,
    callbackURL:       config.server.siteHost + "/oauth/facebook",
    // fields are described here:
    // https://developers.facebook.com/docs/graph-api/reference/v2.7/user
    profileFields: ['id', 'about', 'email', 'gender', 'link', 'locale',
                    'timezone', 'name', 'photos']
  }, async function(req, accessToken, refreshToken, profile, done) {

    try {
      log.debug('Facebook strategy');
      log.trace(profile);

      checkUserAuth(profile);

      const response = await request.get({
        url: 'http://graph.facebook.com/v2.7/' + profile.id + '/picture?redirect=0&width=1000&height=1000',
        json: true
      });

      const photoData = response.data;

      profile.photos = [{
        value: photoData.url,
        type: photoData.is_silhouette ? 'default' : 'photo'
      }];

      profile.displayName = profile.name.givenName + " " + profile.name.familyName;

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
