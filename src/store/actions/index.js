/*
 * @Description: 全局actions
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-24 16:13:01
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-26 20:38:00
 */


import $http from "@/httpConfig/http"
import { resMsg } from '@/global';

export const ROOT_ASYNC_REQUEST_ACTION = "ROOT_ASYNC_REQUEST_ACTION";

export const actions = {

  /**
   * @description: 异步请求
   * @param {method: 'get'|'post'|'put'|'delete', url: string, param: {}, isForm: true | false} 
   * @return {Promise} 
   * @author: zhangding
   */
  ROOT_ASYNC_REQUEST_ACTION({ context }, {
    method = "get",
    url,
    param,
    isForm = false,
    isMsg = false
  }) {

    if (method !== "get") {
      // post delete put
      let contentType = 'application/json;charset=UTF-8';
      if (isForm) {
        contentType = 'application/x-www-form-urlencoded';
      }
      return $http[method](url, param, { headers: { 'Content-Type': contentType } })
        .then(response => {
          if (response.data.status === 0) {
            return { successful: response.data.status === 0, msg: response.data.message }
          } else {
            resMsg(`${response.data.message} 😢`);
            return
          }
        }).catch(err => {
          resMsg(`请求失败${err} 😢`);
          return Promise.reject(err)
        })
    } else {
      return $http.get(url)
        .then(response => {
          if (response.data.status === 0) {
            if (response.data.message.length > 0) {
              if (isMsg) {
                resMsg(`为您跟新${response.data.message.length} 条信息 😀`, 'success')
              }
            } else {
              resMsg(`已无更多信息 🙂`, 'warning')
            }
            return response.data.message
          } else {
            resMsg(`${response.data.message} 😢`);
            return
          }
        }).catch(err => {
          resMsg(`请求失败${err} 😢`);
          return Promise.reject(err)
        })
    }
  }

}