const common = {
	getQueryString: function(url, name) {
		let reg = new RegExp("(\\?|&)" + name + "=([^&]*)(&|$)", "i");
		let r = url.match(reg); //获取url中"?"符后的字符串并正则匹配
		let context = "";
		if (r != null)
			context = r[2];
		reg = null;
		r = null;
		return context == null || context == "" || context == "undefined" ? "" : context;
	},
	createUrl: function(url, obj) {
		url += "?";
		for (let key in obj) {
			if (obj[key] !== null) {
				url += (key + '=' + encodeURIComponent(obj[key]) + '&');
			}
		}
		return url.substring(0, url.lastIndexOf('&'));
	}
};

export {
	common
}
