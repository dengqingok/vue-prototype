import validate from '../validate';
import xhtml from '../service/xhtml';

/**
 * 表单校验【校验执行者】
 * -------------------------
 * v-input-check:[val,'规则s']
 * 具体的可用规则可自定义，在文件src/validate.js中定义或查看
 */

import Vue from 'vue';

let doIt = function (el, binding) {

  // 此表单是否合法
  let isValid = true;

  // 传递的规则
  let ruls = binding.value[1].split("|"), rul, rulName, temp;

  // 迭代计算每个规则是否满足
  for (let i = 0; i < ruls.length; i++) {

    rul = ruls[i].split(":");
    // 获取具体的规则方法
    rulName = rul[0];

    rul[0] = binding.value[0];
    // 求解是否满足规则
    temp = validate[rulName](...rul);

    if (temp) {

      xhtml.removeClass(el, 'v-invalid-' + rulName);
      xhtml.addClass(el, 'v-valid-' + rulName);

    } else {

      xhtml.addClass(el, 'v-invalid-' + rulName);
      xhtml.removeClass(el, 'v-valid-' + rulName);

      // 如果不合法需要标记一下
      isValid = false;
    }

  }

  if (isValid) {
    // 此输入框合法
    xhtml.addClass(el, 'v-valid');
    xhtml.removeClass(el, 'v-invalid');
  } else {
    // 此输入框非法
    xhtml.addClass(el, 'v-invalid');
    xhtml.removeClass(el, 'v-valid');
  }

  // 修改表单form的合法性
  let formNode = el.parentElement;
  while (formNode && formNode.nodeName.toLowerCase() != 'form') formNode = formNode.parentElement;
  if (formNode) {
    let invalids = xhtml.find(formNode, function (temp) {
      return xhtml.hasClass(temp, 'v-invalid');
    });
    if (invalids.length > 0) {

      // 表单存在非法
      xhtml.addClass(formNode, 'v-invalid');
      xhtml.removeClass(formNode, 'v-valid');
    } else {

      // 表单合法
      xhtml.addClass(formNode, 'v-valid');
      xhtml.removeClass(formNode, 'v-invalid');
    }
  } else {
    throw new Error('You need a form to wrap the input box!');
  }

};

Vue.directive('inputCheck', {

  bind: function (el, binding) {
    window.setTimeout(function () {
      doIt(el, binding);
    }, 100);
  },

  update: doIt

});
