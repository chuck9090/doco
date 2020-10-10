const common = {
	getQueryString: function(url, name) {
		var reg = new RegExp("(\\?|&)" + name + "=([^&]*)(&|$)", "i");
		var r = url.match(reg); //获取url中"?"符后的字符串并正则匹配
		var context = "";
		if (r != null)
			context = r[2];
		reg = null;
		r = null;
		return context == null || context == "" || context == "undefined" ? "" : context;
	}
};

export {
	common
}
