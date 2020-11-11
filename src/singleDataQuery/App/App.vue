<template>
	<Master>
		<Tabs class="tabs" value="json" type="card">
			<TabPane class="pane pane-json" label="JSON" name="json">
				<JsonEditor :jsonStr="jsonStr"></JsonEditor>
			</TabPane>
			<TabPane label="表单" name="form"><Button type="primary">Primary</Button></TabPane>
		</Tabs>
	</Master>
</template>

<script>
	import commonObj from "../../utils/common.js";
	import requestHelper from "../../utils/requestHelper.js";
	import schemaDataToSimple from "../../utils/h3yunDataParse/schemaDataToSimple.js";

	import Master from "../../components/Master.vue";
	import JsonEditor from "../../components/JsonEditor.vue";

	export default {
		data() {
			return {
				bizInfo: null,
				jsonStr: ""
			};
		},
		methods: {
			getParamByUrl() {
				const _this = this;

				_this.bizInfo = null;
				const qParam = window.location.search;
				if (qParam) {
					let schemaCode = commonObj.getQueryString(qParam, "SchemaCode");
					let bizObjectId = commonObj.getQueryString(qParam, "BizObjectId");
					if (schemaCode && bizObjectId) {
						_this.bizInfo = {
							"schemaCode": schemaCode,
							"bizObjectId": bizObjectId
						};
					} else {
						_this.$bus.emit("showError", "URL缺少关键参数！");
					}
				} else {
					_this.$bus.emit("showError", "URL缺少关键参数！");
				}
			},
			loadJsonData() {
				const _this = this;

				if (_this.bizInfo) {
					requestHelper.LoadSingleData(_this.bizInfo.schemaCode, _this.bizInfo.bizObjectId).then((data) => {
						let jsonData = schemaDataToSimple.toSimple(data);
						_this.jsonStr = commonObj.toBeautifyJson(jsonData);
					}).catch((error) => {
						_this.$bus.emit("showError", error);
					});
				}
			},
			loadData() {
				const _this = this;

				_this.loadJsonData();
			}
		},
		mounted() {
			const _this = this;

			_this.getParamByUrl();

			_this.$bus.emit("getMasterData", (masterData) => {
				_this.loadData();
			});
		},
		components: {
			Master,
			JsonEditor
		}
	};
</script>

<style scoped>
	/deep/ .ivu-tabs-bar {
		margin-bottom: 10px;
	}

	/deep/ .ivu-tabs-content {
		height: calc(100% - 43px);
	}

	.tabs {
		height: 100%;
	}

	.pane {
		box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
		border: rgba(0, 0, 0, .15);
	}
</style>
