<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <div>
      <el-button @click="startHacking">Start</el-button>
    </div>
    <div>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/foo">路由页面现身</router-link>
      <router-link to="/bar">路由页面消失</router-link>

      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
    </div>

    <!-- vuex -->
    <div>
      <el-button @click="commit">commit</el-button>
      <el-button @click="getters">getters</el-button>
      <el-button @click="dispatch">dispatch</el-button>
    </div>
    <div>count: {{count}}</div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  computed: mapState({
    count: "count"
  }),
  methods: {
    getters() {
      this.$store.getters.big;
    },
    commit() {
      this.$store.commit("increment");
    },
    dispatch() {
      this.$store.dispatch("increment");
    },
    startHacking() {
      this.$notify({
        title: "It works!",
        type: "success",
        message:
          "We've laid the ground work for you. It's time for you to build something epic!",
        duration: 5000
      });
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
