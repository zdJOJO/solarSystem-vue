const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

if (process.env.NODE_ENV !== "production") {
  throw new Error(' Production builds must have NODE_ENV=production ');
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

const PATH = resolve("../dist/js");
// const PUBLIC_PATH = "./js/";
const PUBLIC_PATH = './js/';


module.exports = {

  devtool: "source-map",  // source-map  文档： https://www.webpackjs.com/configuration/devtool/

  entry: {
    // 多页面入口
    app: resolve('../src/main.js')
  },

  output: {
    path: PATH,
    publicPath: PUBLIC_PATH,  // publicPath：访问时文件的目录， 打包的js
    filename: "[name].[hash:8].bundle.js",
    chunkFilename: "[name].[chunkhash:5].chunk.js"  // 按需加载
  },

  resolve: {
    extensions: [".js", ".jsx", '.vue', '.css', '.scss', '.sass', '.svg'],  // import ** from 时，导入可以省略文件的拓展名
    alias: {
      '@': resolve('../src')
    }
  },

  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
      { test: /\.vue$/, use: 'vue-loader' }, // 处理 .vue 文件的 loader
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
            }
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            "less-loader"
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            "sass-loader"
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        //name 字段指定了在打包根目录（output.path）下生成名为 img 的文件夹，并在原图片名前加上8位 hash 值
        use: "url-loader?name=images/[hash:8].[name].[ext]&limit=8192"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        use: "file-loader?name=fonts/[hash:8].[name].[ext]"
      }
    ]
  },

  plugins: [

    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    // 和DllReferencePlugin配套使用 在webpack.dll.config.js中打包生成的dll文件引用到需要的预编译的依赖上来
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("../dist/manifest.json")
    }),

    new HtmlWebpackPlugin({
      inject: true,
      minify: {               // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      title: `我的APP`,
      filename: resolve("../dist/index.html"),
      favicon: resolve("../public/favicon.ico"),
      template: resolve('../public/templete.ejs'), // 指定模板文件路径, 使用ejs模板语法
      chunks: ["app"],  // 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。
      // insertJs: [`${PUBLIC_PATH}vendor_dll.js`]
      insertJs: [`${PUBLIC_PATH}vendor_dll.js`]
    }),

    // 公共组件抽离
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common', // bundle 名称
    //   filename: "[name].[hash:8].js"
    // }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,  // 最紧凑的输出
      comments: false,        //去掉注释
      compress: {
        warnings: false,  //忽略警告,要不然会有一大堆的黄色字体出现
        drop_console: true, // 删除所有的 `console` 语句
        collapse_vars: true, // 内嵌定义了但是只用到一次的变量
        reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
      },
      except: ["$super", "$", "exports", "require"]    //排除关键字
    }),

    //调整模块的打包顺序，用到次数更多的会出现在文件的前面
    new webpack.optimize.OccurrenceOrderPlugin(),

    // 将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件
    new ExtractTextPlugin({
      filename: "[name].[contenthash].css",
      disable: false,
      allChunks: true
    }),

    // 用于优化或者压缩CSS资源 和 ExtractTextPlugin 一起使用
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),

    new webpack.NoEmitOnErrorsPlugin()
  ]
};