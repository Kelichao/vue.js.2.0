<template>
  <div class="xzd_container f-df f-fdc">
    <!-- PC开始 -->
    <template v-if="platformType == 'pc'">
      <!-- 上部分 -->
      <div class="f-f3 f-df">
        <!-- 左 -->
        <div class="f-f1 f-mr24 f-df f-fdc">
          <div class="f-f1 box f-df f-fdc" @click="changeType(0)">
            <h1 class="h1 h1-select" :class="{ 'h1-on': type == 0 }">
              空气达标
            </h1>

            <div class="box_cont f-f1 f-df f-fdc">
              <div class="detail">
                交流岛站 2020-12-01 17:00 120 轻度 AQI 首要污染物：PM2.5 22℃ 64%
                西北风 3级 PM2.5 22 PM10 11 SO2 11 NO2 22 O3 33 CO 24
                单位：μg/m³，CO：mg/m³
                <el-divider></el-divider>
              </div>
              <div>
                <div
                  id="paint1"
                  style="height: 300px; width: 300px; margin: 0 auto"
                ></div>
                优良天数 123 重污染天数天数 18
              </div>
            </div>
          </div>
        </div>
        <!-- 中 -->
        <div class="lunbotu f-df f-fdr box f-p20">
          <div>
            <el-select
            class="select_cont"
            style="width:100px"
            size="mini"
            v-model="timeType"
            change="change"
          >
            <el-option
              v-for="item in [{value:'month',label:'月'},{value:'year',label:'年'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

            <el-date-picker
            class="select_cont"
            style="width:100px"
            size="mini"
              v-model="time"
              type="year"
              placeholder="选择年">
            </el-date-picker>

            <el-date-picker
            class="select_cont"
            style="width:130px"
            size="mini"
              v-model="time"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </div>
          
        </div>

        <!-- 右 -->

        <div class="f-f1 f-df f-fdc f-ml24">
          <div class="f-f1 box" @click="changeType(1)">
            <h1 class="h1 h1-select" :class="{ 'h1-on': type == 1 }">
              废气达标
            </h1>

            <div class="f-df f-fdr"></div>

            <div class="f-df f-fdr f-bsb f-mt10"></div>
          </div>

          <div class="f-f1 box f-mt24" @click="changeType(2)">
            <h1 class="h1 h1-select" :class="{ 'h1-on': type == 2 }">
              废水达标
            </h1>

            <div class="f-df f-fdr f-bsb f-mt10"></div>

            <div class="f-df f-fdc"></div>
          </div>
        </div>
      </div>

      <!-- 下部分 -->
      <div class="f-f2 f-df f-mt24 f-ofa bottom">
        <!-- 左 -->
        <div class="f-f1 box">
          <h1 class="h1">废气超标报警记录</h1>
          <div class="tab_cont">
            <simple-table
              :head="['序号', '报警时间', '报警排口', '报警描述', '处理情况']"
              :value="tableDate"
            ></simple-table>
          </div>
        </div>
        <!-- 右 -->
        <div class="f-f1 box f-ml24">
          <h1 class="h1">废水超标报警记录</h1>
          <div class="tab_cont">
            <!-- 表格开始 -->
            <simple-table
              :head="['序号', '报警时间', '报警排口', '报警描述', '处理情况']"
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
var option = {
  title: {
    text: "全年空气质量等级占比",
    //  color: 'white',
    // subtext: '纯属虚构',
    left: "left",
  },
  tooltip: {
    trigger: "item",
  },
  // legend: {
  //     orient: 'vertical',
  //     left: 'center',
  //     top:"bottom"
  // },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["20%", "30%"],
      label: {
        formatter: "{b} {c} 天 \n 占比 {d} ",
        //  fontSize: 14,
        color: "white",
      },
      data: [
        { value: 1048, name: "优" },
        { value: 735, name: "良3" },
        { value: 735, name: "良4" },
        { value: 735, name: "良5" },
        { value: 735, name: "良6" },
        { value: 735, name: "良5" },
      ],
    },
  ],
};

// 生命周期
export default {
  data() {
    return {
      timeType:"year",
      time: new Date(),
      type: 0,
      tableDate: [
        {
          a: "已处理",
        },
        {
          a: 111321,
        },
        {
          a: 111421,
        },
        {
          a: 111231,
        },
        {
          a: 1155121,
        },
      ],
      tableDate2: [],
      platformType: store.state.platformType,
      data: "",
      aaa: "",
    };
  },
  mounted() {
    console.log(this.$el);
    // kit.ajax();
    kit.chartRender($("#paint1"), option);
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
