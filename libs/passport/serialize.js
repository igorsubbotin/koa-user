const User = require('../../models/user');
const passport = require('koa-passport');
const log = require('../log');

// паспорт напрямую с базой не работает
passport.serializeUser(function(user, done) {
  log.debug(`Passport: serialize user: ${user.id}`);
  log.trace(user);
  done(null, user.id); // uses _id as idFieldd
});

passport.deserializeUser(function(id, done) {
  log.debug(`Passport: deserialize user: ${id}`);
  User.findById(id, done); // callback version checks id validity automatically
});
