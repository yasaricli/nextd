const config = require('./config');
      _ = require('underscore');

function Commands() {
  this.execCommand = (ssh, command) => {
    return ssh.execCommand(command, { cwd: config.remoteDirectory });
  }

  this.forever = (str) => {
    let outEnv = [];

    _.each(config.env, (value, key) => {
      outEnv.push(`export ${key}=${value}`);
    })

    return `${outEnv.join(';')} && ./node_modules/forever/bin/forever ${str}`;
  }

  this.install = (ssh) => {
    return this.execCommand(ssh, 'npm install && npm install forever && npm run build');
  }

  this.start = (ssh) => {
    return this.execCommand(ssh, this.forever(`start --uid ${config.name} -a server.js`));
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

  this.logs = (ssh) => {
    return this.execCommand(ssh, this.forever(`logs ${config.name}.js`)).then((result) => {
      console.log(result.stdout);
      console.log(result.stderr);
    })
  }


  this.generateIndexFile = (ssh) => {
    const file = `
      const { createServer } = require('http');
      const { parse } = require('url');
      const next = require('next');

      const app = next({ dev: false });
      const handle = app.getRequestHandler();

      app.prepare().then(() => {
        return createServer((req, res) => {
          const parsedUrl = parse(req.url, true);

          return handle(req, res, parsedUrl);
        }).listen(${config.port}, err => {
          if (err) throw err
          console.log('> Ready ${config.name} on http://localhost:${config.port}');
        })
      })
    `;

    return ssh.execCommand(`[ -f ${config.remoteDirectory}/server.js ] && echo "Server File exist" || echo -n "${file}" > server.js`, {
      cwd: config.remoteDirectory
    });
  }
}

module.exports = new Commands();
