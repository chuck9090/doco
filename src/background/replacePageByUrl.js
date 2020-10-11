// web请求监听，最后一个参数表示阻塞式，需单独声明权限：webRequestBlocking
chrome.webRequest.onBeforeRequest.addListener(details => {
	debugger
	return {
		cancel: true
	};
}, {
	urls: ["*://*.h3yun.com/doco/*"],
	types: ["main_frame"]
}, ["blocking"]);
