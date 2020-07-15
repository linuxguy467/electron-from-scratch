'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/website/index.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'out/website'),
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      { test: /\.jpe?g$|\.svg$|\.gif$|\.png$/i, loader: 'url-loader' },
      { test: /\.otf$|\.woff$|\.woff2$|\.eot$|\.ttf$/, loader: 'url-loader' },
      { test: /\.ico$|_icon\.png$/i, loader: 'url-loader' },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/website/index.html',
    }),
  ],
};
