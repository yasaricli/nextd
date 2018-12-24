const node_ssh = require('node-ssh'),
      _ = require('underscore');

// config
const config = require('./config');

module.exports = (callback) => {
  const ssh = new node_ssh();
  
  return ssh.connect(_.pick(config, ['host', 'username', 'password', 'privateKey'])).then(() => {
    return callback(ssh);
  })
}
