<template>
  <div>
    <div class="f-pt20">
      <el-button @click="startHacking">demo</el-button>
    </div>
    <upload 
      :fileList=fileList  
      :on-change="(file, fileList)=>{return handleChange(file, fileList, $event)}"
      :on-remove="(file, fileList)=>{return handleRemove(file, fileList, $event)}">
    </upload>
  </div>
</template>

<script>

  import upload from "@/components/upload/index";
// 生命周期
export default {
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
  },
  beforeMount() {
    console.log(this.$el)
  },
  components: {
    upload
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