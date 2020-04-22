<template>
  <div>
    <div>
      <el-button @click="startHacking">我是通过路由引导的页面</el-button>
      <input v-model=data>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data:""
    }
  },
  methods: {
    startHacking() {}
  }
};
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
