const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const path = require("path");
const webpack = require("webpack")
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    clean: true,
    filename: 'js/[name].[contenthash:5].js',         
    chunkFilename: "[name].[contenthash:5].chunk.js",
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    open: true, 
    hot: true,
    compress: true,
    port: 8888,
  },
  stats: 'errors-only',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ]
})
