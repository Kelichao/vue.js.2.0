<template>
	<!-- 网格组件开始  img-container no-info -->
	<div class="input-gird">
		<div style="display:flex;">
			<span class="gird-columnItem-empty"></span>
			<span class="gird-columnItem" v-for="value in columnItem">{{value}}</span>
		</div>

		<div class="gird-main">
			<div class="rowItem-container">
				<span class="gird-rowItem" v-for="value in rowItem">{{value}}</span>
			</div>
			<table ref="table" class="input-gird-table"  v-bind:style="{'backgroundImage': 'url(' + image + ')'}">
				<tbody>
					<tr v-for="(row, rowIndex) in data">
						<td v-for="(column, columnIndex) in row" @click="event(column, columnIndex)">{{column.a}}</td>
					</tr>

				</tbody>
			</table>
		</div>
	</div>
	<!-- 网格组件结束 -->
</template>

<script>
	import $ from 'jquery';
	import nodatepng from '../../assets/nodata.png'
	export default {
		data() {
			return {
				// nodatepng: nodatepng
			}
		},
		mounted() {
			this.setSize();
			window.onresize = () => {
				this.setSize();
			}
		},
		methods: {
			setSize() {
				var tableWidth = this.$refs.table.offsetWidth;

				var columnItem = this.data[0] && this.data[0].length;
				var rowItem = this.data && this.data.length;
				var ItemWidth = tableWidth / columnItem;
				var ItemHeight = ItemWidth;

				var tableHeight = ItemHeight * rowItem;
				$(this.$refs.table).height(tableHeight);
			}
		},
		props: {
			columnItem: { type: Array, default: [] },// [1, 2, 3, 4],列坐标
			rowItem: { type: Array, default: [] },// ["a", "b", "c"],行坐标值
			data: { type: Array, default: [] },// 数据源
			// [
			// 	[{ a: 1, b: 21 }, { a: 41, b: 32 }, { a: 45, b: 33 }],
			// 	[{ a: 11, b: 22 }, { a: 42, b: 34 }, { a: 44, b: 33 }],
			// ]
			itemFlag: { type: Boolean, default: true },// 表各标签项
			image: {type: String, default: nodatepng},// 背景图资源
			event: {type: Function, default:function(value, index) {// 点击事件
				console.log(value)
			}}
		}
	}
</script>
<style lang="less" scoped>
	.input-gird {
		width: 100%;
		text-align: center;

	}

	.input-gird-table {
		width: 100%;
		table-layout: fixed;
		border: 1px solid #ddd;
		background-repeat: no-repeat;
		/* background-image: url(https://img-blog.csdn.net/20180816173539646?watermark/2/text/aHR0cHM6Ly9ibG…0L3dpbGxhcmRfY3Vp/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70); */
		background-position: center;
		background-size: contain;
	}

	.input-gird-table tr,
	.input-gird-table td {
		border: 1px solid #ddd;
	}

	.gird-main {
		display: flex;
	}

	.gird-columnItem {
		flex: 1;
		height: 25px;
		line-height: 25px;
	}

	.gird-columnItem-empty {
		width: 25px;
		height: 25px;
		line-height: 25px;
	}

	.gird-rowItem {
		display: flex;
		flex-direction: column;
		width: 25px;
		flex: 1;
		justify-content: center;
	}

	.rowItem-container {
		display: flex;
		flex-direction: column;

	}
</style>
