const webpack = require('webpack');

const path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2

const libraryName = 'redux-local-state';
let outputFile = libraryName + '.js';


const config = {
  entry: __dirname + '/redux-local-state/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
            presets: ['stage-2']
        }
      },
    ]
  },
  resolve: {
    extensions: ['.json', '.js']
  },
};

module.exports = config;