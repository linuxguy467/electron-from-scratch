'use strict';

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/electron/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'out/electron'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: 'electron-main',
  node: {
    __dirname: false,
  },
};
