/*
 * @Description: 全局actions
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-24 16:13:01
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-24 20:36:09
 */


import $http from "@/httpConfig/http"

export const ROOT_ASYNC_REQUEST_ACTION = "ROOT_ASYNC_REQUEST_ACTION";

export const actions = {

  /**
   * @description: 异步请求
   * @param {method: 'get'|'post'|'put'|'delete', url: string, param: {}, isForm: true | false} 
   * @return {Promise} 
   * @author: zhangding
   */
  ROOT_ASYNC_REQUEST_ACTION({ }, {
    method = "get",
    url,
    param,
    isForm = false
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
            return
          }
        }).catch(err => {
          return new Promise.reject(err)
        })
    } else {
      return $http.get(url)
        .then(response => {
          if (response.data.status === 0) {
            return response.data.message
          } else {
            return
          }
        }).catch(err => {
          return new Promise.reject(err)
        })
    }
  }

}