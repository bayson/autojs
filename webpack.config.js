// webpack.config.js

const path = require('path');
const glob = require('glob');

var addUI = require('./addUI');

// let  entry = getEntry('./src/work/**.js');

function getEntry(globPath, options) {
  options = options || {};
  var entries = {},
      basename, tmp, pathname;

  glob.sync(globPath, options).forEach(function (entry) {
      pathname = entry.replace(/\.js$/,'').replace(/^\.\/src\/work\//,'');
      let fpath = entry;
      if(options.cwd){
          fpath = path.join(options.cwd, entry);
      }
      entries[pathname] = [fpath];
  });
  return entries;
}

var config = {
  // entry: getEntry('./src/work/*.js'),
  entry: getEntry('./src/work/微博-删除重复微博.js'),
  output: {
    // filename: 'main.js',
    //注意：使用[name]确保每个文件名都不重复
    filename: '[name].js',
    // filename: '[name]-[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new addUI({ options: true })
  ]
};



module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};