import Vue from 'vue';

// 引入启动界面
import App from './App.vue';

// 引入路由文件
import router from './route';

// 引入全局变量
import store from './service/store';

// 引入基础样式
import './style/root.scss';

// 引入全局指令
import './directive/input-check';

// 光标控制
import { focusCtrl } from './directive/transfer';
Vue.use(focusCtrl);

// 引入$remote请求服务
import remote from './service/remote';
Vue.use(remote);

// 引入全局方法
import method from './method';
Vue.use(method);

// 引入表单校验结果查询方法
import inputCheck from './service/input-check';
Vue.use(inputCheck);

//根对象
window.vm = new Vue({

  //挂载点
  el: document.getElementById('root'),

  // 启用store
  store,

  // 启用路由
  router,

  // 启动vue
  render: createElement => createElement(App)
});
