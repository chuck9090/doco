<template>
	<div class="schema" v-if="schemaData&&schemaData.length">
		<Row type="flex" justify="start">
			<Col class="field" span="12" v-for="(item, index) in schemaData" :key="index">
			<div class="title">
				<span class="title-name" v-text="item.name"></span>（<span class="title-code" v-text="item.code"></span>）
			</div>

			<div v-if="item.type===5 || item.type===7 || item.type===9 || item.type===13 || item.type===14 || item.type===50 || item.type===55 || item.type===56"
			 v-text="item.value"></div>

			<div v-if="item.type===1" v-text="item.value"></div>

			<div v-if="item.type===26" v-text="getValue_26(item.value)"></div>

			<div v-if="item.type===51" v-text=""></div>

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
		},
		methods: {
			getValue_26(val) {
				if (val&&val.length) {
					return val[0].Name + "（" + val[0].ObjectId + "）";
				} else {
					return "";
				}
			},
			getValue_51(val) {
				if (val && val.length) {
					return "";
				}
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
		font-size: 14px;
	}

	.field {
		padding: 15px 10px;
	}

	.title {
		font-weight: bold;
	}

	.title-name {}

	.title-code {
		font-weight: 400;
		font-size: 13px;
	}
</style>
