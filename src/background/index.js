
//加入 氚云列表页，数据标题字段 鼠标右键查看完整数据 功能
require("../singleDataQuery/addSingleDataQueryMenus.js");



//测试
let testPageUrl = chrome.extension.getURL(
	"singleDataQuery.html?SchemaCode=D001509mms60wxbv7tzufoa6wlo2dni0&BizObjectId=ef071fab-2043-4e6e-9f13-a877425a5a5c");
chrome.tabs.create({
	url: testPageUrl,
	selected: true
});
