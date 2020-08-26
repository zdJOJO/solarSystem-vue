/*
 * @Description: 全局store定义
 * @Version: 2.0
 * @Autor: zdJOJO
 * @Date: 2020-08-21 15:37:14
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-26 23:29:44
 */
import Vue from "vue"
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import { actions } from './actions';
import modules from './modules';

// 挂载 Vuex
Vue.use(Vuex);

// 开发环境
const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  actions,
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store;
