const ora = require('ora');

const connect = require('./utils/connect'),
      commands = require('./utils/execCommands'),
      config = require('./utils/config');

module.exports = (name) => {
  const spinner = ora();

  spinner.start('Connection to your server...');

  return connect((ssh) => {

    spinner.succeed('Connection successful!');
    spinner.start(`Run ${name} command..`);

    // run generic command
    return commands[name](ssh).then(() => {
      spinner.succeed(`${name} successful!`);

      return commands.list(ssh).then(() => {

        // stop spinner.
        spinner.stop();

        // exit.
        return ssh.dispose();
      })
    })
  });
}
