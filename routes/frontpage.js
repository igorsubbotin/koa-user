const log = require('../libs/log');

exports.get = async function(ctx, next) {
  if (ctx.isAuthenticated()) {
    log.trace(ctx.req.user);
    ctx.body = ctx.render('welcome', { email: ctx.req.user.email, displayName: ctx.req.user.displayName });
  } else {
    ctx.body = ctx.render('login');
  }
};

