<template>
  <div>
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
  }
};
</script>

<style>

</style>
