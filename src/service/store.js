/**
 * 全局变量
 * -------------------------
 * yelloxing 2019/04/15
 *
 * 使用方法：
 * this.$store.XX.XX
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * 预定义全局变量
 */

let vue_prototype_store_state = window.sessionStorage.getItem('vue_prototype_store_state');

const state = vue_prototype_store_state ? JSON.parse(vue_prototype_store_state) : {

  /**
   * 用户登录相关
   * -------------------------
   */

  // 用户是否登录
  "islogin": false

};

/**
  * 弹框相关
  * ------------------
  */

// 记录当前打开的交易
state.dialogs = [];

//  打开弹框
state.openDialog = function (id, initdata, callback) {
  state.dialogs.push({
    id: id,
    data: initdata,
    callback: callback
  });
};

//  关闭弹框
state.closeDialog = function (data) {
  // 从数组中删除即可关闭
  let will_close_dialog = state.dialogs.pop();

  // 如果有回调，回调
  if (typeof will_close_dialog.callback === "function") {
    will_close_dialog.callback(data);
  }
};

/**
 * 挂载到全局变量中
 */
const store = new Vuex.Store({ state });

// 更新数据
export let update_store_state = function () {
  window.sessionStorage.setItem('vue_prototype_store_state', JSON.stringify({
    // 只保存需要持续保存的数据
    "islogin": state.islogin
  }));
};

// 清除数据
export let clean_store_state = function () {
  window.sessionStorage.removeItem('vue_prototype_store_state');
};

export default store;
