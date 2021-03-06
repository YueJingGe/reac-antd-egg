const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const clientPath = path.resolve(__dirname);

module.exports = {
  entry: {
    main: path.resolve(clientPath, "index.js")
  },
  output: {
    publicPath: "/",
    path: path.resolve(clientPath, "dist"),
    filename: "src/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(gif|png|jpg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(css|less|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
      // {
      //   test: /\.(css|less|scss)$/,
      //   exclude: /node_modules/,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: true,
      //         localIdentName: "[local]--[hash:base64:5]"
      //       }
      //     },
      //     "sass-loader"
      //   ]
      // },
      // {
      //   test: /\.(css|less|scss)$/,
      //   include: /node_modules/,
      //   use: ["style-loader", "css-loader", "sass-loader"]
      // }
    ]
  },
  resolve: {
    alias: {
      "@": clientPath,
      "@scss": path.resolve(clientPath, "assets/style"),
      "@assets": path.resolve(clientPath, "assets"),
      "@components": path.resolve(clientPath, "src/components"),
      "@common": path.resolve(clientPath, "src/common")
    }
  },
  devServer: {
    contentBase: path.resolve(clientPath, "dist"),
    host: "127.0.0.1",
    port: 7000,
    inline: true,
    hot: true,
    compress: true,
    open: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true
      }
    },
    historyApiFallback: true // 解决 BrowserHistory 刷新页面 404 问题
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(clientPath, "index.html"),
      filename: "index.html"
      // favicon: path.resolve(clientPath, 'assets/image/favicon.ico')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
