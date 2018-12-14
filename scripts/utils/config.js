const path = require('path'),
      shell = require('shelljs'),
      _ = require('underscore');

// Your working directory
const localDirectory = path.resolve("./");
      nextdConfigFilePath = `${localDirectory}/nextd.json`;

// export.
module.exports = _.defaults(shell.test('-f', nextdConfigFilePath) ?
  require(`${localDirectory}/nextd.json`) : {}, {
  name: null,
  host: null,
  port: 3000,
  username: null,
  privateKey: null,
  remoteDirectory: null,
  ignoreFiles: [
    ".git",
    ".gitignore",
    ".next",
    ".DS_Store",
    "node_modules"
  ],
  localDirectory
});
