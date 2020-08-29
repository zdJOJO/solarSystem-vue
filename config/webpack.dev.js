/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-21 00:19:26
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-29 12:01:14
 */
const path = require("path");
const port = 3000;
const webpack_defined = require('./until.js');


module.exports = {

  devtool: "cheap-module-eval-source-map", // source-map

  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    "webpack/hot/only-dev-server",
    path.join(__dirname, "../src/main.js") // 入口文件
  ],

  output: {
    path: path.join(__dirname, "../dist/js"),
    filename: "[name].[hash:8].bundle.js",
    chunkFilename: "[name].[chunkhash:5].chunk.js" // 按需加载
  },

  devServer: {
    host: "127.0.0.1",
    port: port,
    hot: true,
    historyApiFallback: true,
    proxy: {
      // "/api/*": "http://127.0.0.1:7000"
    }
  },

  externals: webpack_defined.webpack_externals,

  resolve: webpack_defined.webpack_resolve,

  module: webpack_defined.webpack_module_dev,

  plugins: webpack_defined.webpack_plugins_dev

};