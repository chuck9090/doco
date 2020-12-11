<template>
	<div class="sqlEditor">
		<div class="operation-main" :style="{'height':operationHieght+'px' }">
			<div class="operation-item" style="left: 0;">
				<Row class="operation-panel" type="flex" justify="start" :gutter="12">
					<Col><Button class="help-btn" size="small" shape="circle" icon="md-help" type="info" ghost></Button></Col>
					<Col><Button ref="copySqlBtn" icon="md-copy">复制</Button></Col>
					<Col><Button icon="md-folder" @click="saveSql">保存</Button></Col>
				</Row>
			</div>
			<div class="operation-item" style="right: 0;">
				<Row class="operation-panel" type="flex" justify="end" :gutter="12">
					<Col><Button icon="md-color-wand" type="success" @click="beautify">美化</Button></Col>
					<Col><Button icon="md-barcode" type="info" @click="compression">压缩</Button></Col>
					<Col><Button icon="md-search" type="primary" @click="exec">查询</Button></Col>
				</Row>
			</div>
		</div>

		<editor class="editor" ref="editor" v-model="content" @init="editorInit" :options="editorOptions" lang="sql" theme="iplastic"
		 :width="editorSetting.width" :height="editorSetting.height"></editor>
	</div>
</template>

<script>
	import ClipboardJS from "clipboard";
	import fileSaver from '../utils/fileSaver.js';
	import beaTool from "../utils/beaTool.js";

	export default {
		data() {
			return {
				operationHieght: 52,
				clipboard: null,
				content: "select objectid,name from h_user",
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
				},
				editor: null
			};
		},
		props: {
			height: {
				type: Number
			}
		},
		watch: {
			height(val) {
				this.editorSetting.height = (val - this.operationHieght) + "px";
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
			getEditor() {
				const _this = this;

				if (_this.editor) {
					return _this.editor;
				} else {
					_this.$bus.emit("showError", "编辑器未初始化完成！");
				}
			},
			setValue(val) {
				const _this = this;

				_this.$nextTick(() => {
					let editot = _this.getEditor();
					if (editot) {
						_this.editor.setValue(val, 1);
					}
				});
			},
			beautify() {
				const _this = this;

				if (_this.content) {
					try {
						_this.setValue(beaTool.sql(_this.content));
					} catch (e) {
						_this.$bus.emit("showError", e);
					}
				}
			},
			compression() {
				const _this = this;

				if (_this.content) {
					try {
						_this.setValue(beaTool.sqlmin(beaTool.sql(_this.content)));
					} catch (e) {
						_this.$bus.emit("showError", e);
					}
				}
			},
			getSelectedText() {
				const _this = this;

				let editot = _this.getEditor();
				if (editot) {
					alert(11);
				}
			},
			exec() {
				const _this = this;

				_this.$bus.emit("sqlExec", _this.content);
			},
			initCopySql() {
				const _this = this;

				_this.destroyClipboard();

				_this.clipboard = new ClipboardJS(_this.$refs["copySqlBtn"].$el, {
					text: function() {
						return _this.content || "";
					}
				});

				_this.clipboard.on('success', function(e) {
					_this.$bus.emit("showSuccess", "SQL已复制到粘贴板！");
					e.clearSelection();
				});

				_this.clipboard.on('error', function(e) {
					_this.$bus.emit("showError", "SQL复制失败！");
				});
			},
			destroyClipboard() {
				const _this = this;

				if (_this.clipboard) {
					_this.clipboard.destroy();
				}
			},
			saveSql() {
				const _this = this;

				let sql = _this.content || "";

				let blob = new Blob([sql], {
					type: "text/plain;charset=utf-8"
				});
				fileSaver.saveAs(blob, "SQL for h3yun.sql");
			}
		},
		components: {
			editor: require("vue2-ace-editor")
		},
		mounted() {
			const _this = this;

			_this.initCopySql();

			_this.editor = _this.$refs.editor.editor;
			window.ed = _this.editor;
		},
		destroyed() {
			_this.destroyClipboard();
		}
	}
</script>

<style scoped>
	.sqlEditor {
		width: 100%;
	}

	.operation-main {
		position: relative;
		width: 100%;
	}

	.operation-item {
		position: absolute;
		width: 50%;
		padding: 10px;
	}

	.help-btn {
		width: 16px !important;
		height: 16px !important;
		font-size: 12px !important;
		line-height: 1 !important;
		position: relative;
		top: 5px;
	}

	.help-btn /deep/ i {
		line-height: 1 !important;
	}

	.editor {
		font-size: 16px;
	}

	/deep/ .ace_search {
		top: 30px;
		right: 30px !important;
	}
</style>
