const config = require('./config');

function Commands() {
  this.execCommand = (ssh, command) => {
    return ssh.execCommand(command, { cwd: config.remoteDirectory });
  }

  this.forever = (str) => {
    return `./node_modules/forever/bin/forever ${str}`;
  }

  this.install = (ssh) => {
    return this.execCommand(ssh, 'npm install && npm install forever && npm run build');
  }

  this.start = (ssh) => {
    return this.execCommand(ssh, this.forever(`start --uid ${config.name} -a index.js`));
  }

  this.restart = (ssh) => {
    return this.execCommand(ssh, this.forever('restartall'));
  }

  this.stop = (ssh) => {
    return this.execCommand(ssh, this.forever('stopall'));
  }

  this.list = (ssh) => {
    return this.execCommand(ssh, this.forever('list')).then((result) => {
      console.log(result.stdout);
      console.log(result.stderr);
    })
  }
}

module.exports = new Commands();
