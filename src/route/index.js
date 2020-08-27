/*
 * @Description: 路由定义文件
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-27 14:06:47
 */
import Vue from "vue"
import VueRouter from 'vue-router'
import { ROUTE_PATH } from '../global';

//挂载路由
Vue.use(VueRouter)


/**
 * @description: 按需加载组件
 * @param {componentName: String 组件名, secondDirectory: String 二级目录} 
 * @return {type: Promise型的Component} 
 * @author: zhangding
 */
const getAsynComponent = (componentName, secondDirectory) => {
  // 写成 siwtch 函数 而不是直接用 secondDirectory 来代替， 是为了 webpackChunkName 只有一级而更加雅观
  switch (secondDirectory) {
    case "navBar": return () => import(/* webpackChunkName: "[request]" */`../components/navBar/${componentName}`);
    case "news": return () => import(/* webpackChunkName: "[request]" */`../components/news/${componentName}`)
    case "photoes": return () => import(/* webpackChunkName: "[request]" */`../components/photoes/${componentName}`)
    case "goods": return () => import(/* webpackChunkName: "[request]" */`../components/goods/${componentName}`)
    default: return undefined;
  }
};
const routes = [

  { path: "*", redirect: ROUTE_PATH.HOME, meta: { index: 0 } },
  { path: ROUTE_PATH.HOME, component: getAsynComponent('Home', 'navBar'), meta: { index: 0, type: "nav" } },
  { path: ROUTE_PATH.LOCATION, component: getAsynComponent('Location', 'navBar'), meta: { index: 1, type: "nav" } },
  { path: ROUTE_PATH.CART, component: getAsynComponent('Cart', 'navBar'), meta: { index: 2, type: "nav" } },
  { path: ROUTE_PATH.MEMBER, component: getAsynComponent('Member', 'navBar'), meta: { index: 3, type: "nav" } },

  { path: ROUTE_PATH.HOME_NEWS, component: getAsynComponent('NewsList', 'news'), meta: { index: 4, type: "menu" } },
  { path: ROUTE_PATH.HOME_GODDS, component: getAsynComponent('GoodsList', 'goods'), meta: { index: 5, type: "menu" } },
  { path: ROUTE_PATH.HOME_PHOTOES, component: getAsynComponent('PhotoList', 'photoes'), meta: { index: 6, type: "menu" } },
  
  { path: ROUTE_PATH.HOME_NEWS_ID, component: getAsynComponent('NewsInfo', 'news'), meta: { index: 7 } },
  { path: ROUTE_PATH.HOME_PHOTOE_INFO_ID, component: getAsynComponent('PhotoInfo', 'photoes'), meta: { index: 8 } },
  { path: ROUTE_PATH.HOME_GODDS_INOF_ID.path, name: ROUTE_PATH.HOME_GODDS_INOF_ID.name, component: getAsynComponent('GoodsInfo', 'goods'), meta: { index: 9 } },
  { path: ROUTE_PATH.HOME_GODDS_DETAIL_ID.path, name: ROUTE_PATH.HOME_GODDS_DETAIL_ID.name, component: getAsynComponent('GoodsDesc', 'goods'), meta: { index: 10 } },
  { path: ROUTE_PATH.HOME_GODDS_COMMENT_ID.path, name: ROUTE_PATH.HOME_GODDS_COMMENT_ID.name, component: getAsynComponent('GoodsComment', 'goods'), meta: { index: 11 } }
]

// 3. 创建路由对象
const router = new VueRouter({
  // mode: process.env.NODE_ENV !== 'production' ? 'hash' : 'history', //  hash | history  vue-router默认的路由模式是hash，要去掉url中的#需要将路由模式切换为 history
  routes
})


// 把路由对象暴露出去
export default router