export default {

  /**
   * $remote请求配置
   * ------------------
   */

  // 超时时间
  "timeout": 3000,

  // 请求头
  "headers": {
    "Content-Type": "application/json"
  },

  // 请求上下文
  "baseURL": '',

  // 请求成功拦截
  "requestBack": config => config,

  // 请求失败拦截
  "requestErrorBack": error => Promise.reject(error),

  // 响应成功拦截
  "responseBack": function (response) {
    return Promise.resolve(response);
  },

  // 响应失败拦截
  "responseErrorBack": function (error) {
    if (error.response.status == '404')
      vm.alert('请求地址错误或后台未定义该交易！', '请求404');
    else
      vm.alert(error.response.data.ERRMSG, '请求未知错误');
  }

};
