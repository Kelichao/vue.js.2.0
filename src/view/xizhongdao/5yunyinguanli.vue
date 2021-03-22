<template>
  <!-- <div style='{backgroundUrl: "@/images/西中岛/背景.png"}' >123 -->
  <div class="xzd_container f-df f-fdc">
    <!-- 上部分 -->
    <div class="f-f3 f-df" style="height: 500px">
      <!-- 左 -->
      <div class="f-f1 f-mr24 f-df f-fdc">
        <div class="f-f1 box" @click="changeType(0)">
          <h1 class="h1 h1-select" :class="{ 'h1-on': type == 0 }">管网监测</h1>

          <div class="f-df f-fdr">
            <div class="f-f1 f-tac">
              <el-progress
                :width="80"
                class="f-ma"
                stroke-linecap="butt"
                :stroke-width="8"
                type="circle"
                :percentage="25"
                color="rgba(51, 204, 156, 1)"
              ></el-progress>
              <div>
                <h5 class="f-tac">设备联网率</h5>
                <h5 class="f-tac">
                  <span>在线</span>
                  <span
                    class="f-fs20 f-vas f-ti15"
                    style="color: rgba(41, 222, 255, 1)"
                    >16</span
                  >
                </h5>
                <h5 class="f-tac">
                  总数
                  <span
                    class="f-fs20 f-vas f-ti15"
                    style="color: rgba(41, 222, 255, 1)"
                    >16</span
                  >
                </h5>
              </div>
            </div>

            <div class="f-f1 f-tac">
              <el-progress
                :width="80"
                class="f-ma"
                stroke-linecap="butt"
                :stroke-width="8"
                type="circle"
                :percentage="25"
                color="rgba(51, 204, 156, 1)"
              ></el-progress>
              <div>
                <h5 class="f-tac">阀门开启率</h5>
                <h5 class="f-tac">
                  在线
                  <span
                    class="f-fs20 f-vas f-ti15"
                    style="color: rgba(41, 222, 255, 1)"
                    >16</span
                  >
                </h5>
                <h5 class="f-tac">
                  总数
                  <span
                    class="f-fs20 f-vas f-ti15"
                    style="color: rgba(41, 222, 255, 1)"
                    >16</span
                  >
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div class="f-f1 box f-mt24" @click="changeType(1)">
          <h1 class="h1 h1-select" :class="{ 'h1-on': type == 1 }">水费营收</h1>

          <div class="f-df f-fdr f-bsb f-mt10"></div>

          <div class="f-df f-fdc"></div>
        </div>
      </div>

      <!-- 中 -->
      <div class="lunbotu f-df box f-p20 f-fdc">
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

        <!-- 中间切换开始 -->
        <div v-show="type == 0" class="lunbotu f-df f-fdc f-f1">
          <div class="f-f1 f-df">
            <div class="f-f1 f-df" style="">
              <div class="f-df f-fdr f-f1">
                <div class="f-f2 f-tac">
                  <h5 class="f-tac f-p20">漏失率</h5>
                  <el-progress
                    :width="100"
                    class="f-ma"
                    stroke-linecap="butt"
                    :stroke-width="10"
                    type="circle"
                    :percentage="25"
                    color="rgba(41, 222, 255, 1)"
                  ></el-progress>
                  <div></div>
                </div>

                <div class="f-f3 f-tac">
                  <h5 class="f-tac f-p20">漏损率</h5>
                  <el-progress
                    :width="100"
                    class="f-ma"
                    stroke-linecap="butt"
                    :stroke-width="10"
                    type="circle"
                    :percentage="25"
                    color="rgba(41, 222, 255, 1)"
                  ></el-progress>
                  <div></div>
                </div>
              </div>
            </div>
            <div class="f-f1" style="">2222</div>
          </div>
          <div class="f-f1 f-df f-fdc">
            <div class="f-f1 f-mt10" id="paint5"></div>
          </div>
        </div>

        <div class="lunbotu f-df f-fdc f-f1" v-show="type == '1'">
          <div class="f-f1 f-df">
            <div class="f-f1" style="">33</div>
            <div class="f-f1" style="">44</div>
          </div>
          <div class="f-f1 f-df f-fdc">
            <div class="f-f1 f-mt10" id="paint6"></div>
          </div>
        </div>

        <div class="lunbotu f-df f-fdc f-f1" v-show="type == '2'">
          <div class="f-f1 f-df">
            <div id="paint53" class="f-f1" style=""></div>
            <div id="paint54" class="f-f1" style=""></div>
          </div>
          <div class="f-f1 f-df f-fdc">
            <div class="f-f1 f-mt10" id="paint7"></div>
          </div>
        </div>

        <div class="lunbotu f-df f-fdc f-f1" v-show="type == '3'">
          <div class="f-f1 f-df">
            <div id="paint55" class="f-f1" style=""></div>
            <div id="paint56" class="f-f1" style=""></div>
          </div>
          <div class="f-f1 f-df f-fdc">
            <div class="f-f1 f-mt10" id="paint8"></div>
          </div>
        </div>
        <!-- 中间切换结束 -->
      </div>

      <!-- 右 -->

      <div class="f-f1 f-df f-fdc f-ml24">
        <div class="f-f1 box" @click="changeType(2)">
          <h1 class="h1 h1-select" :class="{ 'h1-on': type == 2 }">路灯照明</h1>

          <div class="f-df f-fdr">
            <div class="f-f1 f-tac">
              <el-progress
                :width="80"
                class="f-ma"
                stroke-linecap="butt"
                :stroke-width="8"
                type="circle"
                :percentage="25"
                color="rgba(51, 204, 156, 1)"
              ></el-progress>
              <div>
                <h5 class="f-tac">设备联网率</h5>
                <h5 class="f-tac">
                  <span>在线</span>
                  <span
                    class="f-fs20 f-vas f-ti15"
                    style="color: rgba(41, 222, 255, 1)"
                    >16</span
                  >
                </h5>
                <h5 class="f-tac">
                  总数
                  <span
                    class="f-fs20 f-vas f-ti15"
                    style="color: rgba(41, 222, 255, 1)"
                    >16</span
                  >
                </h5>
              </div>
            </div>

            <div class="f-f1 f-tac">
              <el-progress
                :width="80"
                class="f-ma"
                stroke-linecap="butt"
                :stroke-width="8"
                type="circle"
                :percentage="25"
                color="rgba(51, 204, 156, 1)"
              ></el-progress>
              <div>
                <h5 class="f-tac">亮灯率</h5>
                <h5 class="f-tac">
                  在线
                  <span
                    class="f-fs20 f-vas f-ti15"
                    style="color: rgba(41, 222, 255, 1)"
                    >16</span
                  >
                </h5>
                <h5 class="f-tac">
                  总数
                  <span
                    class="f-fs20 f-vas f-ti15"
                    style="color: rgba(41, 222, 255, 1)"
                    >16</span
                  >
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div class="f-f1 box f-mt24" @click="changeType(3)">
          <h1 class="h1 h1-select" :class="{ 'h1-on': type == 3 }">巡查管控</h1>

          <div class="f-df f-fdr">
            <div class="f-f1 f-tac">
              <el-progress
                :width="80"
                class="f-ma"
                stroke-linecap="butt"
                :stroke-width="8"
                type="circle"
                :percentage="25"
                color="rgba(51, 204, 156, 1)"
              ></el-progress>
              <div>
                <h5 class="f-tac">计划完成率</h5>
                <h5 class="f-tac">
                  <span>在线</span>
                  <span
                    class="f-fs20 f-vas f-ti15"
                    style="color: rgba(41, 222, 255, 1)"
                    >16</span
                  >
                </h5>
                <h5 class="f-tac">
                  总数
                  <span
                    class="f-fs20 f-vas f-ti15"
                    style="color: rgba(41, 222, 255, 1)"
                    >16</span
                  >
                </h5>
              </div>
            </div>

            <div class="f-f1 f-tac">
              <el-progress
                :width="80"
                class="f-ma"
                stroke-linecap="butt"
                :stroke-width="8"
                type="circle"
                :percentage="25"
                color="rgba(51, 204, 156, 1)"
              ></el-progress>
              <div>
                <h5 class="f-tac">事件处理率</h5>
                <h5 class="f-tac">
                  在线
                  <span
                    class="f-fs20 f-vas f-ti15"
                    style="color: rgba(41, 222, 255, 1)"
                    >16</span
                  >
                </h5>
                <h5 class="f-tac">
                  总数
                  <span
                    class="f-fs20 f-vas f-ti15"
                    style="color: rgba(41, 222, 255, 1)"
                    >16</span
                  >
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 下部分 -->
    <div class="f-f2 f-df f-mt24 f-ofa bottom">
      <!-- 左 -->
      <div class="f-f1 box f-df f-fdc">
        <h1 class="h1">园区用水量变化</h1>
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
  </div>
