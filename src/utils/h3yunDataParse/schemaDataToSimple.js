//LoadSingleData 接口数据 解析成简单 JSON

const schemaDataToSimple = {
	toSimple(obj) {
		let newObj = {};
		if (obj && typeof === "object") {
			for (let p in obj) {
				if (!filterKey(p)) {
					continue;
				}


			}
		}
	},
	//筛选掉键不符合的字段
	filterKey(key) {
		if (typeof key !== "string") {
			return false;
		}

		if (key === undefined || key === null || key === "" || key.indexOf(".") >= 0) {
			return false;
		}
		return true;
	},
	//筛选掉值不符合的字段
	filterValue(val) {

	}
}
