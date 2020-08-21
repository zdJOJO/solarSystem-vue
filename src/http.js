/*
@description 异步请求封装设置
*/

import Vue from "vue"
import VueResource from 'vue-resource'

export const setVueHttpOption = () => {
  /* 异步请求全局设置 */
  // 安装 vue-resource
  Vue.use(VueResource)

  // 设置请求的根路径
  Vue.http.options.root = 'http://www.liulongbin.top:3005/';

  // 全局设置 post 时候表单数据格式组织形式(省得每次手写了)   application/x-www-form-urlencoded
  Vue.http.options.emulateJSON = true;
}