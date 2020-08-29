/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-21 00:21:46
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-29 12:01:30
 * @FilePath: \vue-demo\config\webpack.prod.js
 */
const path = require("path");
const webpack = require("webpack");
const webpack_defined = require('./until.js');

if (process.env.NODE_ENV !== "production") {
  throw new Error(' Production builds must have NODE_ENV=production ');
}

const PATH = path.join(__dirname, "../dist/js");
const PUBLIC_PATH = './js/';

module.exports = {

  devtool: "source-map",  // 文档： https://www.webpackjs.com/configuration/devtool/

  entry: {
    // 多页面入口
    app: path.join(__dirname, '../src/main.js')
  },

  output: {
    path: PATH,
    publicPath: PUBLIC_PATH,  // publicPath：访问时文件的目录， 打包的js
    filename: "[name].[hash:8].bundle.js",
    chunkFilename: "[name].[chunkhash:5].chunk.js"  // 按需加载
  },

  externals: webpack_defined.webpack_externals,

  resolve: webpack_defined.webpack_resolve,

  module: webpack_defined.webpack_module_pro,

  plugins: webpack_defined.webpack_plugins_pro.concat(

    // 和DllReferencePlugin配套使用 在webpack.dll.config.js中打包生成的dll文件引用到需要的预编译的依赖上来
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("../dist/manifest.json")
    })
  )
};