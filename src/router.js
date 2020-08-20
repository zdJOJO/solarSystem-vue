import VueRouter from 'vue-router'

const tarPulicPath = `./components/tabbar/`;
const newsPulicPath = `./components/news/`;
const photosPulicPath = `./components/photos/`;
const goodsPulicPath = `./components/goods/`;

/* 结合 Vue 的异步组件 和 Webpack 的代码分割功能，实现路由组件的懒加载 */
const HomeContainer = () => import(/* webpackChunkName: "HomeContainer" */ tarPulicPath + 'HomeContainer');
const MemberContainer = () => import(/* webpackChunkName: "MemberContainer" */ tarPulicPath + 'MemberContainer');
const ShopcarContainer = () => import(/* webpackChunkName: "ShopcarContainer" */ tarPulicPath + 'ShopcarContainer');
const SearchContainer = () => import(/* webpackChunkName: "SearchContainer" */ tarPulicPath + 'SearchContainer');

const NewsList = () => import(/* webpackChunkName: "NewsList" */ newsPulicPath + 'NewsList');
const NewsInfo = () => import(/* webpackChunkName: "NewsInfo" */ newsPulicPath + 'NewsInfo');

const PhotoList = () => import(/* webpackChunkName: "PhotoList" */ photosPulicPath + 'PhotoList');
const PhotoInfo = () => import(/* webpackChunkName: "PhotoInfo" */ photosPulicPath + 'PhotoInfo');

const GoodsList = () => import(/* webpackChunkName: "GoodsList" */ goodsPulicPath + 'GoodsList');
const GoodsInfo = () => import(/* webpackChunkName: "GoodsInfo" */ goodsPulicPath + 'GoodsInfo');
const GoodsDesc = () => import(/* webpackChunkName: "GoodsDesc" */ goodsPulicPath + 'GoodsDesc');
const GoodsComment = () => import(/* webpackChunkName: "GoodsComment" */ goodsPulicPath + 'GoodsComment');

let routes = [
  { path: "/home", component: HomeContainer },
  { path: "/member", component: MemberContainer },
  { path: "/search", component: SearchContainer },
  { path: "/shopcar", component: ShopcarContainer },
  { path: "/home/newslist", component: NewsList },
  { path: "/home/newsinfo/:id", component: NewsInfo },
  { path: "/home/photoslist", component: PhotoList },
  { path: "/home/photoinfo/:id", component: PhotoInfo },
  { path: "/home/goodslist/", component: GoodsList },
  { path: "/home/goodsinfo/:id", name: "goodsinfo", component: GoodsInfo },
  { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc' },
  { path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment' }
]

routes = [
  { path: "/", redirect: "/home" },
  ...routes
];

// 3. 创建路由对象
const router = new VueRouter({
  mode: 'hash', //  hash | history  vue-router默认的路由模式是hash，要去掉url中的#需要将路由模式切换为 history
  routes,
  linkActiveClass: "mui-active" //高亮显示,
})


// 把路由对象暴露出去
export default router