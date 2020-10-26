<template>
	<div id="app">
		<Layout>
			<Header class="header">
				<Row>
					<Col span="1" class="logo">
					<img src="../assets/logo.png" alt="" width="100%" height="100%" />
					</Col>
					<Col class="user-info">
					<Row>
						<div class="info-item">企业名：</div>
						<div class="info-item">EngineCode：</div>
						<div class="info-item">版本：</div>
						<div class="info-item">用户：</div>
						<div class="info-item">UserId：</div>
						<div class="info-item">角色：</div>
					</Row>
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
	import qs from "qs";
	import axios from "axios";

	export default {
		data() {
			return {
				cookies: ''
			};
		},
		methods: {
			showError(msg) {
				this.$Notice.error({
					title: msg
				});
			},
			getCookies() {
				var _this = this;

				const bg = chrome.extension.getBackgroundPage();
				if (bg && bg["cookieManager"] && bg["cookieManager"]["cacheCookies"] && typeof bg["cookieManager"]["cacheCookies"] ===
					"object" && Object.keys(bg["cookieManager"]["cacheCookies"]).length) {
					_this.cookies = JSON.stringify(bg["cookieManager"]["cacheCookies"]);
				} else {
					_this.showError("请先登录氚云！");
				}
			}
		},
		created() {
			var _this = this;

			_this.getCookies();

			_this.request();
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
	}

	.logo {
		width: 60px;
		height: 60px;
	}

	.user-info {
		float: left;
		padding-left: 120px;
	}

	.user-info .info-item {
		display: inline;
	}

	.content {
		margin: 75px 10px;
		background: #fff;
		min-height: 500px;
	}
</style>
