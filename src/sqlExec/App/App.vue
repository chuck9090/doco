<template>
	<Master>
		<SqlEditor></SqlEditor>
	</Master>
</template>

<script>
	import Master from "../../components/Master.vue";
	import SqlEditor from "../../components/SqlEditor.vue";

	export default {
		data() {
			return {
				splitValue: 0.6
			};
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
