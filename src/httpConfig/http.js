/*
 * @Description: 异步请求全局设置
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-21 22:49:22
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-26 20:38:39
 */

import axios from 'axios';
import API_URL from './api';
import { resMsg } from '../global';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 20000
})

// 自定义拦截器
// 请求拦截器
instance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    return config;
  },
  error => {
    return Promise.reject(error.response);
  });

// 响应拦截器
instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response;
    } else {
      resMsg('请求失败 😢');
      return
    }
  },
  error => {
    resMsg(`${error}😢`);
    return;
    // return Promise.reject(error);
  });


export default instance;
