<template>
	<Master>
		<Tabs class="tabs" value="schema" type="card">
			<TabPane class="pane" label="JSON" name="json">
				<JsonEditor :jsonStr="jsonStr"></JsonEditor>
			</TabPane>
			<TabPane class="pane" label="表单" name="schema">
				<Schema :schemaData="schemaData"></Schema>
			</TabPane>
			<TabPane class="pane" label="源数据" name="source">
				<JsonEditor :jsonStr="sourceJson"></JsonEditor>
			</TabPane>
		</Tabs>
	</Master>
</template>

<script>
	import commonObj from "../../utils/common.js";
	import requestHelper from "../../utils/requestHelper.js";
	import schemaDataToSimple from "../../utils/h3yunDataParse/schemaDataToSimple.js";
	import schemaDataToDetails from "../../utils/h3yunDataParse/schemaDataToDetails.js";

	import Master from "../../components/Master.vue";
	import JsonEditor from "../../components/JsonEditor.vue";
	import Schema from "../../components/Schema.vue";

	export default {
		data() {
			return {
				bizInfo: null,
				sourceJson: "",
				jsonStr: "",
				schemaData: []
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
			loadJsonStr() {
				const _this = this;

				if (_this.bizInfo) {
					requestHelper.LoadSingleData(_this.bizInfo.schemaCode, _this.bizInfo.bizObjectId).then((data) => {
						_this.sourceJson = commonObj.toBeautifyJson(data);

						let jsonData = schemaDataToSimple.toSimple(data);
						_this.jsonStr = commonObj.toBeautifyJson(jsonData);

						_this.schemaData = schemaDataToDetails.toDetails(data);
					}).catch((error) => {
						_this.$bus.emit("showError", error);
					});
				}
			},
			loadData() {
				const _this = this;

				_this.loadJsonStr();
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
			JsonEditor,
			Schema
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
