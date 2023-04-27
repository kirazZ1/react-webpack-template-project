const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const WebpackBar = require("webpackbar");
const isDevelopment = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log(process.env.NODE_ENV);
module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".css"],
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  entry: {
    app: [path.join(__dirname, "../src/main.tsx")],
  },
  module: {
    rules: [
      {
        test: /.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          "thread-loader",
          {
            loader: "swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDevelopment,
                    refresh: isDevelopment,
                  },
                },
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isDevelopment ? "style-loader" : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: isDevelopment ? {} : {
            maxSize: 1 * 1024,
          },
        },
        generator: {
          filename: "images/[name].[contenthash:5][ext]",
        },
      },
    ],
  },
  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, "../.temp_cache"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "../dist/index.html",
      hash: true,
      template: path.resolve(__dirname, "../index.html"),
      inject: true,
    }),
    new WebpackBar(),
  ],
};
