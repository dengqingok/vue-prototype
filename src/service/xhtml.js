// 命名空间路径
let namespace = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

/**
 * 结点操作补充
 * -------------------------
 */
export default {

  "stopPropagation": function (event) {
    event = event || window.event;
    if (event && event.stopPropagation) { //这是其他非IE浏览器
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },

  // 判断是否是结点
  "isNode": function (param) {
    return param && (param.nodeType === 1 || param.nodeType === 9 || param.nodeType === 11);
  },

  // 绑定事件
  "bind": function (dom, eventType, callback) {

    if (dom.constructor === Array) {
      for (let i = 0; i < dom.length; i++) {
        this.bind(dom[i], eventType, callback);
      }
      return;
    }

    if (window.attachEvent)
      dom.attachEvent("on" + eventType, callback);
    else
      dom.addEventListener(eventType, callback, false);
  },

  // 去掉绑定事件
  "unbind": function (dom, eventType, handler) {

    if (dom.constructor === Array) {
      for (let i = 0; i < dom.length; i++) {
        this.unbind(dom[i], eventType, handler);
      }
      return;
    }

    if (window.detachEvent)
      dom.detachEvent(eventType, handler);
    else
      dom.removeEventListener(eventType, handler, false);

  },

  // 在当前上下文context上查找结点
  // selectFun可选，返回boolean用以判断当前面对的结点是否保留
  "find": function (context, selectFun, tagName) {
    let nodes = context.getElementsByTagName(tagName || '*');
    let result = [];
    for (let i = 0; i < nodes.length; i++) {
      if (this.isNode(nodes[i]) && (typeof selectFun != "function" || selectFun(nodes[i])))
        result.push(nodes[i]);
    }
    return result;
  },

  // 寻找当前结点的孩子结点
  // selectFun可选，返回boolean用以判断当前面对的结点是否保留
  "children": function (dom, selectFun) {
    let nodes = dom.childNodes;
    let result = [];
    for (let i = 0; i < nodes.length; i++) {
      if (this.isNode(nodes[i]) && (typeof selectFun != "function" || selectFun(nodes[i])))
        result.push(nodes[i]);
    }
    return result;
  },

  // 判断结点是否有指定class
  // clazzs可以是字符串或数组字符串
  // notStrict可选，boolean值，默认false表示结点必须包含全部class,true表示至少包含一个即可
  "hasClass": function (dom, clazzs, notStrict) {
    if (dom.constructor !== Array) clazzs = [clazzs];

    let class_str = " " + (dom.getAttribute('class') || "") + " ";
    for (let i = 0; i < clazzs.length; i++) {
      if (new RegExp(" " + clazzs[i] + " ").test(class_str)) {
        if (notStrict) return true;
      } else {
        if (!notStrict) return false;
      }
    }
    return true;
  },

  // 删除指定class
  "removeClass": function (dom, clazz) {
    let oldClazz = " " + (dom.getAttribute('class') || "") + " ";
    let newClazz = oldClazz.replace(" " + clazz.trim() + " ", " ");
    dom.setAttribute('class', newClazz.trim());
  },

  // 添加指定class
  "addClass": function (dom, clazz) {
    if (this.hasClass(dom, clazz)) return;
    let oldClazz = dom.getAttribute('class') || "";
    dom.setAttribute('class', oldClazz + " " + clazz);
  },

  // 字符串变成结点
  // isSvg可选，boolean值，默认false表示结点是html，为true表示svg类型
  "toNode": function (string, isSvg) {
    let frame;

    // html和svg上下文不一样
    if (isSvg) frame = document.createElementNS(namespace.svg, 'svg');
    else frame = document.createElement("div");

    // 低版本浏览器svg没有innerHTML，考虑是vue框架中，没有补充
    frame.innerHTML = string;

    let childNodes = frame.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      if (this.isNode(childNodes[i])) return childNodes[i];
    }
  },

  // 主动触发事件
  "trigger": function (dom, eventType) {

    //创建event的对象实例。
    if (document.createEventObject) {
      // IE浏览器支持fireEvent方法
      dom.fireEvent('on' + eventType, document.createEventObject());
    }

    // 其他标准浏览器使用dispatchEvent方法
    else {
      let _event = document.createEvent('HTMLEvents');
      // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
      _event.initEvent(eventType, true, false);
      dom.dispatchEvent(_event);
    }

  },

  // 获取样式
  "getStyle": function (dom, name) {
    // 获取结点的全部样式
    let allStyle = document.defaultView && document.defaultView.getComputedStyle ?
      document.defaultView.getComputedStyle(dom, null) :
      dom.currentStyle;

    // 如果没有指定属性名称，返回全部样式
    return typeof name === 'string' ?
      allStyle.getPropertyValue(name) :
      allStyle;
  },

  // 获取元素位置
  "offsetPosition": function (dom) {
    let left = 0;
    let top = 0;
    top = dom.offsetTop;
    left = dom.offsetLeft;
    dom = dom.offsetParent;
    while (dom) {
      top += dom.offsetTop;
      left += dom.offsetLeft;
      dom = dom.offsetParent;
    }
    return {
      "left": left,
      "top": top
    };
  },

  // 获取鼠标相对元素位置
  "MousePosition": function (dom, event) {
    let bounding = dom.getBoundingClientRect();
    if (!event || !event.clientX)
      throw new Error('Event is necessary!');
    return {
      "x": event.clientX - bounding.left,
      "y": event.clientY - bounding.top
    };
  },

  // 删除结点
  "remove": function (dom) {
    dom.parentNode.removeChild(dom);
  },

  // 设置多个样式
  "setStyles": function (dom, styles) {
    for (let key in styles)
      dom.style[key] = styles[key];
  }

};
