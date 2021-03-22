<template>
  <div class="xzd_container f-df f-fdc">
    <!-- PC开始 -->
    <template v-if="platformType == 'pc'">
      <!-- 上部分 -->
      <div class="f-f3 f-df">
        <!-- 左 -->
        <div class="f-f1 f-mr24 f-df f-fdc">
          <div class="f-f1 box">
            <h1 class="h1">应急值守</h1>

            <div class="f-df f-fdr"></div>

            <div class="f-df f-fdr f-bsb f-mt10"></div>
          </div>

          <div class="f-f1 box f-mt24">
            <h1 class="h1">事件日历</h1>

            <div class="f-df f-fdr f-bsb f-mt10"></div>

            <div class="f-df f-fdc"></div>
          </div>
        </div>
        <!-- 中 -->
        <div class="lunbotu f-df f-fdr box">
          
        </div>

        <!-- 右 -->

        <div class="f-f1 f-df f-fdc f-ml24">
          <div class="f-f1 box f-df">
            <h1 class="h1">应急预案</h1>

            <div id="paint34" class="f-f1"></div>

            
          </div>

          <div class="f-f1 box f-mt24">
            <h1 class="h1">应急资源</h1>

            <div class="f-df f-fdr f-bsb f-mt10"></div>

            <div class="f-df f-fdc"></div>
          </div>
        </div>
      </div>

      <!-- 下部分 -->
      <div class="f-f2 f-df f-mt24 f-ofa bottom">
        <!-- 左 -->
        <div class="f-f1 box">
          <h1 class="h1">未完成报警事件</h1>
          <div class="tab_cont">
            <!-- 表格开始 -->
            <simple-table 
            :head="[
                    '序号',
                    '报警时间',
                    '报警排口',
                    '报警描述',
                    '处理情况',
                  ]"
            :value=tableDate></simple-table>
          </div>
        </div>
        <!-- 右 -->
        <div class="f-f1 box f-ml24">
          <h1 class="h1">未完成接报事件</h1>
          <div class="tab_cont">
            <simple-table
              :head="[
                '序号',
                '事件时间',
                '事件地点',
                '事件描述',
                '处理情况',
                '负责人',
              ]"
              :value=tableDate2
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
      platformType: store.state.platformType,
      data: "",
      tableDate: [],
      tableDate2: [],
      aaa: "",
    };
  },
  mounted() {
    console.log(this.$el);
    // kit.ajax();

    kit.chartRender(
          $("#paint34"),
          kit.util.paintPie({
            // title: "用电计划",
            formatter: "{b} {c} 天 \n 占比 {d} ",
            data: [
              { value: 1048, name: "优" },
              { value: 735, name: "良3" },
              { value: 735, name: "良4" },
              { value: 735, name: "良5" },
              { value: 735, name: "良6" },
            ],
          })
        );
  },
  beforeMount() {
    console.log(this.$el);
  },
  components: {
  },

  watch: {
    aaa: {
      handler() {
        console.log(1111);
      },
      immediate: false,
    },
  },
  methods: {
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
