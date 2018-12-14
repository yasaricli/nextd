const connect = require('./utils/connect'),
      config = require('./utils/config');

module.exports = (name) => {
  return connect((ssh) => {
    const commands = require('./utils/execCommands');

    // run generic command
    return commands[name](ssh).then(() => {
      
      // exit.
      return ssh.dispose();
    })
  });
}
