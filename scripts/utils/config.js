const path = require('path'),
      _ = require('underscore');

// Your working directory
const localDirectory = path.resolve("./");

// export.
module.exports = _.defaults(require(`${localDirectory}/nextd.json`), {
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
