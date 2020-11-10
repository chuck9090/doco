import commonObj from "../utils/common.js";

(function() {
	//氚云列表页，数据标题字段 鼠标右键查看完整数据
	window.chrome.contextMenus.create({
		id: "single-data-query",
		type: "normal",
		title: "查看数据",
		contexts: ["link"],
		onclick: function(param, winInfo) {
			try {
				if (param && param.linkUrl) {
					let queryParam = getLinkUrl(param.linkUrl)
					if (queryParam) {
						let url = chrome.extension.getURL("singleDataQuery.html");
						url = commonObj.createUrl(url, queryParam);
						chrome.tabs.create({
							url: url,
							selected: true
						});
					} else {
						alert("非表单数据！");
					}
				}
			} catch (e) {
				alert("出了点小问题(T＿T)");
			}
		},
		documentUrlPatterns: ["*://*.h3yun.com/App/*"]
	});

	function getLinkUrl(url) {
		/*url demo：
		javascript: window.top.openFormDetail('/Form/DefaultSheet/XXXX?SchemaCode=XXXX&BizObjectId=8ecb379a-ae7e-4627-9463-e682f1158e5b');
		javascript: window.top.openFormDetail('/home.html#/FormDetail/?SchemaCode=D00021f033093a6b7f4f0da790e3fbfd0bfdd4&BizObjectId=b3f3383a-3e3a-47ea-a61a-687a3eb032d7');
		*/
		const regu = /window\.top\.openFormDetail\((\'|\").*\?SchemaCode=.*\&BizObjectId=.*(\'|\")\)/;
		if (regu.test(url)) {
			let result = url.match(/(\'|\").*(\'|\")/)[0];
			result = result.replace(/(\'|\")/g, "");

			let schemaCode = commonObj.getQueryString(result, "SchemaCode");
			let bizObjectId = commonObj.getQueryString(result, "BizObjectId");

			if (schemaCode && bizObjectId) {
				return {
					SchemaCode: schemaCode,
					BizObjectId: bizObjectId
				};
			}

			return null;
		} else {
			return null;
		}
	}
})();
