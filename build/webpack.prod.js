const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除上次打包生成的文件
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

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
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/g
            )[1];
            console.log(module.context)
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: "assets/[name].css",
    }),
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
      minRatio: 0.8,
    })
  ]
});
