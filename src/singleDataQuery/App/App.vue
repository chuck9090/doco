<template>
	<Master>
		<Tabs class="tabs" value="json">
			<TabPane label="JSON" name="json"><h1 style="height: 800px;">singleDataQuery</h1></TabPane>
			<TabPane label="表单" name="form"><Button type="primary">Primary</Button></TabPane>
			<TabPane label="表格" name="table">标签三的内容</TabPane>
		</Tabs>
	</Master>
</template>

<script>
import commonObj from '../../utils/common.js';

import Master from '../../components/Master.vue';

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
			debugger;
			this.$Notice.error({
				title: msg
			});
		}
	},
	created() {
		const qParam = window.location.search;
		if (qParam) {
			debugger;
			let schemaCode = commonObj.getQueryString(qParam, 'SchemaCode');
			let bizObjectId = commonObj.getQueryString(qParam, 'BizObjectId');
			if (schemaCode && bizObjectId) {
				this.schemaCode = schemaCode;
				this.bizObjectId = bizObjectId;
			} else {
				this.showError('URL缺少关键参数！');
			}
		} else {
			this.showError('URL缺少关键参数！');
		}
	},
	components: {
		Master
	}
};
</script>

<style scoped>
.main_app {
	padding: 20px;
}
</style>
