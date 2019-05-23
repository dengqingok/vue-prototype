import config from '../config';

/**
 * xhr请求
 * -------------------------
 * yelloxing 2019/04/15
 *
 * 使用方法：
 * this.$remote.get(url)
 * this.$remote.post(url,params)
 */
import axios from "axios";

let instance = axios.create({

  // 超时时间
  timeout: config.timeout,

  // 请求头
  headers: config.headers
});

// 请求上下文
instance.defaults.baseURL = config.baseURL;

//请求拦截器
instance.interceptors.request.use(config.requestBack, config.requestErrorBack);

//响应拦截器
instance.interceptors.response.use(config.responseBack, config.responseErrorBack);

// 导出方法提供给项目使用
export default {
  install(Vue) {
    Vue.prototype.$remote = {

      // GET请求
      "get": function (url) {
        return instance.get(url);
      },

      // POST请求
      "post": function (url, params) {

        if (params && typeof params != 'string') {
          // 添加默认参数
        }

        return instance.post(url, params);
      }
    };
  }
};