</template>

<script>
// 生命周期
export default {
  mounted() {
    console.log(this.$el);
    kit.ajax();

    kit.chartRender(
      $("#paint1"),
      kit.util.paintLine({
        title: "",
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
      $("#paint5"),
      kit.util.paintBar({
        title: "测点对比",
        formatter: "{b} {c} 天 \n 占比 {d} ",
        legend: ["收费", "缴费"],
        data: [
          { value: 1048, name: "优" },
          { value: 735, name: "良3" },
        ],
      })
    );
  },
  beforeMount() {
    console.log(this.$el);
  },
  components: {},
  data() {
    return {
      type: 0,
      timeType: "month",
      time: new Date(),
      platformType: store.state.platformType,
      tableDate: [],
      data: "",
      aaa: "",
    };
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
    changeType(type) {
      this.type = type;

      this.$nextTick(() => {
        kit.chartRender(
          $("#paint6"),
          kit.util.paintLine({
            title: "园区营收变化",
            formatter: "{b} {c} 天 \n 占比 {d} ",
            legend: ["收费", "缴费"],
            data: [
              { value: 1048, name: "优" },
              { value: 735, name: "良3" },
            ],
          })
        );

        kit.chartRender(
          $("#paint7"),
          kit.util.paintLine({
            title: "能耗趋势",
            formatter: "{b} {c} 天 \n 占比 {d} ",
            legend: ["收费", "缴费"],
            data: [
              { value: 1048, name: "优" },
              { value: 735, name: "良3" },
            ],
          })
        );

        kit.chartRender(
          $("#paint8"),
          kit.util.paintLine({
            title: "能耗趋势",
            formatter: "{b} {c} 天 \n 占比 {d} ",
            legend: ["收费", "缴费"],
            data: [
              { value: 1048, name: "优" },
              { value: 735, name: "良3" },
            ],
          })
        );

        // kit.ajax();
        kit.chartRender(
          $("#paint55"),
          kit.util.paintPie({
            title: "巡查统计",
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

        // kit.ajax();
        kit.chartRender(
          $("#paint56"),
          kit.util.paintPie({
            title: "事件统计",
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
          $("#paint53"),
          kit.util.paintPie({
            title: "用电计划",
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
          $("#paint54"),
          kit.util.paintBar({
            title: "测点对比",
            formatter: "{b} {c} 天 \n 占比 {d} ",
            legend: ["收费", "缴费"],
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
