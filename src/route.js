import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 引入首页
import login_page from './htmls/login.vue';

// 配置路由
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: login_page
    },
    {
      path: '/tradesys',
      // 非首页的，懒加载
      component: resolve => require(['./htmls/tradesys.vue'], resolve)
    },
    {
      path: '/*',
      redirect: 'login'
    }]
});

export default router;
