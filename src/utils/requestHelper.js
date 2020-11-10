import axios from "axios";
import qs from "qs";
import commonObj from "./common.js";

const requestHelper = {
	Invoke(engineCode, engineSecret, postData) {
		const url = "https://www.h3yun.com/OpenApi/Invoke";

		return new Promise((resolve, reject) => {
			axios.post(url, postData, {
				headers: {
					"Content-Type": "application/json",
					"EngineCode": engineCode,
					"EngineSecret": engineSecret
				},
				timeout: 5000
			}).then((response) => {
				if (response.status == 200 && response.data) {
					if (response.data.Successful && response.data.ReturnData) {
						resolve(response.data.ReturnData);
					} else if (response.data.ErrorMessage) {
						reject(response.data.ErrorMessage);
					} else {
						reject("氚云Invoke接口响应数据异常！");
					}
				} else {
					reject("氚云Invoke接口请求失败！");
				}
			}).catch((error) => {
				reject("氚云Invoke接口请求失败！");
			});
		});
	},
	LoadBizObject(engineInfo, bizInfo) {
		return new Promise((resolve, reject) => {
			this.Invoke(engineInfo.engineCode, engineInfo.engineSecret, {
				"ActionName": "LoadBizObject",
				"SchemaCode": bizInfo.schemaCode,
				"BizObjectId": bizInfo.bizObjectId
			}).then((data) => {
				if (data.BizObject) {
					resolve(data.BizObject);
				} else {
					reject("氚云LoadBizObject接口响应数据异常！");
				}
			}).catch((error) => {
				reject(error);
			});
		});
	},
	OnAction(url, postData) {
		let pa = qs.stringify({
			"PostData": JSON.stringify(postData)
		});
		return new Promise((resolve, reject) => {
			axios.post(url, pa, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				timeout: 5000
			}).then((response) => {
				if (response.status == 200 && response.data) {
					if (response.data.Successful && response.data.ReturnData) {
						resolve(response.data.ReturnData);
					} else if (response.data.ErrorMessage) {
						reject(response.data.ErrorMessage);
					} else {
						reject("氚云OnAction接口响应数据异常！");
					}
				} else {
					reject("氚云OnAction接口请求失败！");
				}
			}).catch((error) => {
				reject("氚云OnAction接口请求失败！");
			});
		});
	},
	GetUserInfo() {
		return this.OnAction("https://www.h3yun.com/Home/OnAction", {
			"ActionName": "GetUserInfo"
		});
	},
	GetCustomerInfo() {
		return this.OnAction("https://www.h3yun.com/Navigation/OnAction", {
			"ActionName": "GetCustomerInfo"
		});
	},
	GetCompanyDevelopmentInfo() {
		return this.OnAction("https://www.h3yun.com/Console/Systemintergration/OnAction", {
			"ActionName": "GetCompanyDevelopmentInfo"
		});
	},
	CheckSQL(sql) {
		return this.OnAction("https://www.h3yun.com/Console/Reporting/OnAction", {
			"ActionName": "CheckSQL",
			"Sql": sql,
			"Columns": "[]"
		});
	},
	LoadSingleData(schemaCode, bizObjectId) {
		return new Promise((resolve, reject) => {
			this.OnAction("https://www.h3yun.com/Form/OnAction", {
				"ActionName": "Load",
				"SchemaCode": schemaCode,
				"BizObjectId": bizObjectId,
				"SideModal": true,
				"WorkItemID": "",
				"IsExternalForm": false,
				"IsExternalShare": false,
				"TimeStamp": Math.round(new Date()),
				"IsNewForm": true,
				"ddIngPid": "",
				"ddIngTid": ""
			}).then((data) => {
				if (data.ResponseContext && typeof data.ResponseContext === "string") {
					let resData = commonObj.jsonParse(data.ResponseContext);
					if (resData && resData.ReturnData) {
						resolve(resData.ReturnData);
						return;
					}
				}

				reject("氚云Load接口响应数据异常！");
			}).catch((error) => {
				reject(error);
			});
		});
	}
};

export default requestHelper;
