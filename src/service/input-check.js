/**
 * 表单校验【校验结果获取者】
 * -------------------------
 * yelloxing 2019/04/28
 * 
 * 使用方法：
 * 
 * // 获取当前组件内（可包括子组件）知道名称的form表单校验管理者
 * let ERROR=this.$error(formname);
 * 
 * // 方法一：判断表单是否合法
 * ERROR.isValiadte();
 * 
 * // 方法二：如果非法，获取第一个非法信息
 * let first_error=ERROR.first();
 * 返回的数据格式为：
 * {
 *  "$el":错误的输入框结点
 * "$error":当前输入框的第一个错误提示信息
 * }
 */
import xhtml from './xhtml';
import { errorinfo } from '../validate';

// 配合input-check指令
// 用以获取指定表单的错误信息
export default {
  install(Vue) {
    Vue.prototype.$error = function (formname) {

      // 首先获取需要校验的表单结点
      let formnode, temp = this.$el.getElementsByTagName('form');
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].name == formname) {
          formnode = temp[i];
          break;
        }
      }

      // 如果表单查找不到，报错，以免后续使用报错不容易捕获
      if (!xhtml.isNode(formnode)) throw new Error('Target is empty!');

      // 返回一系列判断方法
      return {

        // 返回boolean,true：表单合法，false:表单非法
        "isValiadte": function () {
          return !xhtml.hasClass(formnode, 'v-invalid');
        },

        // 获取第一个错误的输入框信息
        "first": function () {

          let nodes = formnode.getElementsByTagName('*'), target;

          // 筛选出来第一个非法输入
          for (let i = 0; i < nodes.length; i++) {
            if (xhtml.hasClass(nodes[i], 'v-invalid')) {
              target = nodes[i];
              break;
            }
          }

          // 记录输入的class
          let input_class = " " + target.getAttribute('class') + " ";


          // 如果是label，支持通过for从单位input
          if (target.nodeName.toLowerCase() === 'label') {
            target = document.getElementById(target.getAttribute('for'));
          }

          // 如果有placeholder，采用设置的
          let error = target.getAttribute("placeholder");
          if (!error) {

            // 设置默认的未自定义错误提示方式的默认提示
            error = target.name + "输入非法！";

            // 寻找第一个类型的错误
            for (let i = 0; i < errorinfo.length; i++) {
              if (new RegExp(" v-invalid-" + errorinfo[i][0] + " ").test(input_class)) {

                // 调用自定义错误提示确定提示文字
                error = errorinfo[i][1](target, target.name);
                break;
              }
            }
          }

          return {
            "$el": target,
            "$error": error
          };

        }

      };

    };
  }
};