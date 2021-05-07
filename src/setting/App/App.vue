<template>
	<div id="app">
		<Layout class="main">
			<Header class="header">
				<Row>
					<Col span="6">
					<img class="unselect logo" src="@/assets/logo.png" />
					<h2 class="unselect page-title">doco 设置</h2>
					</Col>
					<Col span="18">
					</Col>
				</Row>
			</Header>
			<Layout class="content">
				<Content class="left">
					Content
				</Content>
				<Sider class="right" hide-trigger>
					<Anchor class="anchors" show-ink v-if="menus&&menus.length">
						<AnchorLink v-for="(menu, ind) in menus" :key="ind" :href="'#' + menu.key" :title="menu.name">
							<template v-if="menu.menuItems&&menu.menuItems.length">
								<AnchorLink v-for="(mi, index) in menu.menuItems" :key="index" :href="'#' + mi.key"
									:title="mi.name" />
							</template>
						</AnchorLink>
					</Anchor>
				</Sider>
			</Layout>
			<Footer class="footer">保存</Footer>
		</Layout>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				menus: [{
					key: "config_gitee",
					name: "Gitee 配置",
					menuItems: [{
						key: "config_gitee_repository",
						name: "仓库"
					}]
				}]
			};
		}
	}
</script>

<style scoped>
	.unselect {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	#app {
		min-height: 600px;
	}

	#app,
	.main,
	.header {
		min-width: 1200px;
	}

	.header {
		background: #fff;
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
		transition: background-color 0.3s ease-in-out;
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
		vertical-align: middle;
	}

	.page-title {
		position: relative;
		top: -40px;
		left: 140px;
	}

	.content {
		min-width: 1182px;
		margin: 66px 0px 0px 0px;
		background: #fff;
		position: absolute;
		width: 100%;
	}

	.left {
		padding: 20px;
		background: #fff;
	}

	.right {
		padding: 10px;
		background: #fff !important;
	}

	.footer {
		position: absolute;
		bottom: 0;
		width: 100%;
	}
</style>
