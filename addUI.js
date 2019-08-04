const fs = require('fs');

function addUI(options) {}
addUI.prototype.apply = function (compiler) {
  compiler.plugin('emit', function (compilation, callback) {
    fs.readFile(__dirname + "/src/index.js", 'utf8', (err, data) => {
      if (err) throw err;
      if (/['"]ui['"]/.test(data)) {
        console.log('包含"ui"')
        compilation.assets['main.js']._value = '"ui";' + compilation.assets['main.js']._value
      } else {
        console.log('不包含"ui"')
      }
      callback();
    });
  });
};
module.exports = addUI;
