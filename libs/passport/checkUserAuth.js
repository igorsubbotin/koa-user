const UserAuthError = require('./userAuthError');

module.exports = (profile) => {
  if (!profile.emails || !profile.emails[0]) { // user may allow authentication, but disable email access (e.g in fb)
    throw new UserAuthError("Grant access to email. It uses for identification.");
  }
}