const path = require('path'),
      config = require('./config');

module.exports = (itemPath) => {
  const name = path.basename(itemPath); // file name.

  return !~config.ignoreFiles.indexOf(name);
}
