import Vue from "vue"
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import cart from './shoppingCart'
import news from './news';
import comment from './comment';

// 挂载 Vuex
Vue.use(Vuex);

// 开发环境
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    cart,
    news,
    comment
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
