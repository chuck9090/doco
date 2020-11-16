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
	"singleDataQuery.html?SchemaCode=D00021TestFieldType&BizObjectId=60855e91-ee72-4c34-ad11-eb2895463897"
	//"singleDataQuery.html?SchemaCode=z4ypuvof40y2v78gnj31pzxb0&BizObjectId=963a5d5d-34f9-492f-a68f-9c307ba765c9"
);
chrome.tabs.create({
	url: testPageUrl,
	selected: true
});
