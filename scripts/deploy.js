const path = require('path'),
      node_ssh = require('node-ssh'),
      _ = require('underscore');

// putDirectory Option functions.
const validate = require('./utils/validate');
      tick = require('./utils/tick');

// ALL CONFIG
const config = require('./utils/config');

// commands
const {
  install,
  start,
  restartAll,
  stopAll
} = require('./utils/execCommands');

module.exports = () => {
  const ssh = new node_ssh();

  return ssh.connect(_.pick(config, ['host', 'username', 'privateKey'])).then((status) => {
    return ssh.putDirectory(config.localDirectory, config.remoteDirectory, {
      recursive: true,
      validate,
      tick
    }).then((status) => {
      if (status) {
        console.log('the directory transfer was successful!');

        // install and start
        install(ssh).then((installResult) => {

          console.log('STDOUT: ' + installResult.stdout)
          console.log('STDERR: ' + installResult.stderr)

          // StopAll
          stopAll(ssh).then(() => {

            // start
            start(ssh).then((startResult) => {

              console.log('STDOUT: ' + startResult.stdout)
              console.log('STDERR: ' + startResult.stderr)

              return ssh.dispose();
            })
          })
        })
      }
    })
  })
}
