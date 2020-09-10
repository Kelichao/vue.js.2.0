<template>
  <div>
    <div>
      <el-button @click="startHacking">我是通过路由引导的页面2</el-button>
      <input v-model=aaa>
    </div>
     <div id="main2" style="height:200px;width:200px;">

    </div>
  </div>
</template>

<script>
// 生命周期
export default {
  mounted() {
    console.log(this.$el)
        echarts.init(document.getElementById('main2')).setOption({
    title: {text: 'Line Chart'},
    tooltip: {},
    toolbox: {
        feature: {
            dataView: {},
            saveAsImage: {
                pixelRatio: 2
            },
            restore: {}
        }
    },
    xAxis: {},
    yAxis: {},
    series: [{
        type: 'line',
        smooth: true,
        data: [[12, 5], [24, 20], [36, 36], [48, 10], [60, 10], [72, 20]]
    }]
});
  },
  beforeMount() {
    console.log(this.$el)
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

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
