const common = {
	getQueryString(url, name) {
		let reg = new RegExp("(\\?|&)" + name + "=([^&]*)(&|$)", "i");
		let r = url.match(reg); //获取url中"?"符后的字符串并正则匹配
		let context = "";
		if (r != null)
			context = r[2];
		reg = null;
		r = null;
		return context == null || context == "" || context == "undefined" ? "" : context;
	},
	createUrl(url, obj) {
		url += "?";
		for (let key in obj) {
			if (obj[key] !== null) {
				url += (key + '=' + encodeURIComponent(obj[key]) + '&');
			}
		}
		return url.substring(0, url.lastIndexOf('&'));
	},
	jsonParse(json) {
		if (json && typeof json === "string") {
			json = json.replace(/\\\\"/g, '\\"');
			return JSON.parse(json);
		}
		return null;
	},
	toBeautifyJson(obj) {
		if (obj && typeof obj === "string") {
			let pObj = this.jsonParse(obj);
			if (pObj) {
				obj = pObj;
			}
		}
		if (obj && typeof obj === "object") {
			return JSON.stringify(obj, null, "\t");
		}
		return obj;
	}
};

export default common;
