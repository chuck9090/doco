import axios from "axios";

const requestHelper = {

	OnAction(url, postData) {
		let pa = qs.stringify({
			"PostData": JSON.stringify(postData)
		});
		return new Promise(function(resolve, reject) {
			axios.post(url, pa, {
				headers: {
					"content-type": "application/x-www-form-urlencoded"
				},
				timeout: 3000
			}).then(function(response) {
				debugger
			}).catch(function(error) {
				debugger
			});
		});
	},
	GetUserInfo() {
		return this.OnAction("https://www.h3yun.com/Home/OnAction", {
			"ActionName": "GetUserInfo"
		});
	}
};

export default requestHelper;
