// putDirectory Option functions.
const validate = require('./utils/validate');
      tick = require('./utils/tick');

const connect = require('./utils/connect'),
      config = require('./utils/config');

// commands
const {
  install,
  start,
  restartAll,
  stopAll
} = require('./utils/execCommands');

module.exports = () => {
  return connect((ssh) => {
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
  });
}
