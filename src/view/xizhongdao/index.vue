<template>
  <!-- <div style='{backgroundUrl: "@/images/西中岛/背景.png"}' >123 -->
  <div class=" f-df f-fdc" >
    
    <!-- 上部分 -->
    <div class="f-f3">
      <!-- 左 -->

      <!-- 中 -->

      <!-- 右 -->
    </div>

    <!-- 下部分 -->
    <div class="f-f2">

      <!-- 左 -->

      <!-- 右 -->
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
