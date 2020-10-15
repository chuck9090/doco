//监听Cookie

let cacheCookies = {};

//cookie变更时同步更新cookies
chrome.cookies.onChanged.addListener(function(changeInfo) {
	const currCookieName = changeInfo.cookie.name;
	const currCookieValue = changeInfo.cookie.value;
	cacheCookies[currCookieName] = currCookieValue;
});

//定时去获取全部cookie更新cookies
function updateAllCookie() {
	chrome.cookies.getAll({
		domain: ".h3yun.com"
	}, function(cs) {
		if (cs && cs.length) {
			var newCacheCookies = {};
			for (let i = 0; i < cs.length; i++) {
				newCacheCookies[cs[i].name] = cs[i].value;
			}
			cacheCookies = newCacheCookies;
		}
	});
}
setInterval(updateAllCookie, 15000);

function getAllCookies() {
	return cacheCookies;
}

export {
	getAllCookies
}
