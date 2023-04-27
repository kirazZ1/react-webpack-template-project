const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除上次打包生成的文件
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common,{
  mode: "production", 
  devtool: false,
  output: {
    clean: true,
    filename: 'js/[name].[contenthash:5].js',         
    chunkFilename: "[name].[contenthash:5].chunk.js",
    publicPath: '/',
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    runtimeChunk: true,
    minimizer: [new TerserPlugin({
      minify: TerserPlugin.swcMinify, 
      extractComments: false,
    })],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins:[
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ]
});
