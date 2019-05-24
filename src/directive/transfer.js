/**
 * 光标跳转控制
 * -------------------------
 * <form v-transfer></form>
 */

import Vue from 'vue';
import xhtml from '../service/xhtml';

let updateItem = function (el, binding) {

  let pre_node, pre_flag = 'begin';

  // 寻找shift
  let shifts = xhtml.find(el, node => xhtml.hasClass(node, "shift"));
  if (shifts.length <= 0) shifts = [el];

  for (let i = 0; i < shifts.length; i++) {

    // 寻找item
    let pages = xhtml.find(shifts[i], node => xhtml.hasClass(node, 'item'));
    if (pages.length <= 0) pages = [shifts[i]];

    for (let j = 0; j < pages.length; j++) {

      // 寻找输入框
      let inputs_text = xhtml.find(pages[j],
        node => node.nodeName.toLowerCase() === 'input' &&
          ['text', 'password'].indexOf(node.getAttribute('type')) >= 0);

      // 绑定标记
      for (let k = 0; k < inputs_text.length; k++) {

        // 标记前一个
        inputs_text[k]._transfer_item_pre_ = pre_flag;

        // 标记当前
        pre_flag = i + "-" + j + "-" + k;
        inputs_text[k]._transfer_item_id_ = pre_flag;
        inputs_text[k]._transfer_item_next_ = 'end';

        // 标记后一个
        if (xhtml.isNode(pre_node)) pre_node._transfer_item_next_ = pre_flag;
        pre_node = inputs_text[k];

      }

    }

  }

};

Vue.directive('transfer', {
  bind: function (el, binding) {
    xhtml.bind(el, '$updateItem', function () {
      updateItem(el, binding);
    });
  }
});

// 加载全局的关闭跳转方法
export let focusCtrl = {

  changeShow(el, target, shift, item) {

    // 切换shift
    let shiftNavs = xhtml.find(el, node => xhtml.hasClass(node, 'shift-nav'), 'ul')
    if (shiftNavs.length > 0) {
      let shiftNav = shiftNavs[0].getElementsByTagName('li');
      if (!xhtml.hasClass(shiftNav[shift], 'active')) xhtml.trigger(shiftNav[shift], 'click');
    }

    // 切换item
    let shiftNode = xhtml.find(el, node => xhtml.hasClass(node, 'shift'))[shift] || el;
    let itemNavs = xhtml.find(shiftNode, node => xhtml.hasClass(node, 'item-nav'), 'ul');
    if (itemNavs.length > 0) {
      let itemNav = itemNavs[0].getElementsByTagName('li');
      if (!xhtml.hasClass(itemNav[item], 'active')) xhtml.trigger(itemNav[item], 'click');
    }

    window.setTimeout(function () {
      target.focus();
    }, 50);

  },

  install(Vue) {

    // 前一个
    Vue.prototype.$preFocus = function (target) {
      xhtml.trigger(target, '$updateItem');
      let pre = target._transfer_item_pre_;
      let el = target.parentElement;
      while (el && el.nodeName.toLowerCase() != 'form') el = el.parentElement;
      if (pre === 'begin') {
        // todo
      } else {
        let pre_node = xhtml.find(el, function (node) {
          return node._transfer_item_id_ === pre;
        })[0];

        // 切换页面显示
        focusCtrl.changeShow(el, pre_node, ...pre.split('-'));
      }
    };

    // 目标聚焦
    Vue.prototype.$toFocus = function (target) {
      xhtml.trigger(target, '$updateItem');
      let cur = target._transfer_item_id_;
      let el = target.parentElement;
      while (el && el.nodeName.toLowerCase() != 'form') el = el.parentElement;
      // 切换页面显示
      focusCtrl.changeShow(el, target, ...cur.split('-'));

    };

    // 后一个
    Vue.prototype.$nextFocus = function (target) {
      xhtml.trigger(target, '$updateItem');
      let next = target._transfer_item_next_;
      let el = target.parentElement;
      while (el && el.nodeName.toLowerCase() != 'form') el = el.parentElement;
      if (next === 'end') {

        // 最后一个的话，跳转到提交按钮
        let btn_submit = xhtml.find(el, node => xhtml.hasClass(node, 'btn_submit'));
        if (btn_submit.length > 0) btn_submit[0].focus();

      } else {
        let next_node = xhtml.find(el, node => node._transfer_item_id_ === next)[0];

        // 切换页面显示
        focusCtrl.changeShow(el, next_node, ...next.split('-'));
      }
    };

  }
};
