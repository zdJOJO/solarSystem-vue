/*
 * @Description:  全局公共变量
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-23 21:28:25
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-25 22:21:28
 */

import { Message } from 'element-ui';

export const themeColor = "#ffd000"; // 主题颜色
export const fontSize = "14px";
export const fontColor = "#303133"; // 字体颜色
export const defaultColor = "#606266";
export const defauCommentCount = 3;
export const fontStyle = {
  color: "#303133",
  fontSize: "14px",
};
export const cartBallTrasformTime = 600;  // 商品模块 加入购物车小球特效变换时间 单位:毫秒

// route path
export const ROUTE_PATH = {
  HOME: '/home',
  MEMBER: '/member',
  SETTING: '/setting',
  CART: '/cart',
  LOCATION: '/location',
  HOME_NEWS: '/home/news',
  HOME_NEWS_ID: '/home/news/:id',
  HOME_PHOTOES: '/home/photoes',
  HOME_PHOTOE_INFO_ID: '/home/photoinfo/:id',
  HOME_GODDS: '/home/goods',
  HOME_GODDS_INOF_ID: {
    path: '/home/goodsinfo:id',
    name: 'goodsinfo'
  },
  HOME_GODDS_DETAIL_ID: {
    path: '/home/goodsdesc/:id',
    name: 'goodsdesc'
  },
  HOME_GODDS_COMMENT_ID: {
    path: '/home/goodscomment/:id',
    name: 'goodscomment'
  }
}

// nav 导航
export const navs = [
  {
    name: "首页",
    routePath: ROUTE_PATH.HOME,
    icon: "s-home",
    activeIcon: "platform-eleme",
  },
  {
    name: "位置",
    routePath: ROUTE_PATH.LOCATION,
    icon: "location-outline",
    activeIcon: "location",
  },
  {
    name: "购物包",
    routePath: ROUTE_PATH.CART,
    icon: "goods",
    activeIcon: "s-goods",
    ball: true,
  },
  {
    name: "我的",
    imgName: "member",
    routePath: ROUTE_PATH.MEMBER,
    icon: "user",
    activeIcon: "user-solid",
  },
];

// 首页菜单
export const menus = [
  {
    name: "今日要闻",
    routePath: ROUTE_PATH.HOME_NEWS,
    imgName: "menu1.svg",
  },
  {
    name: "美食/购物",
    routePath: ROUTE_PATH.HOME_GODDS,
    imgName: "menu2.svg",
  },
  {
    name: "旅游分享",
    routePath: ROUTE_PATH.HOME_PHOTOES,
    imgName: "menu3.svg",
  },
  {
    name: "电影/演出",
    routePath: "#",
    imgName: "menu4.svg",
  },
  {
    name: "谈天说地",
    routePath: "#",
    imgName: "menu5.svg",
  },
  {
    name: "联系我们",
    routePath: "#",
    imgName: "menu6.svg",
  },
  {
    name: "评论",
    routePath: "#",
    imgName: "menu5.svg",
  },
];

// 按需动态注册 Vuex module 的插件
export const lazyLoadVuexModule = {
  //install一个方法，使其在vue中注册使用
  install: function (vue) {
    //mixin全局混入我们的定义，在beforeCreate钩子中调用
    vue.mixin({
      // created下vue实例已经生成了
      beforeCreate: function () {
        //判断当前组件、视图下是否需要加载我们的vuex
        if (this.$options.isLazy) {
          //加载逻辑处理
          let moduleName = this.$options.moduleName;
          let moduleObj = this.$store._modules.root._children;
          let onoff = true;
          Object.keys(moduleObj).forEach(function (key) {
            if (key === name) {
              onoff = false;    //避免重复注册
            }
          });
          if (onoff) {
            // 动态引入 res就是我们import的文件中暴露出来的
            let module = require(`./store/modules/${moduleName}`);
            this.$store.registerModule(moduleName, module.default);
          }
        }
      },
    });
  },
};


// toast 定义
export const resMsg = (message, type = 'error') => {
  Message({
    message,
    type,
    showClose: true,
    center: true,
    duration: 1500,
    offset: 60,
    customClass: "myMsg"
  })
};