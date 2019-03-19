const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const SOURCE = path.resolve(__dirname, 'src');
const DIST = path.resolve(__dirname, 'docs');
module.exports = {
  mode: 'development',
  entry: path.join(SOURCE, 'index'),

  output: {
    filename: 'bundle.js',
    path: DIST,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    port: 3000,
  },

  module: {
    rules: [
      {test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(SOURCE, 'index.html'),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
