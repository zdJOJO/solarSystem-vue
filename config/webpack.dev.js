const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const port = 3000;

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {

  devtool: "eval",  // source-map

  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    "webpack/hot/only-dev-server",
    resolve("../src/main.js") // 入口文件
  ],

  output: {
    path: resolve("../dist/js"),
    filename: "[name].[hash:8].bundle.js",
    chunkFilename: "[name].[chunkhash:5].chunk.js"  // 按需加载
  },

  resolve: {
    extensions: [".js", ".jsx", '.vue', '.css', '.scss', '.sass'],  // import ** from 时，导入可以省略文件的拓展名
    alias: {
      '@': resolve('/src')
    }
  },

  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
      { test: /\.vue$/, use: 'vue-loader' }, // 处理 .vue 文件的 loader
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: "url-loader?limit=8192"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        use: "file-loader"
      }
    ]
  },

  plugins: [

    new HtmlWebpackPlugin({
      // inject: true,
      filename: 'index.html', // 设置生成的内存页面的名称
      title: `My APPPP`,
      favicon: `public/favicon.ico`,
      template: resolve('../public/index.html'), // 指定模板文件路径
      // chunks: ["vendor", "app"]  // 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。
    }),

    new webpack.HotModuleReplacementPlugin(),

    //当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NamedModulesPlugin(),

    //在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。
    //这样可以确保输出资源不会包含错误。
    //对于所有资源，统计资料(stat)的 emitted 标识都是 false
    new webpack.NoEmitOnErrorsPlugin()
  ],

  devServer: {
    host: "127.0.0.1",
    port: port,
    hot: true,
    historyApiFallback: true,
    proxy: {
      // "/api/*": "http://127.0.0.1:7000"
    }
  }

};