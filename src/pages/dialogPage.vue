<template>
	<div id="m-dialog">
		<my-dialog v-bind:state="flag" v-on:cancle="bbb"></my-dialog>
		<button v-on:click="fff">打开弹窗组件</button>
		<button>{{aaa}}</button>
	</div>
</template>

<script>
/*此处添加js*/

// 引入组件
import dialog from '../components/dialog';

// console.log(dialog)

// 用export导出vue对象
export default {
  	name: "dialog",
  	data: function() {
  		return {
	  		aaa:123,
	  		flag: false
		};
 	},
 	components: {
	'my-dialog': dialog
 	},
  	methods: {
  		fff: function() {
  			this.flag = true;
  		},
		bbb: function() {
 			this.flag = false;
 		}
  	}
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>
