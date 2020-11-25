<template>
  <div>
    <div class="f-pt20">
      <el-button @click="startHacking">demo</el-button>
      <maper v-model="doubleform.longlat" :width="780" dialogWidth="700px" :toFixedNum="8" @input="getValue" ref="destroyMap"></maper>
    </div>
  </div>
</template>

<script>
import maper from "~/components/mapSelect/index.js"
                  //  src\components\mapSelect\index.js
// 生命周期
export default {
  mounted() {
    console.log(this.$el)
  },
  beforeMount() {
    console.log(this.$el)
  },
  components: {
      maper
  },
  data() {
    return {
      doubleform: {
        longlat:[39.01178128, 117.70717621],
      },
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
     getValue(val) {
      console.log(val)

    },
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
