// 入口文件

import Vue from "vue"
import moment from "moment"
// import VueResource from 'vue-resource'
import VuePreview from 'vue-preview' /*图片预览插件*/
import MuitUI from "mint-ui"
import { Switch } from 'mint-ui';
import 'mint-ui/lib/style.css'
// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

import store from './store';
import router from './route';
import App from "./App";
import { setVueHttpOption } from "./http"

setVueHttpOption();

// 安装图片预览插件
Vue.use(VuePreview)

// ui
Vue.use(MuitUI)
Vue.component(Switch.name, Switch);

// 定义Vue全局过滤器 (时间转换过滤器)
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

const vm = new Vue({
    router,
    store,
    render: h => h(App)  /* 渲染根组件 */
}).$mount('#app')

// 开发环境 浏览器启用 devtools
Vue.config.devtools = process.env.NODE_ENV !== 'production';