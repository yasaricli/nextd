const fs = require('fs-extra'),
      colors = require('colors'),
      path = require('path');

// Your working directory
const localDirectory = path.resolve("./");

module.exports = () => {
  fs.copy(path.resolve(__dirname, '../defaultNextd.json'), `${localDirectory}/nextd.json`).then(() => {
    return console.log(colors.yellow('Successfully nextd.json file created.\n'));
  })
}
