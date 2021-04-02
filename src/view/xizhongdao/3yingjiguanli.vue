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
                    <div class="f-f1  bg f-p15 f-bsb">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1">
                          <div class="f-h100p f-w100p f-df">
                            <div class=""><img style="width:30px;" src="../../../src/images/西中岛/值班领导@2x.png" alt=""></div>

                            <div class="f-f1 f-fs12 f-df f-jcc f-aic">值班领导</div>
                          </div>
                        </div>
                        <div class="f-f1 f-tac">孙三南</div>
                      </div>
                    </div>
                    
                    <div style="width:10px;"></div>

                    <div class="f-f1  bg f-p15 f-bsb">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1">
                          <div class="f-h100p f-w100p f-df">
                            <div class=""><img style="width:30px;" src="../../../src/images/西中岛/值班人员@2x.png" alt=""></div>
                            <div class="f-f1 f-fs12 f-df f-jcc f-aic">值班人员</div>
                          </div>
                        </div>
                        <div class="f-f1 f-tac">赵一东、钱二西</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="f-f1 f-mt10 ">
                  <div class="f-h100p f-w100p f-df bg f-p10 f-bsb">
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc ">
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
                    {{ data.day.split('-').slice(2).join('-')  }} {{ data.isSelected ? '✔️' : ''}}
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

            <div class="f-f1">
              <div class="f-h100p f-w100p f-df f-fdc">
                <div class="f-f1">
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
            <h1 class="h1 f-pr">应急预案 <span class="m_bt f-t15 f-r15">查看</span></h1>

            <div id="paint34" class="f-f1"></div>
          </div>

          <div class="f-f1 box f-mt24 f-df f-fdc">
            <h1 class="h1 f-pr">应急资源  <span class="m_bt f-t15 f-r15">查看</span></h1>

            <div class="f-df f-fdc f-bsb f-mt10 f-p20 f-pt1 f-f1">
              <div class="f-h100p f-w100p f-df">
                <div class="f-f1">
                  <div class="f-h100p f-w100p f-df">
                    <div class="f-f1 f-df f-jcc f-aic"><img style="width:30px;" src="../../../src/images/西中岛/应急人员@2x.png" alt=""></div>
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1"><span class="info">55</span>人</div>
                        <div class="f-f1 f-df  f-aic">应急人员</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="f-f1">
                  <div class="f-h100p f-w100p f-df">
                    <div class="f-f1 f-df f-jcc f-aic"><img style="width:30px;" src="../../../src/images/西中岛/应急物资@2x.png" alt=""></div>
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1"><span class="info">1111</span>件</div>
                        <div class="f-f1  f-df  f-aic">应急物资</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="f-h100p f-w100p f-df">
                <div class="f-f1 b">
                  <div class="f-h100p f-w100p f-df">
                    <div class="f-f1 f-df f-jcc f-aic"><img style="width:30px;" src="../../../src/images/西中岛/应急队伍@2x.png" alt=""></div>
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1"><span class="info">7</span>支</div>
                        <div class="f-f1  f-df  f-aic">应急队伍</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="f-f1">
                  <div class="f-h100p f-w100p f-df">
                    <div class="f-f1 f-df f-jcc f-aic"><img style="width:30px;" src="../../../src/images/西中岛/应急车辆@2x.png" alt=""></div>
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1"><span class="info">1</span>7辆</div>
                        <div class="f-f1  f-df  f-aic">应急车辆</div>
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
              :value="tableDate2"
            ></simple-table>
          </div>
        </div>
      </div>
    </template>
    <!-- PC结束 -->

    <!-- moblie开始 -->
    <template v-else> 33333333 </template>
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
      $("#paint36"),
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
      $("#paint37"),
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
    startHacking: function () {
      this.aaa = 111;

      //this.aaa = 111
    },
  },
};
</script>

<style lang="less" scoped>

  .is-selected {
    color: #1989FA;
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
  position:absolute;
  border-bottom:none;
 top: 6px;
    left: 120px;
}
</style>
