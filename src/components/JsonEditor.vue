<template>
	<editor class="editor" ref="editor" v-model="jsonStr" @init="editorInit" :options="editorOptions" lang="json" theme="iplastic"
	 width="100%" height="100%"></editor>
</template>

<script>
	export default {
		data() {
			return {
				content: "",
				editorOptions: {
					enableBasicAutocompletion: true,
					enableSnippets: true,
					// 自动补全
					enableLiveAutocompletion: true,
					// 编辑器中间的参考竖线
					showPrintMargin: false,
					// 自动换行
					wrap: "free",
					readOnly: true
				}
			};
		},
		props: {
			jsonStr: {
				type: String,
				required: true
			}
		},
		methods: {
			editorInit: function() {
				require("brace/mode/json");
				require("brace/theme/iplastic");
				require("brace/ext/emmet");
				require("brace/ext/language_tools");
				require("brace/snippets/json");
			}
		},
		components: {
			editor: require("vue2-ace-editor")
		},
		mounted() {
			debugger
		}
	}
</script>

<style scoped>
	.editor {
		font-size: 14px;
	}
</style>
