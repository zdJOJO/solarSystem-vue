/*
 * @Description:  全局公共变量
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-23 21:28:25
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-24 17:47:51
 */

export const themeColor = "#ffd000"; // 主题颜色
export const fontSize = "14px";
export const fontColor = "#303133";
export const defauCommentCount = 3;
export const fontStyle = {
  color: "#303133",
  fontSize: "14px",
};
export const cartBallTrasformTime = 600;  // 商品模块 加入购物车小球特效变换时间 单位:毫秒

// nav 导航
export const navs = [
  {
    name: "首页",
    routePath: "/home",
    icon: "eleme",
    activeIcon: "platform-eleme",
  },
  {
    name: "会员",
    imgName: "member",
    routePath: "/member",
    icon: "user",
    activeIcon: "user-solid",
  },
  {
    name: "购物车",
    routePath: "/cart",
    icon: "goods",
    activeIcon: "s-goods",
    ball: true,
  },
  {
    name: "设置",
    routePath: "/setting",
    icon: "setting",
    activeIcon: "s-tools",
  },
];

// 首页菜单
export const menus = [
  {
    name: "新闻资讯",
    routePath: "/home/newslist",
    imgName: "menu1.png",
  },
  {
    name: "商品购买",
    routePath: "/home/goodslist",
    imgName: "menu1.png",
  },
  {
    name: "视频专区",
    routePath: "#",
    imgName: "menu2.png",
  },
  {
    name: "图片分享",
    routePath: "#",
    imgName: "menu3.png",
  },
  {
    name: "留言反馈",
    routePath: "#",
    imgName: "menu4.png",
  },
  {
    name: "联系我们",
    routePath: "#",
    imgName: "menu5.png",
  },
];