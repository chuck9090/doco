//LoadSingleData 接口数据 解析成简易表单数据的 JSON

const schemaDataToDetails = {
	toDetails() {
		let newObj = {};
		if (obj && typeof obj === "object") {
			for (let p in obj) {
				// if (!this.filterKey(p)) {
				// 	continue;
				// }
				// let val = this.getValue(obj[p]);
				// newObj[p] = val;
			}
		}
		return newObj;
	}
};

export default schemaDataToDetails;
