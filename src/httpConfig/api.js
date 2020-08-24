/*
 * @Description:  api接口设置
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-24 13:16:37
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-24 14:15:59
 */

// 生产环境
let API_URL = '';
if (process.env.NODE_ENV !== 'production') {
  // 本地环境
  API_URL = 'http://www.liulongbin.top:3005/'
}
export default API_URL;