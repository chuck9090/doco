chrome.runtime.onInstalled.addListener(details => {
	if (details.reason === "install" || details.reason === "update") {
		chrome.storage.local.clear();
	}
});

chrome.runtime.onSuspend.addListener(() => {
	chrome.storage.local.clear();
});