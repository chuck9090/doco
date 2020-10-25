//监听Cookie
const cookieManager = {
	cookieDomain: ".h3yun.com",
	storageName: "cacheCookies",
	cacheCookies: {},
	addCookieListener: function() {
		var _this = this;

		//cookie变更时同步更新cookies
		chrome.cookies.onChanged.addListener(function(changeInfo) {
			if (changeInfo.cookie.domain.indexOf(_this.cookieDomain) !== -1) {
				const currCookieName = changeInfo.cookie.name;
				const currCookieValue = changeInfo.cookie.value;
				_this.cacheCookies[currCookieName] = currCookieValue;

				_this.saveToStorage();
			}
		});
	},
	//全部cookie更新
	updateAllCookie: function() {
		var _this = this;

		chrome.cookies.getAll({
			domain: _this.cookieDomain
		}, function(cs) {
			if (cs && cs.length) {
				var newCacheCookies = {};
				for (let i = 0; i < cs.length; i++) {
					newCacheCookies[cs[i].name] = cs[i].value;
				}
				_this.cacheCookies = newCacheCookies;

				_this.saveToStorage();
			}
		});
	},
	addIntervalUpdate: function() {
		var _this = this;

		setInterval(function() {
			_this.updateAllCookie();
		}, 5000);
	},
	getAllCookies: function(success, fail) {
		var _this = this;

		chrome.storage.local.get([_this.storageName], function(result) {
			if (result && result[_this.storageName]) {
				if (success) {
					success(result[_this.storageName]);
				}
			} else {
				if (fail) {
					fail("no cookies!");
				}
			}
		});
	},
	saveToStorage: function() {
		var _this = this;
		chrome.storage.local.set({
			[_this.storageName]: _this.cacheCookies
		}, function() {
			//console.log(_this.storageName + " To local storage success!");
		});
	},
	init: function() {
		var _this = this;

		_this.addCookieListener();
		_this.addIntervalUpdate();
	}
};

export default cookieManager;
