const config = require('./config');

const execCommand = (ssh, command) => {
  return ssh.execCommand(command, { cwd: config.remoteDirectory });
}

module.exports = {
  install(ssh) {
    return execCommand(ssh, 'npm install && npm install forever && npm run build');
  },

  start(ssh) {
    return execCommand(ssh, './node_modules/forever/bin/forever start -a index.js');
  },

  restartAll(ssh) {
    return execCommand(ssh, './node_modules/forever/bin/forever restartall');
  },

  stopAll(ssh) {
    return execCommand(ssh, './node_modules/forever/bin/forever stopall');
  }
}
