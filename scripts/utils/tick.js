const colors = require('colors');

module.exports = (localPath, remotePath, error) => {
  if (error) {
    return console.log(colors.red(localPath));
  }

  return console.log(colors.green(localPath));
}
