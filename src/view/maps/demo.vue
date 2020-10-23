<template>
  <div>
    <div class="f-pt20">
      <el-button @click="startHacking">demo</el-button>
      <!-- <choose-geo :readonly="readonly" v-model='formData.longlat' ref='validLonglat'></choose-geo> -->
    </div>
  </div>
</template>

<script>

// import GeoPicker from '~/view/components/GeoPicker.vue'
// 生命周期
export default {
  mounted() {
    console.log(this.$el)
  },
  beforeMount() {
    console.log(this.$el)
  },
  components:{
    // GeoPicker
  },
  data() {
    return {
      formData: {
        longlat: [170,30]
      },
      readonly:true,
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
