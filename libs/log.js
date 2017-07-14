const PrettyStream = require('bunyan-prettystream');
const bunyan = require('bunyan');
const config = require('config');
 
const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);
 
const log = bunyan.createLogger({
  name: config.bunyan.name,
  streams: [{
      level: config.bunyan.level,
      type: 'raw',
      stream: prettyStdOut
  }]
});

module.exports = log;