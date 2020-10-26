//监听Cookie
// import cookieManager from "./listeningCookie.js";
// cookieManager.init();
// window.cookieManager = cookieManager;

//加入 氚云列表页，数据标题字段 鼠标右键查看完整数据 功能
require("../singleDataQuery/addSingleDataQueryMenus.js");



//测试
//cookieManager.updateAllCookie();
let testPageUrl = chrome.extension.getURL(
	"singleDataQuery.html?SchemaCode=D000471WZFL&BizObjectId=e091a701-781c-4c07-8d65-15d75297c091");
chrome.tabs.create({
	url: testPageUrl,
	selected: true
});
