// webpack.config.js

const path = require('path');
var addUI = require('./addUI');

var config = {
  entry: {
    main: './src/index.js',
    weibo: './src/weibo.js',
    mail163: './src/mail.163.com.js',
    test: './src/test.js'
  },
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