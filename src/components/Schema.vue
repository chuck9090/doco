<template>
	<div class="schema" v-if="schemaData&&schemaData.length">
		<Row>
			<Col span="12" v-for="(item, index) in schemaData" :key="index">
			<div class="field" v-if="item.type===5 ||item.type===7 ||item.type===9 ||item.type===13 || item.type===14">
				<div class="title">
					<span v-text="item.code"></span>
					<span class="unselect title-space">|</span>
					<span v-text="item.name"></span>
				</div>
				<div v-text="item.value"></div>
			</div>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default {
		props: {
			schemaData: {
				type: Array,
				required: true
			}
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

	.schema {
		width: 100%;
		height: 100%;
		overflow: auto;
	}

	.field {
		padding: 10px 5px;
	}

	.title {
		font-weight: bold;
	}

	.title-space {
		margin: 0 5px;
	}
</style>
