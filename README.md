# 介绍
一个移动端vue项目脚手架：vue + vue-route + vuex

# 主要用用到包

1. 视图框架

    ["vue"](https://cn.vuejs.org/v2/guide/) :  "^2.5.2"

    ["vue-router"](https://router.vuejs.org/zh/) : "^3.0.1"

    ["vuex"](https://vuex.vuejs.org/zh/guide/) :  "^3.1.1"

2. http 异步请求框架

    ["axios"](http://www.axios-js.com/zh-cn/docs/index.html#axios-url-config) :  "^0.20.0"

3. UI库

    [element-ui](https://element.eleme.cn/#/zh-CN/component/upload): "^2.13.2"

    ["mint-ui"](http://mint-ui.github.io/) : "^2.2.9"

4. 打包工具

    ["webpack"](https://www.webpackjs.com/concepts/) :  "^3.8.1"


# Usage

`# step 1 安装包`

`npm install`

`# step 2 开发环境运行 `

`npm start`

`# step 3 生产环境项目打包`

`npm run build`


# 一些问题
#### 1. 使用 Vue 的异步组件和 webpack 的代码分割功能， 来实现路由组件的懒加载时，会出错。

```
具体描述：

情况一：

          1. 将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身.

          const Foo = () => Promise.resolve({ /* 组件定义对象 */ })

          2. 在 Webpack 2 以上 中，我们可以使用动态 import语法来定义代码分块点.

          const Foo = () => import('./Foo.vue')
          const router = new VueRouter({
            routes: [
              { path: '/foo', component: Foo }
            ]
          })

          注意:
          如果使用的是 Babel，你将需要添加 syntax-dynamic-import 插件，才能使 Babel 可以正确地解析语法。
          并且在 .babelrc 文件的 "plugins" 中加入 babel-plugin-syntax-dynamic-import ， 
          如果wenpack版本大于3，则写成 @babel/plugin-syntax-dynamic-import

          3. 但是在实际应用中， 并不需要将vue中的component封装成Promise对象也可以实现路由的按需加载。

情况二：
          1. 为了使得chunkFilename的命名成为变量， 通过函数实现动态import()导入。

          const getAsynComponent = (componentName, secondDirectory) => import(/* webpackChunkName: "[request]" */`./components/${secondDirectory}/${componentName}`);
          
          使用[request]来告诉webpack，这里的值是根据后面传入的字符串来决定，本例中就是变量pathName的值.。

          报错：[Vue warn]: Failed to mount component: template or render function not defined.

          解决方法：
          const getAsynComponent = (componentName, secondDirectory) => () => import(/* webpackChunkName: "[request]" */`./components/${secondDirectory}/${componentName}`)
```



#### 2. vue-devtools 在开发环境时，浏览器扩展程序不显示或者失效。
```
解决方法：

官方建议在项目入口文件（main.js）引入：

Vue.config.devtools = true;

``` 





# 文件目录结构

