/**
 * This file must be required at least ONCE.
 * After it's done, one can use require('mongoose')
 *
 * In web-app: ctx is done at init phase
 * In tests: in mocha.opts
 * In gulpfile: in beginning
 */

const log = require('./log');
const mongoose = require('mongoose');
const config = require('config');
mongoose.Promise = Promise;

const beautifyUnique = require('mongoose-beautiful-unique-validation');

if (process.env.MONGOOSE_DEBUG) {
  log.trace('Mongo connection is in debug mode');
  mongoose.set('debug', true);
}

mongoose.connect(config.mongoose.uri, config.mongoose.options);
log.trace(`Connected to mongo: ${config.mongoose.uri}`);
log.trace(config.mongoose.options, 'Mongo options');

// вместо MongoError будет выдавать ValidationError (проще ловить и выводить)
mongoose.plugin(beautifyUnique);

module.exports = mongoose;
