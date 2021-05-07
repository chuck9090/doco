<template>
	<div id="app">
		<Layout class="main">
			<Header class="header">
				<Row>
					<Col span="3">
					<img class="unselect logo" src="@/assets/logo.png" alt="" />
					</Col>
					<Col span="17">
					<template v-if="companyInfo!=null">
						<Row class="sub-row" type="flex" justify="space-between">
							<Col span="8" class="info-item"><span
								class="unselect info-title">EngineCode：</span>{{companyInfo.EngineCode}}</Col>
							<Col span="8" class="info-item"><span
								class="unselect info-title">企业：</span>{{companyInfo.CompanyName}}</Col>
							<Col span="8" class="info-item"><span
								class="unselect info-title">版本：</span>{{getCompanyType()}}</Col>
							<Col span="8" class="info-item">
							<img src="" />
							</Col>
						</Row>
					</template>
					<template v-if="userInfo!=null">
						<Row class="sub-row" type="flex" justify="space-between">
							<Col span="8" class="info-item"><span
								class="unselect info-title">UserId：</span>{{userInfo.CurUser.UserId}}</Col>
							<Col span="8" class="info-item"><span
								class="unselect info-title">用户：</span>{{userInfo.CurUser.Name}}</Col>
							<Col span="8" class="info-item"><span
								class="unselect info-title">权限：</span>{{getUserRole()}}</Col>
						</Row>
					</template>
					</Col>
				</Row>
			</Header>
			<Content v-if="canUse" class="content">
				<slot></slot>
			</Content>
		</Layout>
	</div>
</template>

<script>
	import {
		GetUserInfo,
		GetCustomerInfo,
		GetCompanyDevelopmentInfo
	} from "@/utils/apiHelper.js";

	export default {
		data() {
			return {
				userInfo: null,
				companyInfo: null,
				developmentInfo: null,
				canUse: false
			};
		},
		computed: {

		},
		methods: {
			showSuccess(msg) {
				if (msg === undefined || msg === null || msg == "") {
					msg = "NULL";
				}
				this.$Message.success({
					background: true,
					duration: 5,
					content: msg
				});
			},
			showError(msg) {
				if (msg === undefined || msg === null || msg == "") {
					msg = "NULL";
				}
				this.$Message.error({
					background: true,
					duration: 5,
					content: msg
				});
			},
			//获取用户信息
			getUserInfo(success) {
				const _this = this;

				GetUserInfo().then((data) => {
					_this.userInfo = data;

					success && success();
				}).catch((error) => {
					_this.$bus.emit("showError", error);
				});
			},
			getUserRole() {
				const _this = this;

				let role = "";
				if (_this.userInfo) {
					if (_this.userInfo.IsAdministrator) {
						role = "系统管理员";
					} else if (_this.userInfo.IsSubAdministrator) {
						role = "子管理员";
					} else {
						role = "普通用户";
					}
				}
				return role;
			},
			getCompanyType() {
				const _this = this;

				let ty = "";
				if (_this.companyInfo) {
					if (_this.companyInfo.IsDeveloper) {
						ty = "专业版";
					} else {
						ty = "标准版";
					}
				}
				return ty;
			},
			//获取企业信息
			getCompanyInfo(success) {
				const _this = this;

				GetCustomerInfo().then((data) => {
					_this.companyInfo = data;

					success && success();
				}).catch((error) => {
					_this.$bus.emit("showError", error);
				});
			},
			//获取企业EngineSecret信息
			getDevelopmentInfo(success) {
				const _this = this;

				GetCompanyDevelopmentInfo().then((data) => {
					_this.developmentInfo = data;

					success && success();
				}).catch((error) => {
					_this.$bus.emit("showError", error);
				});
			},
			initMasterData() {
				const _this = this;

				_this.canUse = false;

				_this.getUserInfo(() => {
					_this.getCompanyInfo(() => {
						if (_this.getCompanyType() == "专业版") {
							if (_this.getUserRole() == "普通用户") {
								_this.$bus.emit("showError", "doco功能只允许管理员使用！");
							} else {
								_this.getDevelopmentInfo();

								_this.canUse = true;
							}
						} else {
							_this.$bus.emit("showError", "doco功能只支持氚云企业版！");
						}
					});
				});
			},
			getMasterData(callback) {
				const _this = this;

				let t = setInterval(() => {
					if (_this.userInfo && _this.companyInfo && _this.developmentInfo) {
						if (t) {
							clearInterval(t);
							t = null;
						}

						callback({
							userInfo: _this.$data.userInfo,
							companyInfo: _this.$data.companyInfo,
							developmentInfo: _this.$data.developmentInfo
						});
					}
				}, 100);
			},
			getEngineInfo(callback) {
				const _this = this;

				_this.getMasterData((masterData) => {
					callback({
						engineCode: masterData.developmentInfo.EngineCode,
						engineSecret: masterData.developmentInfo.Secret
					});
				});
			},
			registerBus() {
				this.$bus.on("showSuccess", this.showSuccess);
				this.$bus.on("showError", this.showError);
				this.$bus.on("getMasterData", this.getMasterData);
				this.$bus.on("getEngineInfo", this.getEngineInfo);
			}

		},
		created() {
			const _this = this;

			_this.registerBus();

			_this.initMasterData();
		}
	};
</script>

<style scoped>
	#app {
		min-height: 600px;
	}

	#app,
	.main,
	.header {
		min-width: 1200px;
	}

	.content {
		min-width: 1182px;
	}

	.unselect {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.header {
		background: #fff;
		box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
		transition: background-color 0.3s ease-in-out;
		position: fixed;
		z-index: 2;
		width: 100%;
		height: 65px;
		padding: 0;
		line-height: 1;
		font-size: 12px;
	}

	.logo {
		width: 65px;
		height: 65px;
		margin-left: 65px;
	}

	.sub-row,
	.info-item {
		height: 32px;
	}

	.info-item {
		text-align: left;
		line-height: 32px;
	}

	.info-title {
		font-weight: bold;
	}

	.content {
		margin: 73px 8px 8px 8px;
		background: #fff;

		position: absolute;
		width: calc(100% - 16px);
		height: calc(100% - 82px);
		min-height: 500px;
	}
</style>
