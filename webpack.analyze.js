const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const SOURCE = path.resolve(__dirname, 'src');
const DIST = path.resolve(__dirname, 'docs');
module.exports = {
  mode: 'production',
  entry: path.join(SOURCE, 'index'),

  output: {
    filename: 'bundle.js',
    path: DIST,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  module: {
    rules: [
      {test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
    ],
  },

  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(SOURCE, 'index.html'),
    }),
  ],
};
