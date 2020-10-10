require(['../utils/common.js'], function(commonObj) {
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
						alert(JSON.stringify(queryParam));
					} else {
						alert("不符合要求");
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
		*/
		const regu = /window\.top\.openFormDetail\((\'|\")\/Form\/DefaultSheet\/.*\?SchemaCode=.*\&BizObjectId=.*(\'|\")\)/;
		if (regu.test(url)) {
			let result = url.match(/(\'|\").*(\'|\")/)[0];
			result = result.replace(/(\'|\")/g, "");

			let schemaCode = commonObj.common.getQueryString(result, "SchemaCode");
			let bizObjectId = commonObj.common.getQueryString(result, "BizObjectId");

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

});
