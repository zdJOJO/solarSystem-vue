/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-27 22:16:31
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-31 12:03:17
 * @FilePath: \solarSystem-vue\config\until.js
 */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const PUBLIC_PATH = './js/';

const webpack_defined = {

  webpack_resolve: {
    extensions: [".js", ".jsx", '.vue', '.css', '.scss', '.sass', '.svg'], // import ** from 时，导入可以省略文件的拓展名
    alias: {
      '@': path.join(__dirname, '../src')
    }
  },

  webpack_externals: {
    "BMap": "BMap"
  },

  webpack_module_dev: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }, // 配置 Babel 来转换高级的ES语法
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }, // 处理 .vue 文件的 loader
      {
        test: /\.css$/,
        use: [
          "style-loader",
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          'css-loader',
          "less-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: "url-loader?limit=8192"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        use: "file-loader"
      }
    ]
  },

  webpack_module_pro: {
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
                minimize: true,
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true,
                importLoaders: 2
              }
            },
            'postcss-loader',
            "sass-loader"
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true,
                importLoaders: 2
              }
            },
            'postcss-loader',
            "less-loader"
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

  webpack_plugins_dev: [
    new HtmlWebpackPlugin({
      // inject: true,
      filename: 'index.html', // 设置生成的内存页面的名称
      title: `一个简单的demo`,
      // favicon: `public/favicon.ico`,
      template: path.join(__dirname, '../public/index.html'), // 指定模板文件路径
      // chunks: ["vendor", "app"]  // 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。
    }),

    new webpack.HotModuleReplacementPlugin(),

    //当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NamedModulesPlugin(),

    //在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。
    //这样可以确保输出资源不会包含错误。
    //对于所有资源，统计资料(stat)的 emitted 标识都是 false
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // bundle 名称
    })
  ],

  webpack_plugins_pro: [
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new HtmlWebpackPlugin({
      inject: true,
      minify: {               // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      title: `Solar System`,
      filename: path.join(__dirname, "../dist/index.html"),
      favicon: path.join(__dirname, "../public/favicon.ico"),
      template: path.join(__dirname, '../public/templete.ejs'), // 指定模板文件路径, 使用ejs模板语法
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

}


module.exports = webpack_defined;