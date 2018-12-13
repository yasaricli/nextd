const path = require('path'),
      node_ssh = require('node-ssh'),
      _ = require('underscore');

// putDirectory Option functions.
const validate = require('./utils/validate');
      tick = require('./utils/tick');

// ALL CONFIG
const config = require('./utils/config');

module.exports = () => {
  const ssh = new node_ssh();

  ssh.connect(_.pick(config, ['host', 'username', 'privateKey'])).then((status) => {

    // Dosyaları aktar.
    ssh.putDirectory(config.localDirectory, config.remoteDirectory, {
      recursive: true,
      validate,
      tick
    }).then((status) => {
      console.log('the directory transfer was', status ? 'successful' : 'unsuccessful')
    })
  })
}
