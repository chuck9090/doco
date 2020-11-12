<template>
	<editor class="editor" ref="editor" v-model="content" @init="editorInit" :options="editorOptions" lang="json" theme="iplastic"
	 width="100%" height="100%"></editor>
</template>

<script>
	export default {
		data() {
			return {
				content: "",
				editorOptions: {
					//自动完成
					enableBasicAutocompletion: true,
					enableSnippets: true,
					// 自动补全
					enableLiveAutocompletion: true,
					// 编辑器中间的参考竖线
					showPrintMargin: false,
					// 自动换行
					wrap: "free",
					//只读
					readOnly: true,
					//批量选中
					enableMultiselect: false
				}
			};
		},
		props: {
			jsonStr: {
				type: String,
				required: true
			}
		},
		watch: {
			jsonStr(val) {
				this.content = val;
			}
		},
		methods: {
			editorInit: function() {
				require("brace/mode/json");
				require("brace/theme/iplastic");
				require("brace/ext/emmet");
				require("brace/ext/language_tools");
				require("brace/snippets/json");
				require("brace/ext/searchbox");
			}
		},
		components: {
			editor: require("vue2-ace-editor")
		},
		mounted() {
			var _this = this;

			window.ed = _this.$refs.editor.editor;
		}
	}
</script>

<style scoped>
	.editor {
		font-size: 14px;
	}


	/deep/ .ace_search {
		top: 30px;
		right: 30px !important;
	}
</style>
