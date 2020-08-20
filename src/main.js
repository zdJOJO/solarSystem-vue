// 入口文件


import Vue from "vue"
import Vuex from 'vuex'
import moment from "moment"
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
import VuePreview from 'vue-preview' /*图片预览插件*/
// 按需导入 Mint-UI 中的组件
/*import {Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)//显示顶部区域
Vue.component(Swipe.name, Swipe);//展示首页轮播图组件
Vue.component(SwipeItem.name, SwipeItem);//展示首页轮播图组件
Vue.component(Button.name, Button);//展示按钮
Vue.use(Lazyload);// 图片区域的懒加载 */
import MuitUI from "mint-ui"
import { Switch } from 'mint-ui';
import 'mint-ui/lib/style.css'
// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

import App from "./App"
import router from "./router" /* 路由模块 */




//安装路由
Vue.use(VueRouter)

// 安装 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
// 全局设置 post 时候表单数据格式组织形式(省得每次手写了)   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 安装图片预览插件
Vue.use(VuePreview)

// 安装ui
Vue.use(MuitUI)
Vue.component(Switch.name, Switch);

// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中把购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

// store
Vue.use(Vuex)
const store = new Vuex.Store({
    //相当于Vue中的data
    state: {// this.$store.state.***
        car: car
    },

    //相当于Vue中的methods
    //每个方法都是固定写法： 方法名(state,别的组件调方法时传过来的参数)
    mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
        //商品详情中加入购物车
        addToCar(state, goodsinfo){

            //默认没有加入购物车
            var flag = false;

            //1. 加购物车前，先看购物车有没有这个商品，有的话更新数量
            state.car.forEach(item => {
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                }
            });
            //2. 没有的话，加入购物车
            if(flag == false){
                state.car.push(goodsinfo);
            }
            //3. 当购物车更新完毕后，把购物车存储到本地的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        //当购物车中的数量发生变化的时候，store中的数量也得改
        updateGoodsInfo(state,goodsinfo) {
            state.car.forEach(item => {
                if(item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                }
                localStorage.setItem('car',JSON.stringify(state.car));
            })
        },
        //更新开关的状态信息
        updateGoodsSelected(state,selectedinfo) {
            state.car.forEach(item => {
                if(item.id == selectedinfo.id) {
                    item.selected = selectedinfo.selected
                }
                localStorage.setItem('car',JSON.stringify(state.car));
            })
        },
        //从购物车中删除商品
        removeFormCar(state,id) {
            state.car.some((item,i) => {
                if(item.id == id) {
                    state.car.splice(i,1);//从购物车中删除指定商品
                    return true;
                }
            });
            //3. 当购物车更新完毕后，把购物车存储到本地的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car));
        }
    },

    //相当于过滤器filters,也相当于计算属性
    getters: {// this.$store.getters.***
        //当点击加入购物车后，购物车数量随之发生变化
        getGoodsCount(state) {
            var c = {};
            state.car.forEach(item => {
                c[item.id] = parseInt(item.count)
            })
            return c;
        },

        //计算购物车中的所有商品 总数量和总价
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if(item.selected){
                    o.count += item.count;
                    o.amount += item.count * item.price;
                }
            })
            console.log(o)
            return o;
        },

        //获取购物车中商品是否被选中的状态
        getGoodsSelected(state) {
            var s = {}
            state.car.forEach(item => {
                s[item.id] = item.selected
            })
            return s;
        },

        //获取购物车中的所有商品数量
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            });
            return c
        }
    }
})

// 定义Vue全局过滤器 (时间转换过滤器)
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

const vm = new Vue({
    render: h => h(App),  /* 渲染根组件 */
    router,
    store
}).$mount('#app')

Vue.config.devtools = true;  // 开发环境 浏览器启用 devtools