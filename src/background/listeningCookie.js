//监听Cookie

let cookies = {

};

chrome.cookies.onChanged.addListener(function(changeInfo) {
	const currCookieName = changeInfo.cookie.name;
	const currCookieValue = changeInfo.cookie.value;
	cookies[currCookieName] = currCookieValue;
	console.log(cookies);
});

function getAllCookies() {
	return cookies;
}

export {
	getAllCookies
}
