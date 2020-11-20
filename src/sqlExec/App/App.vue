<template>
	<Master>
		<SqlEditor></SqlEditor>
		<Table class="table" v-if="tableData&&tableData.length" v-for="(item,index) in tableData" :key="index" :border="true" :stripe="true"
		 :showHeader="true" :maxHeight="400" size="small" noDataText="无数据" :data="item.rows" :columns="item.cols"></Table>
	</Master>
</template>

<script>
	import Master from "../../components/Master.vue";
	import SqlEditor from "../../components/SqlEditor.vue";

	import requestHelper from "../../utils/requestHelper.js";

	export default {
		data() {
			return {
				tableData: null
			};
		},
		methods: {
			sqlExec(sql) {
				const _this = this;

				_this.initTableData();

				if (sql) {
					requestHelper.CheckSQL(sql).then((data) => {
						_this.setTableData(data);
					}).catch((error) => {
						_this.$bus.emit("showError", error);
					});
				}
			},
			initTableData() {
				const _this = this;

				_this.tableData = [];
			},
			setTableData(data) {
				const _this = this;

				try {
					if (data && data.cols && data.cols.length && data.rows) {
						let tData = {
							"cols": null,
							"rows": null
						};

						if (data.rows.length) {
							tData["rows"] = data.rows;
						} else {
							tData["rows"] = [];
						}

						let columns = data.cols.map((item) => {
							if (typeof item["ColumnName"] === "string" && item["ColumnName"] !== "") {
								return {
									"title": item["ColumnName"],
									"key": item["ColumnName"],
									"align": "center",
									// "ellipsis": true,
									"tooltip": true,
									"resizable": true,
									"width": 120
								};
							}
							throw new Error("氚云响应数据校验不通过！");
						});
						if (columns.length) {
							tData["cols"] = columns;
						} else {
							throw new Error("氚云响应数据校验不通过！");
						}

						_this.initTableData();
						_this.tableData.push(tData);
						debugger
					} else {
						throw new Error("氚云响应数据校验不通过！");
					}
				} catch (e) {
					_this.$bus.emit("showError", e);
				}
			}
		},
		mounted() {
			const _this = this;

			_this.$bus.on("sqlExec", _this.sqlExec);
		},
		components: {
			Master,
			SqlEditor
		}
	}
</script>

<style scoped>
	.split {
		box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
		border: rgba(0, 0, 0, .15);
	}

	.split-top {
		position: relative;
		width: 100%;
		height: 100%;
	}
</style>
