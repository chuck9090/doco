<template>
	<div id="app">
		<Layout>
			<Header class="header">
				<div class="logo"><img src="../assets/logo.png" alt="" width="100%" height="100%" /></div>
				<div class="user-info">
					<div class="info-item">企业名：</div>
					<div class="info-item">EngineCode：</div>
					<div class="info-item">版本：</div>
					<div class="info-item">用户：</div>
					<div class="info-item">UserId：</div>
					<div class="info-item">角色：</div>
				</div>
			</Header>
			<Content class="content"><slot></slot></Content>
		</Layout>
	</div>
</template>

<script>
import cookieManager from '../background/listeningCookie.js';

export default {
	data() {
		return {
			cookies: ''
		};
	},
	methods: {
		getCookies() {
			var _this = this;

			cookieManager.getAllCookies(
				function(cookies) {
					_this.cookies = JSON.stringify(cookies);
				},
				function(error) {
					throw error;
				}
			);
		}
	},
	created() {
		var _this = this;

		_this.getCookies();
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
	z-index: 99999;
	width: 100%;
}

.logo {
	width: 60px;
	height: 60px;
}

.user-info{
	float: left;
	padding-left: 120px;
}

.user-info .info-item{
	display: inline;
}

.content {
	margin: 75px 10px;
	background: #fff;
	min-height: 500px;
}
</style>
