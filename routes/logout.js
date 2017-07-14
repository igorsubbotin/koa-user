const log = require('../libs/log');

exports.post = async function(ctx, next) {
  ctx.logout();

  log.debug('User logged out');

  ctx.session = null; // destroy session (!!!)

  ctx.redirect('/');
};
