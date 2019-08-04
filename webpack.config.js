// webpack.config.js

const path = require('path');
var addUI = require('./addUI');

var config = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new addUI({options: true})
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