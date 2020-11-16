<template>
	<div class="schema" v-if="schemaData&&schemaData.length">
		<Row type="flex" justify="start">
			<Col class="field" span="12" v-for="(item, index) in schemaData" :key="index">

			<div class="title">
				<span class="title-name" v-text="item.name"></span>（<span class="title-code" v-text="item.code"></span>）
			</div>

			<div class="value" v-if="item.type===5 || item.type===7 || item.type===9 || item.type===13 || item.type===14 || item.type===55 || item.type===56"
			 v-text="item.value"></div>

			<div class="value" v-else-if="item.type===1">
				<vSwitch v-if="typeof item.value==='boolean'" disabled v-model="item.value"></vSwitch>
			</div>

			<div class="value" v-else-if="item.type===23">
				<Tooltip max-width="200" placement="top" :content="item_23.Code" v-if="item.value && item.value.length" v-for="(item_23, index_23) in item.value"
				 :key="index_23">
					<img :src="'https://www.h3yun.com'+item_23.Url" :alt="item_23.Code">
				</Tooltip>
			</div>

			<div class="value" v-else-if="item.type===24">
				<Tooltip max-width="200" placement="top" :content="item_24.Code" v-if="item.value && item.value.length" v-for="(item_24, index_24) in item.value"
				 :key="index_24">
					<Tag type="border" color="primary">
						<a :href="'https://www.h3yun.com'+item_24.Url" v-text="item_24.Name"></a>
					</Tag>
				</Tooltip>
			</div>

			<div class="value" v-else-if="item.type===26" v-text="getValue_26(item.value)"></div>

			<div class="value" v-else-if="item.type===50">
				<Tag type="dot" color="primary">{{item.value}}</Tag>
			</div>

			<div class="value" v-else-if="item.type===51">
				<Tag type="dot" color="primary" v-if="item.value && item.value.length" v-for="(item_51, index_51) in item.value"
				 :key="index_51">{{item_51}}</Tag>
			</div>

			<div class="value" v-else></div>
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
				if (val && val.length) {
					return val[0].Name + "（" + val[0].ObjectId + "）";
				}
				return "";
			},
			getValue_51(val) {
				if (val && val.length) {
					return JSON.stringify(val);
				}
				return "";
			}
		}
	}
</script>

<style scoped>
	/deep/ .ivu-tag {
		font-size: 14px;
	}

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

	.value {
		min-height: 14px;
	}

	.value a,
	.value img {
		margin: 0 10px 0 0;
		color: #2d8cf0;
	}

	.value img {
		width: 50px;
		height: 50px;
	}

	.value a:hover {
		text-decoration: underline;
	}
</style>
