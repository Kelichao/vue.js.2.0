<template>
  <div class="xzd_container f-df f-fdc">
    <!-- PC开始 -->
    <template v-if="platformType == 'pc'">
      <!-- 上部分 -->
      <div class="f-f3 f-df">
        <!-- 左 -->
        <div class="f-f1 f-mr24 f-df f-fdc">
          <div class="f-f1 box f-df f-fdc">
            <h1 class="h1">应急值守</h1>

            <div class="f-df f-fdr f-p20 f-pt1 f-f1">
              <div class="f-h100p f-w100p f-df f-fdc">
                <!-- 第一行 -->
                <div class="f-f1">
                  <!-- 容器 -->
                  <div class="f-h100p f-w100p f-df">
                    <!-- 第一格 -->
                    <div class="f-f1 bg f-p15 f-bsb">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1">
                          <div class="f-h100p f-w100p f-df">
                            <div class="">
                              <img
                                style="width: 30px"
                                src="../../../src/images/西中岛/值班领导@2x.png"
                                alt=""
                              />
                            </div>

                            <div class="f-f1 f-fs12 f-df f-jcc f-aic">
                              值班领导
                            </div>
                          </div>
                        </div>
                        <div class="f-f1 f-tac">
                          <template v-for="item in yingjizhishou.master">
                            {{ item.name || "--" }}
                          </template>
                        </div>
                      </div>
                    </div>

                    <div style="width: 10px"></div>

                    <div class="f-f1 bg f-p15 f-bsb">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1">
                          <div class="f-h100p f-w100p f-df">
                            <div class="">
                              <img
                                style="width: 30px"
                                src="../../../src/images/西中岛/值班人员@2x.png"
                                alt=""
                              />
                            </div>
                            <div class="f-f1 f-fs12 f-df f-jcc f-aic">
                              值班人员
                            </div>
                          </div>
                        </div>
                        <div class="f-f1 f-tac">
                          <template v-for="item in yingjizhishou.otherList">
                            {{ item.name|| "--" }}
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="f-f1 f-mt10">
                  <div class="f-h100p f-w100p f-df bg f-p10 f-bsb">
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1 num f-tac">3</div>
                        <div class="f-f1 f-tac f-mt10">接报事件</div>
                      </div>
                    </div>
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1 num f-tac">3</div>
                        <div class="f-f1 f-tac f-mt10">报警事件</div>
                      </div>
                    </div>
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1 num f-tac">4</div>
                        <div class="f-f1 f-tac f-mt10">应急事件</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="f-f1 box f-mt24 f-pr">
            <h1 class="h1">事件日历</h1>

            <div class="f-df f-fdr f-bsb">
              <el-calendar>
                <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
                <template slot="dateCell" slot-scope="{ date, data }">
                  <p :class="data.isSelected ? 'is-selected' : ''">
                    {{ data.day.split("-").slice(2).join("-") }}
                    <!-- {{ data.isSelected ? '✔️' : ''}} -->
                  </p>
                </template>
              </el-calendar>
            </div>
          </div>
        </div>
        <!-- 中 -->
        <div class="lunbotu f-df f-fdr box f-p20">
          <div class="f-h100p f-w100p f-df f-fdc">
            <div>
              <el-select
                class="select_cont"
                style="width: 100px"
                size="mini"
                v-model="timeType"
                @change="change"
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
                @change="change"
                placeholder="选择年"
              >
              </el-date-picker>

              <el-date-picker
                v-if="timeType == 'month'"
                class="select_cont"
                style="width: 130px"
                size="mini"
                v-model="time"
                @change="change"
                type="month"
                placeholder="选择月"
              >
              </el-date-picker>
            </div>

            <div class="f-f1">
              <div class="f-h100p f-w100p f-df f-fdc">
                <div class="f-f1 f-mt10">
                  <div class="f-h100p f-w100p f-df">
                    <div id="paint35" class="f-f1"></div>
                    <div id="paint36" class="f-f1"></div>
                    <div id="paint37" class="f-f1"></div>
                  </div>
                </div>
                <div class="f-f1" id="paint31"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右 -->

        <div class="f-f1 f-df f-fdc f-ml24">
          <div class="f-f1 box f-df f-fdc">
            <h1 class="h1 f-pr">
              应急预案 <span class="m_bt f-t15 f-r15">查看</span>
            </h1>

            <div id="paint34" class="f-f1"></div>
          </div>

          <div class="f-f1 box f-mt24 f-df f-fdc">
            <h1 class="h1 f-pr">
              应急资源 <span class="m_bt f-t15 f-r15">查看</span>
            </h1>

            <div class="f-df f-fdc f-bsb f-mt10 f-p20 f-pt1 f-f1">
              <div class="f-h100p f-w100p f-df">
                <div class="f-f1">
                  <div class="f-h100p f-w100p f-df">
                    <div class="f-f1 f-df f-jcc f-aic">
                      <img
                        style="width: 30px"
                        src="../../../src/images/西中岛/应急人员@2x.png"
                        alt=""
                      />
                    </div>
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1"><span class="info">55</span>人</div>
                        <div class="f-f1 f-df f-aic">应急人员</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="f-f1">
                  <div class="f-h100p f-w100p f-df">
                    <div class="f-f1 f-df f-jcc f-aic">
                      <img
                        style="width: 30px"
                        src="../../../src/images/西中岛/应急物资@2x.png"
                        alt=""
                      />
                    </div>
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1"><span class="info">1111</span>件</div>
                        <div class="f-f1 f-df f-aic">应急物资</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="f-h100p f-w100p f-df">
                <div class="f-f1 b">
                  <div class="f-h100p f-w100p f-df">
                    <div class="f-f1 f-df f-jcc f-aic">
                      <img
                        style="width: 30px"
                        src="../../../src/images/西中岛/应急队伍@2x.png"
                        alt=""
                      />
                    </div>
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1"><span class="info">7</span>支</div>
                        <div class="f-f1 f-df f-aic">应急队伍</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="f-f1">
                  <div class="f-h100p f-w100p f-df">
                    <div class="f-f1 f-df f-jcc f-aic">
                      <img
                        style="width: 30px"
                        src="../../../src/images/西中岛/应急车辆@2x.png"
                        alt=""
                      />
                    </div>
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1"><span class="info">1</span>7辆</div>
                        <div class="f-f1 f-df f-aic">应急车辆</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              :head="['序号', '报警时间', '报警排口', '报警描述', '处理情况']"

              :value="tableDate"
            ></simple-table>
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
              :prop="['index','accidentAcceptTime','accidentAddress','accidentAcceptMan','accidentStatus','accidentLinkMan']"
              :value="tableDate2"
            ></simple-table>
          </div>
        </div>
      </div>
    </template>
    <!-- PC结束 -->

    <!-- moblie开始 -->
    <template v-else>
      <div class="f-bcw f-br12 f-h6r f-mt15 f-df f-fdc">
        <h2 class="m_title">
          应急值守
          <h3>2020年12月</h3>
        </h2>
        <div class="f-f1">
          <div class="f-h100p f-w100p f-df f-fdc f-p12 f-bsb f-pt1">
            <div class="f-f1 f-jcc f-aic f-df">
              <div class="f-h100p f-w100p f-df f-fs06r">
                <div class="f-f1 f-aic f-df">
                  值班领导：
                  <template v-for="item in yingjizhishou.master">
                    {{ item.name }}
                  </template>
                </div>
                <div class="f-f1 f-aic f-df">
                  值班人员：
                  <template v-for="item in yingjizhishou.otherList">
                    {{ item.name }}
                  </template>
                </div>
              </div>
            </div>
            <div class="f-f1 f-jcc f-aic f-df">
              <div class="f-h100p f-w100p f-df">
                <div
                  style="background: rgba(243, 248, 255, 1)"
                  class="f-f1 f-jcc f-aic f-df f-fs06r"
                >
                  接报事件
                  <span class="f-ti10" style="color: rgba(1, 85, 255, 1)"
                    >3</span
                  >
                </div>
                <div style="width: 10px"></div>
                <div
                  style="background: rgba(243, 248, 255, 1)"
                  class="f-f1 f-jcc f-aic f-df f-fs06r"
                >
                  报警事件
                  <span class="f-ti10" style="color: rgba(1, 85, 255, 1)"
                    >3</span
                  >
                </div>

                <div style="width: 10px"></div>
                <div
                  style="background: rgba(243, 248, 255, 1)"
                  class="f-f1 f-jcc f-aic f-df f-fs06r"
                >
                  应急事件
                  <span class="f-ti10" style="color: rgba(1, 85, 255, 1)"
                    >3</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f-bcw f-br12 f-h8r f-mt15 f-df f-fdc">
        <h2 class="m_title">
          应急资源
          <h3></h3>
        </h2>
        <div class="f-h100p f-w100p f-df f-p10">
          <div class="f-f1 f-df"><div id="paint34" class="f-f1"></div></div>
          <div class="f-f1 f-jcc f-aic f-df">
            <div class="f-h100p f-w100p f-df f-fdc">
              <div class="f-f1 f-jcc f-aic f-df">
                <div class="f-h100p f-w100p f-df">
                  <div class="f-f1 f-jcc f-aic f-df f-fs06r">
                    <img
                      style="width: 0.6rem"
                      src="../../../src/images/西中岛app/应急人员@2x.png"
                      alt=""
                    /><span class="f-ti10">应急人员</span>
                  </div>
                  <div class="f-f1 f-jcc f-aic f-df">
                    <span class="f-fs08r" style="color: rgba(0, 83, 249, 1)"
                      >55</span
                    >
                    <span class="f-ti5 f-fs06r">人</span>
                  </div>
                </div>
              </div>
              <div class="f-f1 f-jcc f-aic f-df">
                <div class="f-h100p f-w100p f-df">
                  <div class="f-f1 f-jcc f-aic f-df f-fs06r">
                    <img
                      style="width: 0.6rem"
                      src="../../../src/images/西中岛app/应急物资@2x.png"
                      alt=""
                    /><span class="f-ti10">应急物资</span>
                  </div>
                  <div class="f-f1 f-jcc f-aic f-df">
                    <span class="f-fs08r" style="color: rgba(0, 83, 249, 1)"
                      >55</span
                    >
                    <span class="f-ti5 f-fs06r">件</span>
                  </div>
                </div>
              </div>
              <div class="f-f1 f-jcc f-aic f-df">
                <div class="f-h100p f-w100p f-df">
                  <div class="f-f1 f-jcc f-aic f-df f-fs06r">
                    <img
                      style="width: 0.6rem"
                      src="../../../src/images/西中岛app/应急队伍@2x.png"
                      alt=""
                    /><span class="f-ti10">应急队伍</span>
                  </div>
                  <div class="f-f1 f-jcc f-aic f-df">
                    <span class="f-fs08r" style="color: rgba(0, 83, 249, 1)"
                      >55</span
                    >
                    <span class="f-ti5 f-fs06r">支</span>
                  </div>
                </div>
              </div>
              <div class="f-f1 f-jcc f-aic f-df">
                <div class="f-h100p f-w100p f-df">
                  <div class="f-f1 f-jcc f-aic f-df f-fs06r">
                    <img
                      style="width: 0.6rem"
                      src="../../../src/images/西中岛app/应急车辆@2x.png"
                      alt=""
                    /><span class="f-ti10">应急车辆</span>
                  </div>
                  <div class="f-f1 f-jcc f-aic f-df">
                    <span class="f-fs08r" style="color: rgba(0, 83, 249, 1)"
                      >55</span
                    >
                    <span class="f-ti5 f-fs06r">辆</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f-bcw f-br12 f-mh13r f-mt15 f-df f-fdc">
        <h2 class="m_title">
          未完成事件
          <h3>共计：4件</h3>
        </h2>
        <div class="f-p15 f-pt1">
          <div style="border-bottom:1px solid rgba(231, 236, 244, 1)" class="f-h100p  f-pb5 f-pt5 f-fs06r f-w100p f-df f-fdc f-h08r">
            <div class="f-f1 f-jcc f-aic f-df">
              <div class="f-h100p f-w100p f-df">
                <div class="f-f1  f-aic f-df">2021-1-13 11:06 钱二西</div>
                <div class=" f-jcc f-aic f-df f-br5 f-pl4 f-pr4" style="background:rgba(255, 153, 2, 1);color:white;">报修</div>
              </div>
            </div>
            <div class="f-f1  f-aic f-df">嘉恒9-1-402，门锁坏了不能反锁。</div>
          </div>
          <div style="border-bottom:1px solid rgba(231, 236, 244, 1)" class="f-h100p f-pb5 f-pt5  f-fs06r f-w100p f-df f-fdc f-h08r">
            <div class="f-f1 f-jcc f-aic f-df">
              <div class="f-h100p f-w100p f-df">
                <div class="f-f1  f-aic f-df">2021-1-13 11:06 钱二西</div>
                <div class=" f-jcc f-aic f-df f-br5 f-pl4 f-pr4" style="background:rgba(255, 153, 2, 1);color:white;">报修</div>
              </div>
            </div>
            <div class="f-f1  f-aic f-df">嘉恒9-1-402，门锁坏了不能反锁。</div>
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
      timeType: "month",
      time: new Date(),
      yingjizhishou: {
        master: [],
        otherList: [],
      },
      platformType: store.state.platformType,
      data: "",
      tableDate: [],
      tableDate2: [],
      aaa: "",
    };
  },
  mounted() {
    this.getData();
    // kit.ajax({
    //   wholeUrl:
    //     $$.url2 + "duty/web/api/v1/incident/event/selectListForPage",
    //   data: {
    //     limit: 20,
    //     offset: 0,
    //     startDay: "2021-03-16",
    //     endDay: moment().format("YYYY-MM-DD"),
    //     eventType: "",
    //     eventName: ""
    //   },
    //   success:(resp) => {
    //     this.tableDate = resp.data.entries
    //   }
    // });

    // 未完成接报事件
    util.ajax({
      wholeUrl:$$.url2 + "duty/web/api/v1/incident/accident/getAccidentRecordList",
      data:{
        offset: 0,
        limit: 5,
        endTime: moment().format("YYYY-MM-DD"),
        // startTime: 2021-03-16
      },
      success:(resp) => {
        this.tableDate2 = resp.data.entries
        // this.tableDate2.length = 5;
      }
    })

    // util.ajax({
    //   wholeUrl:$$.url2 +  "duty/web/api/v1/incident/event/getMoldByCodeIncdentType",
    //   success:() => {

    //   }
    // })

    kit.chartRender(
      $("#paint34"),
      util.paintPie({
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
    kit.chartRender(
      $("#paint35"),
      util.paintPie({
        title: "报警事件",
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
      $("#paint36"),
      util.paintPie({
        title: "接报时间",
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
      $("#paint37"),
      util.paintPie({
        title: "应急事件",
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

    //

    kit.chartRender(
      $("#paint31"),
      util.paintLine({
        title: "事件数量变化",
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
    // console.log(this.$el);
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
    getData() {
      util.ajax({
        url: "/duty/system/details",
        data: {
          timeType: this.timeType == "month" ? "monthStr" : "yearStr",
          timeStr:
            this.timeType == "month"
              ? moment(this.time).format("YYYY-MM")
              : moment(this.time).format("YYYY"),
        },
      });

      util.ajax({
        wholeUrl:
          "http://hzzhhb.net:8041/duty/web/api/v1/public/getUserToCockpit",
        data: {
          workDate: moment(this.time).format("YYYY-MM-DD"),
        },
        success: (resp) => {
          console.log(resp.data);
          if (resp.data) {
                      this.yingjizhishou = resp.data;

          }
        },
      });
    },
    change() {
      this.getData();
    },
    startHacking: function () {
      this.aaa = 111;

      //this.aaa = 111
    },
  },
};
</script>

<style lang="less" scoped>
.is-selected {
  color: #1989fa;
}

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

.info {
  font-family: Bebas Neue;
  color: #29deff;
  font-size: 32px;
}

.num {
  color: #f54455;
  font-size: 32px;
  line-height: 25px;
}
</style>


<style>
.el-calendar__header {
  position: absolute;
  border-bottom: none;
  top: 6px;
  left: 120px;
}
</style>
