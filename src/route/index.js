/*
 * @Description: 路由定义文件
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-24 21:07:56
 */
import Vue from "vue"
import VueRouter from 'vue-router'

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
  { path: "*", redirect: "/" },
  { path: "/", redirect: "/home" },
  { path: "/home", component: getAsynComponent('HomeContainer', 'navBar') },
  { path: "/member", component: getAsynComponent('MemberContainer', 'navBar') },
  { path: "/setting", component: getAsynComponent('SettingContainer', 'navBar') },
  { path: "/cart", component: getAsynComponent('ShopcarContainer', 'navBar') },
  { path: "/home/newslist", component: getAsynComponent('NewsList', 'news') },
  { path: "/home/newsinfo/:id", component: getAsynComponent('NewsInfo', 'news') },
  { path: "/home/photoeslist", component: getAsynComponent('PhotoList', 'photoes') },
  { path: "/home/photoinfo/:id", component: getAsynComponent('PhotoInfo', 'photoes') },
  { path: "/home/goodslist/", component: getAsynComponent('GoodsList', 'goods') },
  { path: "/home/goodsinfo/:id", name: "goodsinfo", component: getAsynComponent('GoodsInfo', 'goods') },
  { path: '/home/goodsdesc/:id', name: 'goodsdesc', component: getAsynComponent('GoodsDesc', 'goods') },
  { path: '/home/goodscomment/:id', name: 'goodscomment', component: getAsynComponent('GoodsComment', 'goods') }
]

// 3. 创建路由对象
const router = new VueRouter({
  mode: 'hash', //  hash | history  vue-router默认的路由模式是hash，要去掉url中的#需要将路由模式切换为 history
  routes
})


// 把路由对象暴露出去
export default router