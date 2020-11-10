//加入 氚云列表页，数据标题字段 鼠标右键查看完整数据 功能
require("../singleDataQuery/addSingleDataQueryMenus.js");

//测试
// let testPageUrl = chrome.extension.getURL(
// 	"sqlExec.html"
// );
// chrome.tabs.create({
// 	url: testPageUrl,
// 	selected: true
// });

let testPageUrl = chrome.extension.getURL(
	"singleDataQuery.html?SchemaCode=863a3dbcc9c5471597acf6e7817108ea&BizObjectId=fabb871c-8973-438d-8d67-08159da27f86"
);
chrome.tabs.create({
	url: testPageUrl,
	selected: true
});
