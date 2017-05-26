<template>
	<div class="m-dialog" v-if="state">
	  	<div class="m-dialog_content" >
			<div class="m-dialog_head" ></div>
			<div class="m-dialog_middle">400-757-1000</div>
			<div class="m-dialog_bottom f-flex">
				<span class="u-cancle f-item" v-on:click="cancle">取消</span>
				<span class="u-call f-item" v-on:click="call">呼叫</span>
			</div>
		</div>
	</div>
</template>

<script>
/*此处添加js*/
//alert(1)
export default {
  	name: 'aaa',
	// 父组件给自组件传递数据
	props:["state"],
	methods: {
		cancle: function() {
			// this.state = false; // 不可以用这个方法
			// 与父组件通信一定要加上这句话
			this.$emit('cancle')
		},
		call: function() {
			window.location.href = 'tel://' + "400-757-1000";
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
/*此处添加样式*/
/*此处添加样式*/
.m-dialog_bottom {
    border-top:1px solid #e3e3e3;
    height:40px;
}
.m-dialog{
    height:100%;background:rgba(0,0,0,0.4);position:fixed; top: 0px;left: 0px; right:0px;bottom:0px;z-index:9999
}
.m-dialog_content{
    background: white;border-radius:10px;text-align:center;width:65%;
    position: absolute;top:42%;left:0;right:0;margin:auto;
}
.m-dialog_middle{
    padding:20px;font-size:0.3rem;font-weight: bolder;
}

.u-cancle, .u-call {
    padding:13px;
    line-height: 40px;
    color:#427fb6;
    /*font-weight:bolder;*/
}
.u-call {
    border-left:1px solid #e3e3e3;
}
</style>
