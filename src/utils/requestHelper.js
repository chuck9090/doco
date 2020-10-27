import axios from "axios";
import qs from "qs";

const requestHelper = {

	OnAction(url, postData) {
		let pa = qs.stringify({
			"PostData": JSON.stringify(postData)
		});
		return new Promise((resolve, reject) => {
			axios.post(url, pa, {
				headers: {
					"content-type": "application/x-www-form-urlencoded"
				},
				timeout: 3000
			}).then(function(response) {
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
			}).catch(function(error) {
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
	}
};

export default requestHelper;
