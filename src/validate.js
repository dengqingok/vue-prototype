/**
 * 表单校验【配置文件】
 * -------------------------
 * 表单校验分为三部分：
 * 1.自定义交易规则和具体的提示信息等配置，也就是本文件
 * 
 * 2.定义了规则以后，应用在form上，由指令v-input-check实现
 * 文件位置：src/directive/input-check.js
 * 
 * 3.规则应用以后，需要获取当前表单合法性，由全局方法this.$error(formname)提供
 * 文件位置：src/service/input-check.js
 * 
 * 另外，表单和具体的输入框上通过class记录着校验的具体结果，可以在定义样式的时候使用。
 */

// 自定义校验规则
export default {

  // 1.required:flag
  "required": function (val, flag) {
    if (flag === 'false' || flag === false || (val && !/^ +$/.test(val))) return true;
    return false;
  }

};

// 自定义错误提示
// 请和上面的对应起来，上面未定义的采用默认提示
export let errorinfo = [

  // 1.必输
  ["required", function (el, name) {
    return name + "是必输项！";
  }]

];