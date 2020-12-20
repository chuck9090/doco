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

	import sqlEditorCompleterWords from "@/utils/sqlEditorCompleterWords";

	export default {
		data() {
			return {
				operationHieght: 52, //操作面板高度
				clipboard: null, //复制插件对象
				content: "select objectid,name from h_user", //内容
				editorOptions: {
					enableBasicAutocompletion: true, //自动完成
					enableSnippets: true,
					enableLiveAutocompletion: true, // 自动补全
					showPrintMargin: false, // 编辑器中间的参考竖线
					wrap: "free", // 自动换行
					enableMultiselect: false, //批量选中
					fixedWidthGutter: true, //固定行号区域宽度（似乎无效）
					enableEmmet: true, //启用快速完成功能
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
			editorInit(ed) { //初始化编辑器，将编辑器功能添加进来
				require("brace/mode/sql");
				require("brace/theme/iplastic");
				require("brace/snippets/sql");
				require("brace/ext/emmet");
				require("brace/ext/language_tools");
				require("brace/ext/searchbox");

				const _this = this;

				_this.editor = ed;
				window.editor = ed; //方便console测试
			},
			addCommands() { //添加快捷键
				const _this = this;

				_this.editor.commands.addCommands([{
						name: 'save',
						bindKey: {
							win: 'Ctrl-S',
							mac: 'Command-S'
						},
						exec() {
							_this.saveSql();
						}
					},
					{
						name: 'beautify',
						bindKey: {
							win: 'Ctrl-K',
							mac: 'Command-K'
						},
						exec() {
							_this.beautify();
						}
					},
					{
						name: 'compression',
						bindKey: {
							win: 'Ctrl-M',
							mac: 'Command-M'
						},
						exec() {
							_this.compression();
						}
					}, {
						name: 'exec',
						bindKey: {
							win: 'Ctrl-Enter',
							mac: 'Command-Enter'
						},
						exec() {
							_this.exec();
						}
					}
				]);
			},
			addCompleters() { //添加代码提示选项
				const _this = this;

				let completers = [{
					getCompletions(editor, session, pos, prefix, callback) {
						return callback(null, sqlEditorCompleterWords.completerWordsForSystemTable);
					}
				}];

				if (completers && completers.length) {
					if (_this.editor.completers && _this.editor.completers.length) {
						completers.forEach((e, i) => {
							_this.editor.completers.push(e);
						});
					} else {
						_this.editor.completers = completers;
					}
				}
			},
			contentChange() {
				const _this = this;

				if (_this.editor) {
					_this.editor.execCommand("startAutocomplete");
				}
			},
			getEditor() { //获取编辑器对象
				const _this = this;

				if (_this.editor) {
					return _this.editor;
				}
				_this.$bus.emit("showError", "编辑器未初始化完成！");
				return null;
			},
			setContent(val) { //以有历史记录方式设置编辑器值（为了撤销操作）
				const _this = this;

				_this.$nextTick(() => {
					let ed = _this.getEditor();
					if (ed && val != _this.content) {
						ed.setValue(val, 1);
					}
				});
			},
			getSelectedContent() { //获取编辑器选中内容
				const _this = this;

				let ed = _this.getEditor();
				if (ed) {
					return ed.session.getTextRange(ed.getSelectionRange());
				}
			},
			beautify() { //美化
				const _this = this;

				if (_this.content) {
					try {
						_this.setContent(beaTool.sql(_this.content));
					} catch (e) {
						_this.$bus.emit("showError", e);
					}
				}
			},
			compression() { //压缩
				const _this = this;

				if (_this.content) {
					try {
						_this.setContent(beaTool.sqlmin(beaTool.sql(_this.content)));
					} catch (e) {
						_this.$bus.emit("showError", e);
					}
				}
			},
			exec() { //执行SQL
				const _this = this;

				let sql = _this.content;
				if (!sql) {
					_this.$bus.emit("showError", "请先键入SQL语句！");
					return;
				}

				let selectedContent = _this.getSelectedContent();
				if (selectedContent === undefined) {
					return;
				} else if (selectedContent) {
					sql = selectedContent;
				}

				_this.$bus.emit("sqlExec", sql);
			},
			initCopySql() { //初始化 复制按钮 将SQL复制到粘贴板功能
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
			destroyClipboard() { //销毁 复制按钮 将SQL复制到粘贴板功能
				const _this = this;

				if (_this.clipboard) {
					_this.clipboard.destroy();
				}
			},
			saveSql() { //将SQL通过 .sql 文件保存到本地
				const _this = this;

				let sql = _this.content || "";

				let blob = new Blob([sql], {
					type: "text/plain;charset=utf-8"
				});
				fileSaver.saveAs(blob, "SQL for h3yun.txt");
			}
		},
		components: {
			editor: require("vue2-ace-editor")
		},
		mounted() {
			const _this = this;

			_this.addCommands();
			_this.addCompleters();
			_this.editor.on("change", _this.contentChange);

			_this.initCopySql();
		},
		destroyed() {
			_this.destroyClipboard();
		}
	}
</script>

<style scoped>
	/deep/ .ace_search {
		top: 30px;
		right: 30px !important;
	}

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
</style>
