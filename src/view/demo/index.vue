<template>
  <div>
    <div class="f-pt20">
      <el-button @click="startHacking">demo</el-button>
    </div>
  </div>
</template>

<script>
// 生命周期
export default {
  mounted() {
    console.log(this.$el)
  },
  beforeMount() {
    console.log(this.$el)
  },
  components: {
  },
  data() {
    return {
    data:"",
      aaa:""
    }
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

#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>