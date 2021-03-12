const install = function(Vue) {
	const cache = new Vue({
		methods: {
			checkKey(key) {
				if (typeof key !== "string" || key == "") {
					throw Error("The key must be a string.");
				}
			},
			setCache(key, value, callback) {
				this.checkKey(key);
				if (typeof value === typeof {}) {
					value = JSON.stringify(value);
				}
				if (value === undefined || value === null) {
					value = "";
				}
				chrome.storage.local.set({
					[key]: value
				}, callback);
			},
			getCache(key, callback) {
				this.checkKey(key);
				chrome.storage.local.get([key], function(value) {
					if (value === undefined || value === null) {
						callback(null);
						return;
					}
					value = value[key];
					if (value === undefined || value === null) {
						callback(null);
						return;
					}
					if (/^\{.*\}$/.test(value) || /^\[.*\]$/.test(value)) {
						callback(JSON.parse(value));
						return;
					}
					callback(value);
				});
			},
			removeCache(key, callback) {
				this.checkKey(key);
				chrome.storage.local.remove(key, callback);
			},
			clearAllCache(callback) {
				chrome.storage.local.clear(callback);
			}
		}
	});
	Vue.prototype.$cache = cache;

}

export default install;
