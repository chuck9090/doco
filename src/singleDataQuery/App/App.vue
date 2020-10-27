<template>
	<Master>
		<Tabs class="tabs" value="json">
			<TabPane label="JSON" name="json">
				<h1 style="height: 800px;">singleDataQuery</h1>
			</TabPane>
			<TabPane label="表单" name="form"><Button type="primary">Primary</Button></TabPane>
			<TabPane label="表格" name="table">标签三的内容</TabPane>
		</Tabs>
	</Master>
</template>

<script>
	import commonObj from "../../utils/common.js";

	import Master from "../../components/Master.vue";

	export default {
		data() {
			return {
				schemaCode: "",
				bizObjectId: ""
			};
		},
		methods: {
			getParamByUrl() {
				const _this = this;

				const qParam = window.location.search;
				if (qParam) {
					let schemaCode = commonObj.getQueryString(qParam, "SchemaCode");
					let bizObjectId = commonObj.getQueryString(qParam, "BizObjectId");
					if (schemaCode && bizObjectId) {
						_this.schemaCode = schemaCode;
						_this.bizObjectId = bizObjectId;
					} else {
						_this.$bus.emit("showError", "URL缺少关键参数！");
					}
				} else {
					_this.$bus.emit("showError", "URL缺少关键参数！");
				}
			},
		},
		mounted() {
			const _this = this;

			_this.getParamByUrl();

			const t = setInterval(() => {
				_this.$bus.emit("getMasterData", (masterData) => {
					if (masterData) {
						clearInterval(t);
					}
				});
			}, 200);
		},
		components: {
			Master
		}
	};
</script>

<style scoped>

</style>
