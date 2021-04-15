<template>
  <div class="xzd_container f-df f-fdc">
    <!-- PC开始 -->
    <template v-if="platformType == 'pc'">
      <!-- 上部分 -->
      <div class="f-f3 f-df" style="height: 500px">
        <!-- 左 -->
        <div class="f-f1 f-mr24 f-df f-fdc">
          <div class="f-f1 box" @click="changeType(0)">
            <h1 class="h1 h1-select" :class="{ 'h1-on': type == 0 }">
              危化品车辆监管
            </h1>
            <div class="f-h100p f-w100p f-df f-fdc f-p20 f-bsb">
              <div class="f-f2">
                <div class="f-h100p f-w100p f-df f-fdc">
                  <div class="f-f3">
                    <div class="f-h100p f-w100p f-df bg">
                      <div class="f-f1 f-df f-jcc f-aic">
                        园内车辆 <span class="sp_num f-ti10 f-fwb">123</span>
                      </div>
                      <div class="f-f1">
                        <div class="f-h100p f-w100p f-df f-fdc">
                          <div class="f-f1 f-df f-ti20 f-aic">
                            省内<span class="sp_small f-ti10">123</span>
                          </div>
                          <div class="f-f1 f-df f-ti20 f-aic">
                            省外<span class="sp_small f-ti10">123</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="f-f2 f-mt10">
                    <div class="f-h100p f-w100p f-df">
                      <div class="f-f1 bg f-df f-jcc f-aic">
                        今日入园
                        <span
                          class="f-ti25 f-fwb"
                          style="color: rgba(28, 227, 132, 1)"
                        >
                          + 123</span
                        >
                      </div>
                      <div style="width: 10px"></div>
                      <div class="f-f1 bg f-df f-jcc f-aic">
                        今日出园
                        <span
                          class="f-ti25"
                          style="color: rgba(255, 86, 85, 1)"
                        >
                          - 1234</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <el-divider></el-divider>
              <div class="f-f3" id="paint43"></div>
            </div>
          </div>
        </div>
        <!-- 中 -->
        <div class="lunbotu f-df f-fdc box" v-show="type == '0'">
          <div class="f-h100p f-w100p f-df f-fdc">
            <div class="f-f3">
              <h1 class="h1">园内危化品车辆</h1>
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
                  :value="tableDate"
                ></simple-table>
                <div class="f-fr">
                  <el-pagination
                    background
                    small
                    layout="total,prev, pager, next"
                    :total="1000"
                  >
                  </el-pagination>
                </div>
              </div>
            </div>
            <div class="f-f2">
              <div class="f-h100p f-w100p f-df f-fdc">
                <div class="f-pr">
                  <h1 class="h1">危化品统计</h1>
                  <el-radio-group
                    class="f-pa f-t15 f-r20"
                    v-model="radio4"
                    size="mini"
                  >
                    <el-radio-button label="出园"></el-radio-button>
                    <el-radio-button label="入园"></el-radio-button>
                  </el-radio-group>
                  <div class="f-pa f-t15 f-l20" style="left: 100px">
                    <el-select
                      class="select_cont"
                      style="width: 100px"
                      size="mini"
                      v-model="timeType"
                      change="change"
                    >
                      <el-option
                        v-for="item in [
                          { value: 'month', label: '月' },
                          { value: 'year', label: '年' },
                        ]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>

                    <el-date-picker
                      v-if="timeType == 'year'"
                      class="select_cont"
                      style="width: 100px"
                      size="mini"
                      v-model="time"
                      type="year"
                      placeholder="选择年"
                    >
                    </el-date-picker>

                    <el-date-picker
                      v-if="timeType == 'month'"
                      class="select_cont"
                      style="width: 130px"
                      size="mini"
                      v-model="time"
                      type="month"
                      placeholder="选择月"
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div class="f-f1">
                  <div class="f-h100p f-w100p f-df">
                    <div class="f-f1" id="paint44"></div>
                    <div class="f-f1" id="paint45"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lunbotu f-df box f-fdc" v-show="type == '1'">
          <div class="f-f1 f-p10">
            <div class="f-h100p f-w100p f-df f-fdc">
              <div>
                <el-select
                  class="select_cont"
                  style="width: 100px"
                  size="mini"
                  v-model="timeType"
                  change="change"
                >
                  <el-option
                    v-for="item in [
                      { value: 'month', label: '月' },
                      { value: 'year', label: '年' },
                    ]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>

                <el-date-picker
                  v-if="timeType == 'year'"
                  class="select_cont"
                  style="width: 100px"
                  size="mini"
                  v-model="time"
                  type="year"
                  placeholder="选择年"
                >
                </el-date-picker>

                <el-date-picker
                  v-if="timeType == 'month'"
                  class="select_cont"
                  style="width: 130px"
                  size="mini"
                  v-model="time"
                  type="month"
                  placeholder="选择月"
                >
                </el-date-picker>
              </div>

              <div class="f-f1 f-p10 f-bsb">
                <div class="f-h100p f-w100p f-df">
                  <div class="f-f1" id="paint455">左</div>
                  <div class="f-f1" id="paint456">右</div>
                </div>
              </div>
            </div>
          </div>
          <div class="f-f1" id="paint2"></div>
        </div>

        <!-- 右 -->

        <div class="f-f1 f-df f-fdc f-ml24">
          <div class="f-f1 box f-df f-fdc" @click="changeType(1)">
            <h1 class="h1 h1-select" :class="{ 'h1-on': type == 1 }">
              安全监控
            </h1>
            <div class="f-h100p f-w100p f-df f-fdc">
              <div class="f-f1" id="paint48"></div>
              <div class="f-f1" id="paint49"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 下部分 -->
      <div class="f-f2 f-df f-mt24 f-ofa bottom">
        <!-- 左 -->
        <div class="f-f1 box f-df f-fdc">
          <h1 class="h1">危化品车辆统计</h1>
          <div class="f-f1" id="paint1"></div>
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
              :value="tableDate"
            ></simple-table>
          </div>
        </div>
      </div>
    </template>
    <!-- PC结束 -->

    <!-- moblie开始 -->
    <template v-else>
      <div class="f-h9r f-bcw f-br12 f-mt15 f-df f-fdc">
        <h2 class="m_title">
          危化品车辆
          <h3>2020年12月1日 17:05</h3>
        </h2>
        <div class="f-p15 f-pt1 f-f1">
          <div class="f-h100p f-w100p f-df f-fdc">
            <div class="f-jcc f-aic f-df">
              <div class="f-h100p f-w100p f-df">
                <div class="f-f1 f-jcc f-aic f-df">园内车辆：120</div>
                <div class="f-f1 f-jcc f-aic f-df">本地：70</div>
                <div class="f-f1 f-jcc f-aic f-df">外地：50</div>
              </div>
            </div>
            <div class="f-f1 f-mt10">
              <div class="f-h100p f-w100p f-df">
                <div class="f-f1 f-jcc f-aic f-df">
                  <div class="f-h100p f-w100p f-df f-fdc">
                    <div class="f-f1"></div>
                    <div class="f-f1 f-jcc f-aic f-df">
                      今日入园：<span style="color: rgba(51, 204, 156, 1)"
                        >+45
                      </span>
                    </div>
                    <div class="f-f1 f-jcc f-aic f-df">
                      今日出园：<span style="color: rgba(242, 25, 75, 1)"
                        >-12
                      </span>
                    </div>
                  </div>
                </div>
                <div class="f-f2 f-jcc f-aic f-df" id="paint_m2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="f-h20r f-bcw f-br12 f-mh13r f-mt15 f-df f-fdc">
        <h2 class="m_title">
          危化品运输
          <h3>2020年12月</h3>
        </h2>
        <div class="f-f1">
          <div class="f-h100p f-w100p f-df f-fdc">
            <div class="f-df" style="background: rgba(247, 248, 250, 1)">
              <h2
                class="m_title f-w100p"
                style="padding-top: 5px; padding-bottom: 5px"
              >
                运输大户-前五
                <h3>
                  <el-select
                    class=""
                    style="width: 100px"
                    size="mini"
                    v-model="radio4"
                    change=""
                  >
                    <el-option
                      v-for="item in [
                        { value: '入园', label: '入园' },
                        { value: '出园', label: '出园' },
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </h3>
              </h2>
            </div>
            <div class="f-f1 f-jcc f-aic f-df f-fdc">
              <div class="f-h100p f-w100p f-df" v-for="item in 5">
                <div class="f-f1 f-jcc f-aic f-df f-fs07r f-fwb">1</div>
                <div class="f-f5 f-jcc f-aic f-df">大连蒙连石化有限公司</div>
                <div
                  class="f-f2 f-jcc f-aic f-df f-fs07r f-fwb"
                  style="color: rgba(0, 85, 255, 1)"
                >
                  35.247 T
                </div>
              </div>
            </div>
            <div class="f-df" style="background: rgba(247, 248, 250, 1)">
              <h2
                class="m_title f-w100p"
                style="padding-top: 5px; padding-bottom: 5px"
              >
                主要危化品-前五
              </h2>
            </div>
            <div class="f-f1" id="paint44"></div>
          </div>
        </div>
      </div>

      <div class="f-bcw f-br12 f-mh13r f-mt15 f-df f-fdc">
        <h2 class="m_title">
          未处理事件
          <h3>共计：4件</h3>
        </h2>
        <div class="f-p15 f-pt1">
          <div
            style="border-bottom: 1px solid rgba(231, 236, 244, 1)"
            class="f-h100p f-pb5 f-pt5 f-fs06r f-w100p f-df f-fdc f-h08r"
          >
            <div class="f-f1 f-jcc f-aic f-df">
              <div class="f-h100p f-w100p f-df">
                <div class="f-f1 f-aic f-df">2021-1-13 11:06 钱二西</div>
                <div
                  class="f-jcc f-aic f-df f-br5 f-pl4 f-pr4"
                  style="background: rgba(255, 153, 2, 1); color: white"
                >
                  报修
                </div>
              </div>
            </div>
            <div class="f-f1 f-aic f-df">嘉恒9-1-402，门锁坏了不能反锁。</div>
          </div>
          <div
            style="border-bottom: 1px solid rgba(231, 236, 244, 1)"
            class="f-h100p f-pb5 f-pt5 f-fs06r f-w100p f-df f-fdc f-h08r"
          >
            <div class="f-f1 f-jcc f-aic f-df">
              <div class="f-h100p f-w100p f-df">
                <div class="f-f1 f-aic f-df">2021-1-13 11:06 钱二西</div>
                <div
                  class="f-jcc f-aic f-df f-br5 f-pl4 f-pr4"
                  style="background: rgba(255, 153, 2, 1); color: white"
                >
                  报修
                </div>
              </div>
            </div>
            <div class="f-f1 f-aic f-df">嘉恒9-1-402，门锁坏了不能反锁。</div>
          </div>
        </div>
      </div>
    </template>
    <!-- mobile结束 -->
  </div>
