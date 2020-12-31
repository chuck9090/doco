//LoadSingleData 接口数据 解析成简易表单数据的 JSON

const schemaDataToDetails = {
	toDetails(obj) {
		let data = [];
		if (obj && typeof obj === "object") {
			for (let p in obj) {
				if (!this.filterKey(p)) {
					continue;
				}
				let val = this.getValue(obj[p]);
				if (val && typeof val === "object") {
					val["code"] = p;
					data.push(val);
				}
			}
		}

		return data;
	},
	//系统其它补充字段
	filterKeys: ["ActivityCode", "InstanceId", "InstanceName", "OriginateDate", "OriginateFullTime", "OriginateTime",
		"Originator", "IconId"
	],
	//筛选掉键不符合的字段
	filterKey(key) {
		if (typeof key !== "string") {
			return false;
		}

		//过滤 无键名、键名中带“.”的字段（这类字段都是系统的补充字段）
		if (key === undefined || key === null || key === "" || key.indexOf(".") >= 0) {
			return false;
		}

		//过滤 系统其它补充字段
		if (this.filterKeys && this.filterKeys.length) {
			for (let i = 0; i < this.filterKeys.length; i++) {
				if (this.filterKeys[i] === key) {
					return false;
				}
			}
		}

		return true;
	},
	getValue(info) {
		if (info && typeof info === "object" && typeof info.Type === "number") {
			if (typeof info.Value !== "undefined") {
				return {
					"type": info.Type,
					"name": (info.DisplayName || ""),
					"value": info.Value
				};
			}
		}
		throw new Error("值格式不符！");
	}
};

export default schemaDataToDetails;
