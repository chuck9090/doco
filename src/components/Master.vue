<template>
	<div id="app">
		<Layout>
			<Header class="header">
				<Row>
					<Col span="3">
					<img class="logo" src="../assets/logo.png" alt="" />
					</Col>
					<Col span="16">
					<template v-if="companyInfo!=null">
						<Row class="sub-row" type="flex" justify="space-between">
							<Col span="8" class="info-item"><span class="info-title">企业：</span>{{companyInfo.CompanyName}}</Col>
							<Col span="8" class="info-item"><span class="info-title">EngineCode：</span>{{companyInfo.EngineCode}}</Col>
							<Col span="8" class="info-item"><span class="info-title">版本：</span>{{getCompanyType()}}</Col>
						</Row>
					</template>
					<template v-if="userInfo!=null">
						<Row class="sub-row" type="flex" justify="space-between">
							<Col span="8" class="info-item"><span class="info-title">用户：</span>{{userInfo.CurUser.Name}}</Col>
							<Col span="8" class="info-item"><span class="info-title">UserId：</span>{{userInfo.CurUser.UserId}}</Col>
							<Col span="8" class="info-item"><span class="info-title">权限：</span>{{getUserRole()}}</Col>
						</Row>
					</template>
					</Col>
					<Col span="5">

					</Col>
				</Row>
			</Header>
			<Content class="content">
				<slot></slot>
			</Content>
		</Layout>
	</div>
</template>

<script>
	import requestHelper from "../utils/requestHelper.js";

	export default {
		data() {
			return {
				userInfo: null,
				companyInfo: null
			};
		},
		computed: {

		},
		methods: {
			showError(msg) {
				if (msg === undefined || msg === null || msg == "") {
					msg = "NULL";
				}
				this.$Message.error({
					background: true,
					duration: 4.5,
					content: msg
				});
			},
			//获取用户信息
			getUserInfo() {
				const _this = this;

				requestHelper.GetUserInfo().then((data) => {
					_this.userInfo = data;
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
			//获取企业信息
			getCompanyInfo() {
				const _this = this;

				requestHelper.GetCustomerInfo().then((data) => {
					_this.companyInfo = data;
				}).catch((error) => {
					_this.$bus.emit("showError", error);
				});
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
			//主框架数据加载完毕
			getMasterData(callback) {
				const _this = this;

				if (_this.userInfo && _this.companyInfo) {
					callback({
						userInfo: _this.userInfo,
						companyInfo: _this.companyInfo
					});
				}
				callback(null);
			},
			registerBus() {
				this.$bus.on("showError", this.showError);
				this.$bus.on("getMasterData", this.getMasterData);
			}
		},
		created() {
			const _this = this;

			_this.registerBus();

			_this.getCompanyInfo();
			_this.getUserInfo();
		}
	};
</script>

<style scoped>
	#app {
		/* overflow: hidden; */

	}

	.header {
		background: #fff;
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
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		font-weight: bold;
	}

	.content {
		margin: 73px 8px 8px 8px;
		background: #fff;
		min-height: 500px;
	}
</style>
