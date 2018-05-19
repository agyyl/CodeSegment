// 自动添加浏览器前缀
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}



export default {

  // 操作 dom 元素
  dom: {
    // ***************************************
    // 兼容性方法

    // 事件监听兼容
    Eventlisten: {
      addEvent: function (ele, fn, str) {
        if (ele.addEventListener) {
          ele.addEventListener(str, fn);
        } else if (ele.attachEvent) {
          ele.attachEvent("on" + str, fn)
        } else {
          ele["on" + str] = fn;
        }
      },
      removeEvent: function (ele, fn, str) {
        if (ele.removeEventListener) {
          ele.removeEventListener(str, fn);
        } else if (ele.detachEvent) {
          ele.detachEvent("on" + str, fn);
        } else {
          ele["on" + str] = null;
        }
      },
    },

    // 鼠标滚动兼容写法
    windowAddMouseWheel() {
      let scrollFunc = function (e) {
        e = e || window.event;
        if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件  
          delta = e.wheelDelta / 120;
          if (window.opera) delta = -delta;
        } else if (event.detail) {
          delta = -event.detail / 3;
        }
        if (delta && delta < 0) {
          console.log('向下滚了' + delta);
        }
      };
      //给页面绑定滑轮滚动事件  
      if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
      }
      //滚动滑轮触发scrollFunc方法  
      window.onmousewheel = document.onmousewheel = scrollFunc;
    },

    // 阻止冒泡
    stopBubble: function (e) {
      // 如果提供了事件对象，则这是一个非IE浏览器
      if (e && e.stopPropagation) {
        // 因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
      } else {
        // 否则，我们需要使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
      }
    },

    // 获取,设置元素文本内容
    textContent: function (element, value) {
      var content = element.textContent;
      if (value === undefined) {
        if (content !== undefined) return content;
        else return element.innerText;
      } else {
        if (content !== undefined) element.textContent = value;
        else element.innerText = value;
      }
    },

    // ***********************************
    // 获取文档信息

    // 获取 css 属性
    getCss: function (element) {
      return element.currentStyle ? element.currentStyle : window.getComputedStyle(element, null);
    },

    // 是否有某个类名
    hasClass: function (el, className) {
      return el.classList.contains(className)
    },

    //添加类名
    addClass: function (el, className) {
      el.classList.add(className)
    },

    // 获取视口宽高
    client: function () {
      if (window.innerHeight !== undefined) {
        return {
          "width": window.innerWidth,
          "height": window.innerHeight
        }
      } else if (document.compatMode === "CSS1Compat") {
        return {
          "width": document.documentElement.clientWidth,
          "height": document.documentElement.clientHeight
        }
      } else {
        return {
          "width": document.body.clientWidth,
          "height": document.body.clientHeight
        }
      }
    },

    // 获取页面宽度
    getPageWidth: function () {
      var g = document,
        a = g.body,
        f = g.documentElement,
        d = g.compatMode == "BackCompat" ?
        a : g.documentElement;
      return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
    },

    // 获取页面可视宽度
    getPageViewWidth: function () {
      var d = document,
        a = d.compatMode == "BackCompat" ?
        d.body : d.documentElement;
      return a.clientWidth;
    },

    // 获取页面高度
    getPageHeight: function () {
      var g = document,
        a = g.body,
        f = g.documentElement,
        d = g.compatMode == "BackCompat" ?
        a :
        g.documentElement;
      return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
    },

    // 获取滚动高度
    scroll: function () {
      if (window.pageYOffset) {
        return {
          "top": window.pageYOffset,
          "left": window.pageXOffset
        }
      } else if (document.compatMode == "CSS1Compat") {
        return {
          "top": document.documentElement.scrollTop,
          "left": document.documentElement.scrollLeft
        }
      } else {
        return {
          "top": document.body.scrollTop,
          "left": document.body.scrollLeft
        }
      }
    },

    // 获取元素距离页面顶端高度
    getTop: function (ele) {
      let hei = parseInt(ele.offsetTop);
      if (ele.offsetParent) {
        let suphei = getTop(ele.offsetParent);
        if (!isNaN(suphei)) {
          hei += suphei;
        }
      }
      return hei;
    },

    getLeft: function (ele) {
      let left = parseInt(ele.offsetLeft);
      if (ele.offsetParent) {
        let supLeft = getLeft(ele.offsetParent);
        if (!isNaN(supLeft)) {
          left += supLeft;
        }
      }
      return left;
    },

    // ************************************
    // 动画特效

    // 滚动页面动画 ! 需要声明外部变量 moveTimer
    moveTo: function (val) {
      if (moveTimer) {
        clearInterval(moveTimer);
      }
      moveTimer = setInterval(scrTo, 30);
      function scrTo() {
        var leader = scroll().top;
        var step = Math.ceil((val - leader) / 10);
        if (step === 0) {
          step = -1;
        }
        window.scrollTo(0, leader + step);
        if (Math.abs(scroll().top - val) <= 5 || Math.abs(scroll().top - (document.body.scrollHeight - document.body.clientHeight)) <= 10) {
          window.scrollTo(0, val);
          clearInterval(moveTimer);
        }
      }
    },

    // 缓动动画
    animate: function (ele, valX, valY, ti) {
      var timer1;
      var timer2;
      ti = ti || 30;
      clearInterval(timer1);
      clearInterval(timer2);
      if (valX) {
        timer1 = setInterval(fn1, ti);
      }
      if (valY) {
        timer2 = setInterval(fn2, ti);
      }

      function fn1() {
        var step = Math.ceil((valX - ele.offsetLeft) / 10);
        if (step == 0) {
          step = -1;
        }
        ele.style.left = ele.offsetLeft + step + "px";
        if (Math.abs(ele.offsetLeft - valX) < 2) {
          ele.style.left = valX + "px";
          clearInterval(timer1);
        }
      }

      function fn2() {
        var step = Math.ceil((ele.offsetTop - valY) / 10);
        if (step == 0) {
          step = -1;
        }
        ele.style.top = ele.offsetTop - step + "px";
        if (Math.abs(ele.offsetTop - valY) < 2) {
          ele.style.top = valY + "px";
          clearInterval(timer2);
        }
      }
    },

    // dom 伪数组转为数组
    convertToArray: function (nodeList) {
      var array = null
      try {
        // IE8-NodeList是COM对象
        array = Array.prototype.slice.call(nodeList, 0)
      } catch (err) {
        array = []
        for (var i = 0, len = nodeList.length; i < len; i++) {
          array.push(nodeList[i])
        }
      }
      return array
    },

    // 遍历 DOM 树(JavaScript 权威指南)
    /**
     * 返回元素 e 的第 n 层祖先元素,如果不存在此类祖先或祖先不是 Element,
     * (例如 Document 或者 DocumentFragment)则返回 null
     * 如果 n 为 0,则返回 e 本身. 如果 n 为1(或者省略),则返回其父元素
     * 如果 n 为2,则返回其祖父元素,依次类推
     */
    parent: function (e, n) {
      if (n === undefined) n = 1;
      while (n-- && e) e = e.parentNode;
      if (!e || e.nodeType !== 1) return null;
      return e;
    },

    /**
     * 返回元素 e 第 n 个兄弟元素
     * n 为正,返回后续的第 n 个兄弟元素
     * n 为负,返回前面的第 n 个兄弟元素
     * n 为0, 返回 e 本身
     */
    sibling: function (e, n) {
      while(e && n !== 0) {
        if (n > 0) {
          if (e.nextElementSibling) e = e.nextElementSibling;
          else {
            for (e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling) {
              // 空循环
            }
          }
          n--;
        } else {
          if (e.previousElementSibling) e = e.previousElementSibling;
          else {
            for (e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling) {
              // 空循环
            }
          }
          n++;
        }
      }
      return e;
    },

    // ajax 函数
    ajax: function (setting) {
      //设置参数的初始值
      var opts = {
        method: (setting.method || "GET").toUpperCase(), //请求方式
        url: setting.url || "", // 请求地址
        async: setting.async || true, // 是否异步
        dataType: setting.dataType || "json", // 解析方式
        data: setting.data || "", // 参数
        success: setting.success || function () {}, // 请求成功回调
        error: setting.error || function () {} // 请求失败回调
      };

      // 参数格式化
      function params_format(obj) {
        var str = "";
        for (var i in obj) {
          str += i + "=" + obj[i] + "&";
        }
        return str
          .split("")
          .slice(0, -1)
          .join("");
      }

      // 创建ajax对象
      var xhr = new XMLHttpRequest();

      // 连接服务器open(方法GET/POST，请求地址， 异步传输)
      if (opts.method == "GET") {
        xhr.open(
          opts.method,
          opts.url + "?" + params_format(opts.data),
          opts.async
        );
        xhr.send();
      } else {
        xhr.open(opts.method, opts.url, opts.async);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(opts.data);
      }

      /*
       ** 每当readyState改变时，就会触发onreadystatechange事件
       ** readyState属性存储有XMLHttpRequest的状态信息
       ** 0 ：请求未初始化
       ** 1 ：服务器连接已建立
       ** 2 ：请求已接受
       ** 3 : 请求处理中
       ** 4 ：请求已完成，且相应就绪
       */
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
          switch (opts.dataType) {
            case "json":
              var json = JSON.parse(xhr.responseText);
              opts.success(json);
              break;
            case "xml":
              opts.success(xhr.responseXML);
              break;
            default:
              opts.success(xhr.responseText);
              break;
          }
        }
      };

      xhr.onerror = function (err) {
        opts.error(err);
      };
    },

    // 获取地理位置
    getLocation: function (callback) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (p) {
            callback(p.coords.latitude, p.coords.longitude);
          },
          function (e) {
            var msg = e.code + "\n" + e.message;
          }
        );
      }
    },

    // 点击按钮返回顶部
    // 参数: 按钮 id
    backTop: function (btnId) {
      var btn = document.getElementById(btnId);
      var d = document.documentElement;
      var b = document.body;
      window.onscroll = set;
      btn.style.display = "none";
      btn.onclick = function () {
        btn.style.display = "none";
        window.onscroll = null;
        this.timer = setInterval(function () {
          d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
          b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
          if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
        }, 10);
      };

      function set() {
        btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block' : "none"
      }
    }
  },

  // 处理数据 字符串 数字 等
  data: {

    // ***************************
    // 处理字符串

    // 获得 URL 参数
    getURLParam: function (name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    },
    trim: function (str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    ltrim: function (str) {
      return str.replace(/(^\s*)/g, "");
    },
    rtrim: function (str) {
      return str.replace(/(\s*$)/g, "");
    },

    // 字符串反序输出
    IsReverse: function (text) {
      return text.split('').reverse().join('');
    },

    // *************************************
    // 处理数字

    // 获得随机颜色
    getRandomColor: function () {
      return '#' + (function (h) {
        return new Array(7 - h.length).join("0") + h;
      })((Math.random() * 0x1000000 << 0).toString(16));
    },

    getWeek: function () {
      let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      return weekday[new Date(2015, 9, 1).getDay()];
    },

    // 格式化数字
    fmoney: function (s, n) {
      //s:传入的float数字 ，n:希望返回小数点几位
      n = n > 0 && n <= 20 ? n : 2;
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      var l = s
        .split(".")[0]
        .split("")
        .reverse(),
        r = s.split(".")[1];
      t = "";
      for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
      }
      return;
      t
        .split("")
        .reverse()
        .join("") +
        "." +
        r;
    },

    // 获得随机数时间戳
    uniqueId: function () {
      var a = Math.random,
        b = parseInt;
      return Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a());
    },

    // ***********************************
    // 处理数组

    // 数组项按字典顺序排序
    SetSort: function () {
      var text = K1.value.split(/[\r\n]/).sort().join("\r\n"); //顺序
      var test = K1.value.split(/[\r\n]/).sort().reverse().join("\r\n"); //反序
      K1.value = K1.value != text ? text : test;
    },

    // 判断是否数组
    isArr: function (obj) {
      let isArray = Function.isArray || function (o) {
        return typeof o === 'object' && Object.prototype.toString.call(o) === '[object Array]';
      };
      return isArray(obj);
    }
  },

  // 正则
  regRule: {
    email: function (email) {
      var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      return reg.test(email);
    },
    userName: function (str) {
      var reg = /^[a-z0-9_-]{3,16}$/; //用户名
      return reg.test(str);
    },
    chineseName: function (str) {
      var reg = /^[\u4E00-\u9FA5]{2,4}$/; //中文姓名
      return reg.test(str);
    },
    mobile: function (str) {
      var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/; //手机
      return reg.test(str);
    },
    tel: function (str) {
      var reg = /^0[\d]{2,3}-[\d]{7,8}$/; //固话
      return reg.test(str);
    },
    idCard: function (str) {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证
      return reg.test(str);
    },
    amount: function (str) {
      var reg = /^([1-9][\d]{0,10}|0)(\.[\d]{1,2})?$/; //金额(10位整数2位小数)
      return reg.test(str);
    },
    positiveInt: function (str) {
      var reg = /^[1-9]*[1-9][0-9]*$/; //正整数
      return reg.test(str);
    },
    int: function (str) {
      var reg = /^-?\d+$/; //整数(不限位数)
      return reg.test(str);
    },
    bankCard: function (str) {
      var reg = /^\d{16}|\d{19}$/; //16位或19位银行卡或信用卡号(先把空格replace为空串)
      return reg.test(str);
    },
    chinese: function (str) {
      var reg = /[\u4e00-\u9fa5]/g; //判断是不是中文
      return reg.test(str);
    },
    noChinese: function (str) {
      var reg = /[^\u4e00-\u9fa5]/g; //判断不是中文
      return reg.test(str);
    },
    decimalNumber: function (str) {
      var reg = /^\d+(\.\d+)+$/; //判断带小数的数字
      return reg.test(new Number(str));
    },
    ip: function (str) {
      var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
      return reg.test(str);
    }
  }
}