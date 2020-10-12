<template>
	<div class="main_app">
		<Tabs value="json">
			<TabPane label="JSON" name="json"><h1>singleDataQuery</h1></TabPane>
			<TabPane label="表单" name="form"><Button type="primary">Primary</Button></TabPane>
			<TabPane label="表格" name="table">标签三的内容</TabPane>
		</Tabs>
	</div>
</template>

<script>
const commonObj = require('../../utils/common.js');

export default {
	name: 'singleDataQuery',
	data() {
		return {
			schemaCode: '',
			bizObjectId: ''
		};
	},
	methods: {
		showError(msg) {
			debugger
			this.$Notice.error({
				title: msg
			});
		}
	},
	created() {
		const qParam = window.location.search;
		if (qParam) {
			let schemaCode = commonObj.common.getQueryString(qParam, 'SchemaCode');
			let bizObjectId = commonObj.common.getQueryString(qParam, 'BizObjectId');
			if (schemaCode && bizObjectId) {
				this.schemaCode = schemaCode;
				this.bizObjectId = bizObjectId;
			} else {
				this.showError("URL缺少关键参数！");
			}
		} else {
			this.showError("URL缺少关键参数！");
		}
	}
};
</script>

<style scoped>
.main_app {
	padding: 20px;
}
</style>
