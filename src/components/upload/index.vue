<template>
  <div>
    <div class="f-pt20">
      <el-button @click="startHacking">demo22</el-button>
    </div>

    <el-upload
      :action="url"
      list-type="picture-card"
      :file-list="flieList"
      :on-change="handleChange"
      :on-remove="handleRemove"
    >
      <i slot="default" class="el-icon-plus"></i>
     
    </el-upload>
  </div>
</template>

<script>
// 生命周期
export default {
  prop:["url"],
  data() {
    return {
      type:0,
      tableDate:[],
    data:"",
      aaa:""
    }
  },
  computed: {
    // text() {
    //   return this.currentRate.toFixed(0) + '%';
    // },
  },
  mounted() {
    console.log(this.$el)

    // 上传主要注意这点,生成已上传文件对象的时候,注意加response[0]
    // return {
    //   url: $$.ip+ "file-base-server/api/v1/sys/download/" +value,// 用于显示远程图片
    //   response:[{ID: value}]// 为了与后台保持一致,记录ID,方便提交.
    // }
  },
  beforeMount() {
    console.log(this.$el)
  },
  components: {
  },
  
  watch: {
    aaa: {
      handler() {
      console.log(1111)
    },
    immediate: false
    },
    
  },
  methods: {
    startHacking: function() {
      this.aaa = 111
      
      //this.aaa = 111
    }
  }
};
</script>

<style lang="less" scoped>


</style>