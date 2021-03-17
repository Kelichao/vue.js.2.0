<template>
  <div class="xzd_container f-df f-fdc">
    <!-- PC开始 -->
    <template v-if="platformType == 'pc'">
      <!-- 上部分 -->
      <div class="f-f3 f-df">
        <!-- 左 -->
        <div class="f-f1 f-mr24 f-df f-fdc">
          <div class="f-f1 box" @click="changeType(0)">
            <h1 class="h1 h1-select" :class="{ 'h1-on': type == 0 }">
              危化品车辆监管
            </h1>
            <p class="p"></p>
          </div>
        </div>
        <!-- 中 -->
        <div class="lunbotu f-df f-fdr box"></div>

        <!-- 右 -->

        <div class="f-f1 f-df f-fdc f-ml24">
          <div class="f-f1 box" @click="changeType(1)">
            <h1 class="h1 h1-select" :class="{ 'h1-on': type == 1 }">
              安全监控
            </h1>

            <div class="f-df f-fdr"></div>

            <div class="f-df f-fdr f-bsb f-mt10"></div>
          </div>
        </div>
      </div>

      <!-- 下部分 -->
      <div class="f-f2 f-df f-mt24 f-ofa bottom">
        <!-- 左 -->
        <div class="f-f1 box">
          <h1 class="h1">危化品车辆统计</h1>
        </div>
        <!-- 右 -->
        <div class="f-f1 box f-ml24">
          <h1 class="h1">报警记录</h1>
          <div class="tab_cont">
            <simple-table
              :head="[
                '序号',
                '报警时间',
                '报警排口',
                '报警描述',
                '处理情况',
                '负责人',
              ]"
              :value="tableDate2"
            ></simple-table>
          </div>
        </div>
      </div>
    </template>
    <!-- PC结束 -->

    <!-- moblie开始 -->
    <template v-else> 222222 </template>
    <!-- mobile结束 -->
  </div>
</template>

<script>
// 生命周期
export default {
  data() {
    return {
      type: 0,
      platformType: store.state.platformType,
      data: "",
      tableDate: [],
      aaa: "",
    };
  },
  mounted() {
    console.log(this.$el);
    // kit.ajax();
  },
  beforeMount() {
    console.log(this.$el);
  },
  components: {},

  watch: {
    aaa: {
      handler() {
        console.log(1111);
      },
      immediate: false,
    },
  },
  methods: {
    changeType(type) {
      this.type = type;
    },
    startHacking: function () {
      this.aaa = 111;

      //this.aaa = 111
    },
  },
};
</script>

<style lang="less" scoped>


.lunbotu {
  width: 800px;
}

.label2 {
  line-height: 30px;
  width: 50%;
  height: 60px;
  text-indent: 0;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  img {
    margin: 0;
  }
}

// .bottom {}
</style>



<style>
</style>
