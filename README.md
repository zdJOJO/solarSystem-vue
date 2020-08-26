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

```
如果 node-sass 安装发生错误   npm安装包源改为淘宝镜像  npm config set registry https://registry.npm.taobao.org

再次  npm install

```
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
```
.
|-- README.md
|-- config      webpack配置文件夹
|-- package.json
|-- public      静态文件夹
|-- src
|   |-- App.vue
|   |-- components
|   |   |-- cart     页面组件
|   |   |-- goods    页面组件
|   |   |-- navBar   页面组件
|   |   |-- news     页面组件
|   |   |-- photoes  页面组件
|   |   `-- publicComponents     公共组件
|   |-- global.js      全局变量
|   |-- httpConfig     http异步请求
|   |   |-- api.js
|   |   `-- http.js
|   |-- main.js    入口文件
|   |-- route     
|   |   `-- index.js   路由定义
|   `-- store        vuex store 定义
|       |-- actions
|       |   `-- index.js
|       |-- index.js
|       |-- modules
|       `-- template.js
`-- theme      element-ui自定义主题文件夹
```




# 前端项目部署

1. 购买云服务器（以 Linux CentOS 7.3.1611 64bit 为例）

2. 服务器安装`git`:

    `yum install git`

3. 安装 `node`:

    `yum install -y wget`

    `wget https://nodejs.org/dist/v10.13.0/node-v10.13.0-linux-x64.tar.xz  // node安装包 ` 

    `xz -d node-v10.13.0-linux-x64.tar.xz  //解压 step-1`  

    `tar -xf node-v10.13.0-linux-x64.tar  //解压2 step-2` 

    `ln -s /home/node/node-v10.13.0-linux-x64/bin/node /usr/local/bin/node  // 配置node`
    
    `ln -s /home/node/node-v10.13.0-linux-x64/bin/npm /usr/local/bin/npm   // 配置npm `


4. 安装`nginx` 

    ` yum -y install gcc gcc-c++  //依赖包`

    ` yum install -y pcre pcre-devel //依赖包`

    ` yum install -y zlib zlib-devel //依赖包`

    ` yum install -y openssl openssl-devel //依赖包`

    `wget -c https://nginx.org/download/nginx-1.10.1.tar.gz   // 下载nginx包` 

    `tar -zxvf nginx-1.10.1.tar.gz   // 解压安装包`

    ` cd nginx-1.10.1  // 进入安装包`

```
    执行三个命令:

    ./configure
      
    make

    make install

    切换到/usr/local/nginx安装目录:

    cd /usr/local/nginx/conf

    配置nginx的配置文件nginx.conf文件:  
    
    vi nginx.conf

    切换目录到/usr/local/nginx/sbin下面, 启动nginx服务:
    ./nginx



```
  

  

