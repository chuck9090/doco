<template>
	<Card class="main">
		<p slot="title">
			<img class="logo" src="../../assets/logo.png" alt="">
			<br>
			To do code
		</p>
		<CellGroup v-if="options!=null&&options.length>0">
			<Cell v-for="(op, index) in options" :key="index" :title="op.title" :to="op.link" :target="op.target" />
		</CellGroup>
	</Card>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
					title: "sql执行",
					link: "/sqlExec.html",
					target: "_blank"
				}]
			};
		}
	};
</script>

<style scoped>
	.main {
		padding: 0;
		width: 250px;
	}

	/deep/ .ivu-card-head {
		padding: 10px 0;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	/deep/ .ivu-card-head p {
		text-align: center;
		height: 80px;
		font-weight: bold;
		color: rgb(81, 90, 110);
	}

	.logo {
		width: 60px;
		height: 60px;
	}

	/deep/ .ivu-card-body {
		padding: 0;
	}
</style>
