//LoadSingleData 接口数据 解析成简单 JSON

const schemaDataToSimple = {
	toSimple(obj) {
		let newObj = {};
		if (obj && typeof obj === "object") {
			for (let p in obj) {
				if (!this.filterKey(p)) {
					continue;
				}
				let val = this.getValue(obj[p]);
				newObj[p] = val;
			}
		}
		return newObj;
	},
	//系统其它补充字段
	filterKeys: ["ActivityCode", "InstanceId", "InstanceName", "OriginateDate", "OriginateFullTime", "OriginateTime",
		"Originator"
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
				const infoType = info.Type;
				let fun = this["getValue_" + infoType];
				if (fun && typeof fun === "function") {
					return fun.call(this, info.Value);
				}
			}
		}
		return null;
	},
	//布尔型
	getValue_1(val) {
		return val;
	},
	//日期时间型
	getValue_5(val) {
		return val;
	},
	//数值型
	getValue_7(val) {
		return val;
	},
	//Status 字段
	getValue_9(val) {
		return val;
	},
	//多行文本型
	getValue_13(val) {
		return val;
	},
	//单行文本型
	getValue_14(val) {
		return val;
	},
	//图片型
	getValue_23(val) {
		let imgs = [];
		if (val && val.length) {
			for (let i = 0; i < val.length; i++) {
				if (val[i] && typeof val[i] === "object" && typeof val[i]["Code"] === "string") {
					imgs.push(val[i]["Code"]);
				}
			}
		}
		return imgs;
	},
	//附件型
	getValue_24(val) {
		let files = [];
		if (val && val.length) {
			for (let i = 0; i < val.length; i++) {
				if (val[i] && typeof val[i] === "object" && typeof val[i]["Code"] === "string") {
					files.push(val[i]["Code"]);
				}
			}
		}
		return files;
	},
	//人员单选、部门单选型
	getValue_26(val) {
		if (val && val.length) {
			if (val[0] && typeof val[0] === "object" && typeof val[0]["ObjectId"] === "string") {
				return val[0]["ObjectId"];
			}
		}
		return null;
	},
	//人员多选、部门多选型
	getValue_27(val) {
		let users = [];
		if (val && val.length) {
			for (let i = 0; i < val.length; i++) {
				if (val[i] && typeof val[i] === "object" && typeof val[i]["ObjectId"] === "string") {
					users.push(val[i]["ObjectId"]);
				}
			}
		}
		if (users && users.length) {
			return users;
		} else {
			return null;
		}
	},
	//子表
	getValue_41(val) {
		let cdatas = [];
		if (val && val["R"] && val["R"].length) {
			for (let i = 0; i < val["R"].length; i++) {
				let item = val["R"][i];
				if (item && typeof item === "object") {
					let newItem = {};
					for (let p in item) {
						let itemVal = this.getValue(item[p]);
						newItem[p] = itemVal;
					}
					cdatas.push(newItem);
				}
			}
		}
		return cdatas;
	},
	//关联表单型
	getValue_50(val) {
		return val;
	},
	//关联表单多选型
	getValue_51(val) {
		return val;
	},
	//位置（定位，地图选择）
	getValue_55(val) {
		return val;
	},
	//地址
	getValue_56(val) {
		return val;
	}
};

export default schemaDataToSimple;
