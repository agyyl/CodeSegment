var SXUtil = function(){}

/*
 * 判断是否为空
 * @param property
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isEmpty = function (property) {
    var sProperty = property;
    if(sProperty == null || sProperty == undefined || sProperty == '' || sProperty.length == 0){
        return true;
    }
    return false;
}

/*
 * 获取当前时间
 * @param null
 * @returns {Date} 2017-08-02
 *
 * */
SXUtil.prototype.getNowFormatDate = function () {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if(month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if(strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

/*
 * 判断是否是手机号
 * @param phone
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isPhone = function (phone) {
    var sPhone = phone;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
    if(myreg.test(sPhone)){
        return true;
    }else{
        return false;
    }
}

/*
 * 判断是否是邮编
 * @param zip
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isZip = function (zip){
    var sZip = zip;
    var regex=/^[1-9]\d{5}$/;
    if (regex.test(sZip)){
        return true;
    }else{
        return false;
    }
}

/*
 * 判断是否是中文
 * @param chines
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isChines = function (chines){
    var sChines = chines;
    var regex = /^[\u4E00-\u9FA5]+$/;
    return regex.test(sChines);
}

/*
 * 判断是否是数字
 * @param num
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isNum = function (num){
	if( num != null && num.length > 0 && isNaN(num) == false){
        return true;
    }else{
        return false;
    }
}

/*
 * 忽略大小写判断字符串是否相同
 * @param strOne
 * @param strTwo
 * @returns {Boolean}
 * 
 * */
SXUtil.prototype.isEqualsIgnorecase = function(strOne, strTwo) {
	if(strOne.toUpperCase() == strTwo.toUpperCase()) {
		return true;
	} else {
		return false;
	}
}

/*
 * 判断是否是数字
 * @param num
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isIp = function (ip){
	var regex = /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/;
    return regex.test(ip);
}

/*
 * 判断是否是座机号码
 * @param num
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isTel = function (tel) {
    var regex = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    return regex.test(tel);
} 

/*
 * 判断是否是邮箱地址
 * @param num
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isEmail = function (email){
    var sEmail = email;
    var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

    if(myReg.test(sEmail)){
        return true;
    }else{
        return false;
    }
}

/*
 * 检测浏览器是否支持Canvas
 * @param null
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isSupportCanvas = function(){
	if(!document.createElement('canvas').getContext){
	    return false;
	}else{
	    return true;
	}
}

/*
 * 检测浏览器是否支持SVG
 * @param null
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isSupportSVG = function(){
	var SVG_NS = 'http://www.w3.org/2000/svg';
    return !!document.createElementNS &&!!document.createElementNS(SVG_NS, 'svg').createSVGRect;
}

/*
 * 检测浏览器是否是微信浏览器
 * @param null
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isWeiXinClient = function() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}

/*
 * 检测客户端是否是安卓客户端
 * @param null
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isAndroidClient = function(){
	var u = navigator.userAgent, app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
	return isAndroid;
}

/*
 * 检测客户端是否是IOS客户端
 * @param null
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isAndroidClient = function(){
	var u = navigator.userAgent, app = navigator.appVersion;
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	return isIOS;
}

/*
 * 判断是否是以某个字符开头
 * @param source
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isStartWith = function (source){
	return this.indexOf(source) == 0;
}

/*
 * 判断是否是以某个字符结束
 * @param source
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isEndWith = function (source){
	var d = this.length - source.length;
	return (d >= 0 && this.lastIndexOf(source) == d);
}

/*
 * 判断是否为移动设备
 * @param null
 * @returns {Boolean}
 *
 * */
SXUtil.prototype.isMobile = function (){
	return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
}




/*
 * 获取Cookie 信息
 * @param c_name
 * @returns {String}
 *
 * */
SXUtil.prototype.getCookie = function (c_name){
    if (document.cookie.length>0){　//先查询cookie是否为空，为空就return ""
        var c_start=document.cookie.indexOf(c_name + "=");　//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
        if (c_start != -1){
            c_start = c_start + c_name.length + 1;　//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
            var c_end = document.cookie.indexOf(";",c_start);　//其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
            if (c_end == -1){
                c_end=document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start,c_end)); //通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
        }
    }
    return "";
}

/*
 * 设置Cookie信息,设置名称、内容、过期时间
 * @param c_name
 * @param value
 * @param expiredays
 * @returns {null}
 *
 * */
SXUtil.prototype.setCookie = function (c_name, value, expiredays){
    var exdate=new Date();
    exdate.setHours(exdate.getHours() + expiredays);
    document.cookie = c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

/*
 * 删除Cookie 信息
 * @param c_name
 * @returns {null}
 *
 * */
SXUtil.prototype.delCookie = function (c_name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(c_name);
    if(cval!=null)
        document.cookie= c_name + "="+cval+";expires="+exp.toGMTString();
}

/*
 * 计算今天到某日期的天数
 * @param expierDays
 * @returns {Number}
 *
 * */
SXUtil.prototype.subtractDate = function (expierDays){
	// 获取过期时间
	var expierDate = expierDays.split("-");
	expierDate = new Date(expierDate[0], expierDate[1] - 1, expierDate[2]);
	// 获取当前时间
	var nowDays = sxutil.getNowFormatDate();
	var nowDate = nowDays.split("-");
	nowDate = new Date(nowDate[0], nowDate[1] - 1, nowDate[2]);
	// 计算时间
	iDays = Math.floor((expierDate - nowDate) / 86400000);
	
	return iDays;
}

/*
 * 转换成日期毫秒
 * @param null
 * @returns {String}
 *
 * */
SXUtil.prototype.convertMillisecondDate = function (){
	var millisecond =  +new Date();
	return millisecond;
}

/*
 * 生成指定位数的随机整数
 * @param count
 * @returns {Number}
 *
 * */
SXUtil.prototype.getRandomNum = function (count){
    var arr = new Array;
    var reNum = "";
    for(var i=0;i<count;i++){
        arr[i] = parseInt(Math.random()*10);
        reNum += String(arr[i]);
    }
    return reNum;
}

/*
 * 利用正则表达式方式，获取地址栏中的的参数值
 * @param name
 * @returns {String}
 *
 * */
SXUtil.prototype.GetQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null)
        return unescape(r[2]);
    return null;
}

/*
 * 去掉字符串中的空格
 * @param source
 * @returns {String}
 *
 * */
SXUtil.prototype.Trim = function (source){
	return this.replace( /(^\s*)|(\s*$)/g, source);
}

/*
 * 将图片转换成 data 64
 * @param source
 * @returns {String}
 *
 * */
SXUtil.prototype.createImgData64 = function (img){
	var image = new Image();
    image.src = img.src || img;
    var tmpCanvas = $("<canvas></canvas>")[0];
    var tmpCtx = tmpCanvas.getContext("2d");
    if (tmpCanvas) {
        tmpCanvas.width = image.width;
        tmpCanvas.height = image.height;
        tmpCtx.drawImage(image, 0, 0);
        return tmpCanvas.toDataURL();
    }
}

/*
 * 转换成Html格式
 * @param text
 * @returns {html}
 *
 * */
SXUtil.prototype.HtmlEncode(text){
	return text.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>');
}

/*
 * 获取UUID
 * @param null
 * @returns {Number}
 *
 * */
SXUtil.prototype.getUUID = function (){
    var a=Math.random,b=parseInt;
    return Number(new Date()).toString()+b(10*a())+b(10*a())+b(10*a());
}

/*
 * 将字符串超出部分省略
 * @param text
 * @returns {String}
 *
 * */
SXUtil.prototype.cutString= function(text) {
	var restr = this;
	var wlength = this.replace(/[^\x00-\xff]/g, "**").length;
	if(wlength > len) {
		for(var k = len / 2; k < this.length; k++) {
			if(this.substr(0, k).replace(/[^\x00-\xff]/g, "**").length >= len) {
				restr = this.substr(0, k) + "...";
				break;
			}
		}
	}
	return restr;
}

/*
 * 返回字符串的实际长度, 一个汉字算2个长度
 * @param text
 * @returns {Number}
 *
 * */
SXUtil.prototype.getStringlen = function() {
 	return this.replace(/[^\x00-\xff]/g, "**").length;
}

/*
 * 加入浏览器收藏夹
 * @param url
 * @param title
 * @returns null
 *
 * */
SXUtil.prototype.addFavorite = function (url, title){
	try{
		window.external.addFavorite(url, title);
	}catch(e){
		try{
			window.sidebar.addPanel(url, title);
		}catch(e){
			alert("加入收藏失败，请使用Ctrl+D进行添加");
		}
	}
}

/*
 * 获取浏览器的高度
 * @param null
 * @returns {String}
 *
 * */
SXUtil.prototype.getClientHeight = function (){
	return document.documentElement.clientHeight;
}

/*
 * 获取浏览器的宽度
 * @param null
 * @returns {String}
 *
 * */
SXUtil.prototype.getClientWidth = function(){
	return document.documentElement.clientWidth;
}

/*
 * 获取页面可视宽度
 * @param null
 * @returns {Number}
 *
 * */
SXUtil.prototype.getPageViewWidth = function (){
	var d = document;
	var a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
	return a.clientWidth;
}

/*
 * 获取页面可视高度
 * @param null
 * @returns {Number}
 *
 * */
SXUtil.prototype.getPageViewHeight = function (){
	var d = document;
	var a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
	return a.clientHeight;
}

/*
 * 控制浏览器进入全屏模式
 *
 * */
SXUtil.prototype.fullScreen = function () {
	var el = document.documentElement,
		rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
		wscript;
	if(typeof rfs != "undefined" && rfs) {
		rfs.call(el);
		return;
	}
	if(typeof window.ActiveXObject != "undefined") {
		wscript = new ActiveXObject("WScript.Shell");
		if(wscript) {
			wscript.SendKeys("{F11}");
		}
	}
}
/*
 * 控制浏览器退出全屏模式
 *
 * */
SXUtil.prototype.exitFullScreen = function () {
	var el = document,
		cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
		wscript;
	if(typeof cfs != "undefined" && cfs) {
		cfs.call(el);
		return;
	}
	if(typeof window.ActiveXObject != "undefined") {
		wscript = new ActiveXObject("WScript.Shell");
		if(wscript != null) {
			wscript.SendKeys("{F11}");
		}
	}
}












// 声明对象
var sxutil = new SXUtil();