<template>
	<Master>
		<SqlEditor style="position:relative;z-index:1;" :height="topHeight"></SqlEditor>

		<Split ref="splitPanel" class="split" v-model="splitRate" mode="vertical" min="100px" max="1" @on-move-start="onDrag=true"
		 @on-move-end="onDrag=false" @on-moving="calcPanelHeight">
			<Table slot="bottom" class="table" v-if="tableData" v-show="!onDrag" :border="true" :stripe="true" :showHeader="true"
			 maxWidth="100%" :maxHeight="bottomHeight" size="small" noDataText="无结果集" :data="tableData.rows" :columns="tableData.cols"></Table>
		</Split>

		<Spin v-if="false" size="large" fix></Spin>
	</Master>
</template>

<script>
	import Master from "../../components/Master.vue";
	import SqlEditor from "../../components/SqlEditor.vue";

	import apiHelper from "../../utils/apiHelper.js";

	export default {
		data() {
			return {
				splitRate: 0.8,
				topHeight: 0,
				bottomHeight: 0,
				onDrag: false,
				tableData: null
			};
		},
		methods: {
			initSplitRate() {
				const _this = this;

				if (_this.splitRate > 0.8) {
					_this.splitRate = 0.8;
				}
				_this.onDrag = false;
			},
			calcPanelHeight() {
				const _this = this;

				const splitPanel = _this.$refs["splitPanel"];
				if (splitPanel) {
					let panelHeight = splitPanel.$el.offsetHeight;
					_this.topHeight = _this.splitRate * panelHeight;
					_this.bottomHeight = panelHeight - _this.topHeight;
				}
			},
			sqlExec(sql) {
				const _this = this;

				_this.initTableData();

				if (sql) {
					apiHelper.CheckSQL(sql).then((data) => {
						_this.setTableData(data);
						_this.initSplitRate();
						_this.calcPanelHeight();
					}).catch((error) => {
						_this.$bus.emit("showError", error);
					});
				}
			},
			initTableData() {
				const _this = this;

				_this.tableData = null;
			},
			getPanelWidth() {
				const _this = this;

				let panelMinWidth = 1000;
				let panelWidth = panelMinWidth;

				const splitPanel = _this.$refs["splitPanel"];
				if (splitPanel) {
					if (splitPanel.$el.offsetWidth > panelMinWidth) {
						panelWidth = splitPanel.$el.offsetWidth;
					}
				}

				return panelWidth;
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

						let indexColWidth = 60;
						let colMinWidth = 150;
						let panelWidth = _this.getPanelWidth();
						panelWidth = panelWidth - indexColWidth - 20;
						let colWidth = panelWidth / data.cols.length;
						if (colWidth < colMinWidth) {
							colWidth = colMinWidth;
						}

						let columns = data.cols.map((item) => {
							if (typeof item["ColumnName"] === "string" && item["ColumnName"] !== "") {
								return {
									"title": item["ColumnName"],
									"key": item["ColumnName"],
									"align": "center",
									"tooltip": true,
									"resizable": true,
									"width": colWidth
								};
							}
							throw new Error("氚云响应数据校验不通过！");
						});
						if (columns.length) {
							columns.unshift({
								type: "index",
								width: indexColWidth,
								align: "center",
								fixed: "left"
							});
							tData["cols"] = columns;
						} else {
							throw new Error("氚云响应数据校验不通过！");
						}

						_this.initTableData();
						_this.tableData = tData;
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

			_this.$bus.emit("getMasterData", () => {
				_this.$bus.on("sqlExec", _this.sqlExec);

				_this.calcPanelHeight();
			});
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
		position: absolute;
		top: 0;
	}

	/deep/ .ivu-table-small {
		font-size: 14px !important;
	}
</style>
