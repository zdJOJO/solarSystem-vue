// 入口文件

import Vue from "vue"
import moment from "moment"
import VuePreview from 'vue-preview' /*图片预览插件*/
import infiniteScroll from "vue-infinite-scroll";  // 无限滚动


/* 按需引入element-ui */
import {
    Container,
    Header,
    Main,
    Footer,
    Menu,
    MenuItem,
    Carousel,
    CarouselItem,
    Button,
    Checkbox,
    Input,
    InputNumber,
    Backtop,
    Image,
    Card,
    Row,
    Col,
    Badge
} from 'element-ui';
import '../theme/index.css'  // 自定义主题


/* 按需引入 mint-ui */
import { Switch } from 'mint-ui';
import 'mint-ui/lib/style.css'



import store from './store';
import router from './route';
import App from "./App";
import { setVueHttpOption } from "./http"


// 挂载 mint-ui 组件
Vue.component(Switch.name, Switch)


// element-ui 全局配置
Vue.prototype.$ELEMENT = { size: 'mini' };
//  挂载 element-ui 组件
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Backtop);
Vue.use(Image);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Badge);
Vue.use(infiniteScroll); // 无限滚动


// 安装图片预览插件
Vue.use(VuePreview)

// http异步请求  全局设置
setVueHttpOption();




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