<template>
	<div class="main_app">
		<h1>singleDataQuery</h1>
		<Button type="primary">Primary</Button>
	</div>
</template>

<script>
const commonObj = require('../../utils/common.js');

export default {
	name: 'singleDataQuery',
	beforeCreate() {
		const qParam = window.location.search;
		if (qParam) {
			let schemaCode = commonObj.common.getQueryString(qParam, 'SchemaCode');
			let bizObjectId = commonObj.common.getQueryString(qParam, 'BizObjectId');
			if (schemaCode && bizObjectId) {
				alert(schemaCode + '&' + bizObjectId);
			} else {
				alert('缺少参数');
			}
		} else {
			alert('缺少参数');
		}
	}
};
</script>

<style scoped>
.main_app {
	font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
