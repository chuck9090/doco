//加入 氚云列表页，数据标题字段 鼠标右键查看完整数据 功能
require("../singleDataQuery/addSingleDataQueryMenus.js");

//sql页面
// let testPageUrl = chrome.extension.getURL(
// 	"sqlExec.html"
// );
// chrome.tabs.create({
// 	url: testPageUrl,
// 	selected: true
// });

//表单数据查看页面
let testPageUrl = chrome.extension.getURL(
	"singleDataQuery.html?SchemaCode=D1023045452ff8dd2b5462a93b4a6711760d354&BizObjectId=bba48fe2-9f48-43fb-b20b-51346e1bb1a9"
);
chrome.tabs.create({
	url: testPageUrl,
	selected: true
});