</template>

<script>
// 生命周期
export default {
  data() {
    return {
      radio4: "出园",
      timeType: "month",
      time: new Date(),
      type: 0,
      platformType: store.state.platformType,
      data: "",
      tableDate: [],
      aaa: "",
      paint1: null,
    };
  },
  mounted() {
    console.log(this.$el);
    // kit.ajax();

    kit.chartRender(
      $("#paint1"),
      util.paintLine({
        title: "全年空气质量等级占比",
        formatter: "{b} {c} 天 \n 占比 {d} ",
        legend: ["邮件营销", "联盟广告"],
        data: [
          { value: 1048, name: "优" },
          { value: 735, name: "良3" },
          { value: 735, name: "良4" },
          { value: 735, name: "良5" },
          { value: 735, name: "良6" },
        ],
      })
    );

    kit.chartRender(
      $("#paint_m2"),
      util.paintPie({
        title: "园内车辆",
        formatter: "{b} {c} 天 ",
        data: [
          { value: 1048, name: "优" },
          { value: 735, name: "良3" },
        ],
      })
    );

    kit.chartRender(
      $("#paint43"),
      util.paintPie({
        title: "引擎状态",
        formatter: "{b} {c} 天 \n 占比 {d} ",
        data: [
          { value: 1048, name: "优" },
          { value: 735, name: "良3" },
        ],
      })
    );

    kit.chartRender(
      $("#paint48"),
      util.paintPie({
        title: "视频分布",
        titlePosition: "center",
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

    kit.chartRender(
      $("#paint49"),
      util.paintPie({
        title: "2020年12月报警统计",
        titlePosition: "center",
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

     var platformType = store.state.platformType

    kit.chartRender($("#paint44"), {
      title: {
        text: "化学品申报分析",
        textStyle: {
          color: "white",
          fontSize: "14px",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      color: ["rgba(48, 211, 133, 1)", "rgba(255, 86, 85, 1)"],
      legend: {
        data: ["入园", "出园"],
        textStyle: {
          color: platformType == 'pc' ?"white":"rgba(96, 98, 102, 1)",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "14%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
        // 画图区域的分割线
        splitLine: {
          show: false,
        },
        // // 坐标轴轴线相关设置
        axisLine: {
          // onZero: false,
          lineStyle: {
            color: "gray",
            opacity: 0.1, // 轴体的透明度
          },
        },
      },
      yAxis: {
        type: "category",
        // 画图区域的分割线
        splitLine: {
          show: false,
        },
        // 带区域的分隔栏
        splitArea: {
          show: true,
          // 分割区域颜色
          areaStyle: {
            color: platformType == 'pc' ?["rgba(0, 65, 136, 1)", "rgba(0,0,0,0)"]:["rgba(208, 216, 229, 0.2)", "rgba(0,0,0,0)"],
          },
        },
        // // 坐标轴轴线相关设置
        axisLine: {
          onZero: true,
          lineStyle: {
            color: "gray",
            opacity: 0.1, // 轴体的透明度
          },
        },
        data: ["巴西", "印尼", "美国", "印度", "世界人口(万)"],
      },
      series: [
        {
          name: "入园",
          type: "bar",
          data: [18203, 23489, 29034, 104970, 131744],
        },
        {
          name: "出园",
          type: "bar",
          data: [-19325, -23438, -31000, -121594, -134141],
        },
      ],
    });

    kit.chartRender(
      $("#paint45"),
      util.paintBar({
        title: "企业危化品运输形式分析",
        formatter: "{b} {c} 天 \n 占比 {d} ",
        legend: ["邮件营销", "联盟广告"], // 出园,入园
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

      this.$nextTick(() => {
        kit.chartRender(
          $("#paint2"),
          util.paintLine({
            title: "报警数量变化",
            formatter: "{b} {c} 天 \n 占比 {d} ",
            data: [
              { value: 1048, name: "优" },
              { value: 735, name: "良3" },
            ],
          })
        );

        kit.chartRender(
          $("#paint455"),
          util.paintBar({
            title: "重点报警点位-前五",
            formatter: "{b} {c} 天 \n 占比 {d} ",
            xyChange: true,
            color: ["rgba(41, 222, 255, 1)"],
            // grid: {
            //   left: "13%",
            //   right: "4%",
            //   bottom: "3%",
            //   containLabel: true,
            // },
            data: [
              { value: 1048, name: "优" },
              { value: 735, name: "良3" },
            ],
          })
        );

        kit.chartRender(
          $("#paint456"),
          util.paintBar({
            title: "违规车辆所属企业-前五",
            xyChange: true,
            formatter: "{b} {c} 天 \n 占比 {d} ",
            color: ["rgba(41, 222, 255, 1)"],
            data: [
              { value: 1048, name: "优" },
              { value: 735, name: "良3" },
            ],
          })
        );
      });
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
