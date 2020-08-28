/*
 * @Description: 项目入口文件
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 16:30:46
 */

import Vue from "vue"
import { sync } from 'vuex-router-sync'
import moment from "moment"
import VuePreview from 'vue-preview' /*图片预览插件*/
import VueLazyLoad from 'vue-lazyload' /*图片懒加载*/
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import NutSwiper from '@nutui/nutui/dist/packages/swiper/swiper.js';  // 加载构建后的JS
import '@nutui/nutui/dist/packages/swiper/swiper.css';  //加载构建后的CSS

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
	Badge,
	Tabs,
	TabPane,
	Tag
} from 'element-ui';
import '../theme/index.css' // 自定义主题

import '@nutui/nutui/dist/nutui.css';

import '../public/css/index'; // css全局设置

import store from './store';
import router from './route';
import App from "./App";
import axios from "./httpConfig/http";


Vue.use(VuePreview);
Vue.use(VueLazyLoad, {
	preLoad: 1.3,
	error: 'public/images/error.jpg',
	loading: 'public/images/loading.gif',
	attempt: 2
});

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
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);

// 自定义http 添加 Vue 的实例中
Vue.prototype.$http = axios;

// 按需加载 Vuex 模块 插件
// Vue.use(lazyLoadVuexModule)

NutSwiper.install(Vue);


// 全局注册 base组件
const requireComponent = require.context(
	// 其组件目录的相对路径
	'./components/base',
	// 是否查询其子目录
	false,
	// 匹配基础组件文件名的正则表达式
	/Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
	// 获取组件配置
	const componentConfig = requireComponent(fileName)

	// 获取组件的 PascalCase 命名
	const componentName = upperFirst(
		camelCase(
			// 获取和目录深度无关的文件名
			fileName
				.split('/')
				.pop()
				.replace(/\.\w+$/, '')
		)
	)

	// 全局注册组件
	Vue.component(
		componentName,
		// 如果这个组件选项是通过 `export default` 导出的，
		// 那么就会优先使用 `.default`，
		// 否则回退到使用模块的根。
		componentConfig.default || componentConfig
	)
});


/*
 @desctiption: 定义Vue全局过滤器 (时间转换过滤器)
 @user:  {{ a.time |  dateFormat }}
*/
Vue.filter('dateFormat', (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") => moment(dataStr).format(pattern));

// 将router的状态绑定到 vuex 中
sync(store, router)

const vm = new Vue({
	router,
	store,
	render: h => h(App) /* 渲染根组件 */
}).$mount('#app')

// 开发环境 浏览器启用 devtools
Vue.config.devtools = process.env.NODE_ENV !== 'production';