const ora = require('ora'),
      colors = require('colors');

// putDirectory Option functions.
const validate = require('./utils/validate');

const connect = require('./utils/connect'),
      config = require('./utils/config');

// commands
const {
  install,
  start,
  restart,
  stop,
  generateIndexFile
} = require('./utils/execCommands');

module.exports = () => {
  const spinner = ora();

  // start
  spinner.start('Deploying own server');

  return connect((ssh) => {

    return ssh.putDirectory(config.localDirectory, config.remoteDirectory, {
      recursive: true,
      validate,
      tick(localPath, remotePath, error) {

        if (error) {
          spinner.text = colors.red(`sending ${localPath} file`);
          return;
        }

        spinner.text = colors.green(`sending ${localPath} file`);
      }
    }).then((status) => {
      if (status) {

        // success
        spinner.succeed('The project transfer was successful!');
        spinner.start('Installing npm packages');

        // install and start
        install(ssh).then((installResult) => {

          spinner.succeed('Npm packages install successful!');
          spinner.start('Stoped your application...');

          generateIndexFile(ssh).then(() => {

            // StopAll
            stop(ssh).then(() => {
              spinner.succeed('Stoped successful!');
              spinner.start('Starting application');

              // start
              start(ssh).then((startResult) => {

                spinner.succeed('Started successful!');
                spinner.stop();

                return ssh.dispose();
              })
            })
          })
        })
      }
    })
  });
}
