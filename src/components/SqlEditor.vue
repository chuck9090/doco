<template>
	<div class="sqlEditor">
		<Row class="operation-panel" type="flex" justify="end" :gutter="12">
			<Col><Button icon="md-color-wand" type="success" @click="beautify">美化</Button></Col>
			<Col><Button icon="md-barcode" type="info" @click="compression">压缩</Button></Col>
			<Col><Button icon="md-search" type="primary" @click="exec">校验</Button></Col>
		</Row>
		<editor class="editor" ref="editor" v-model="content" @init="editorInit" :options="editorOptions" lang="sql" theme="iplastic"
		 :width="editorSetting.width" :height="editorSetting.height"></editor>
	</div>
</template>

<script>
	import beaTool from "../utils/beaTool.js";

	export default {
		data() {
			return {
				content: "select * from (select * from h_user limit 0,1 ) a",
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
					//批量选中
					enableMultiselect: false,
					tabSize: 2,
					fontSize: 16
				},
				editorSetting: {
					width: "100%",
					height: "100%"
				}
			};
		},
		props: {
			height: {
				type: Number
			}
		},
		watch: {
			height(val) {
				this.editorSetting.height = (val - 52) + "px";
			}
		},
		methods: {
			editorInit() {
				require("brace/mode/sql");
				require("brace/theme/iplastic");
				require("brace/snippets/sql");
				require("brace/ext/emmet");
				require("brace/ext/language_tools");
				require("brace/ext/searchbox");
			},
			beautify() {
				var _this = this;

				if (_this.content) {
					try {
						_this.content = beaTool.sql(_this.content);
					} catch (e) {
						_this.$bus.emit("showError", e);
					}
				}
			},
			compression() {
				var _this = this;

				if (_this.content) {
					try {
						_this.content = beaTool.sqlmin(beaTool.sql(_this.content));
					} catch (e) {
						_this.$bus.emit("showError", e);
					}
				}
			},
			exec() {
				const _this = this;

				_this.$bus.emit("sqlExec", _this.content);
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
	.sqlEditor {
		width: 100%;
	}

	.operation-panel {
		padding: 10px;
	}

	.editor {
		font-size: 16px;
	}

	/deep/ .ace_search {
		top: 30px;
		right: 30px !important;
	}
</style>
