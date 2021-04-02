<template>
  <div class="xzd_container f-df f-fdc">
    <!-- PC开始 -->
    <template v-if="platformType == 'pc'">
      <!-- 上部分 -->
      <div class="f-f3 f-df" style="height: 500px">
        <!-- 左 -->
        <div class="f-f1 f-mr24 f-df f-fdc">
          <div class="f-f1 box f-df f-fdc" @click="changeType(0)">
            <h1 class="h1 h1-select" :class="{ 'h1-on': type == 0 }">
              空气达标
            </h1>

            <div class="box_cont f-f1 f-df f-fdc">
              <div class="detail f-df f-fdc f-f1">
                <div class="f-f3 f-df">
                  <div class="f-f3">
                    <h1 class="f-ti15">交流岛站</h1>
                    <div class="air_detail">
                      <label>120 </label>
                      <i>轻度</i>
                      <span>AQI</span>

                      <h2 class="f-mt4">
                        <h3>首要污染物：</h3>
                        <h4>PM2.5</h4>
                      </h2>
                    </div>
                  </div>

                  <div class="f-f2">
                    <h1>2020-12-01 17:00</h1>
                    <div class="air_detail">
                      <div>
                        <img src="../../images/西中岛/温度@2x.png" alt="" />
                        <b>22℃</b>
                      </div>
                      <div class="f-mt6">
                        <img src="../../images/西中岛/湿度@2x.png" alt="" />
                        <b>64%</b>
                      </div>
                      <div class="f-mt6">
                        <img src="../../images/西中岛/风向@2x.png" alt="" />
                        <b>西北风 3级</b>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="f-f2 f-df f-fdc">
                  <div class="f-f1 f-df">
                    <span class="f-f1 f-df">
                      <label class="f-f1">PM2.5 </label>
                      <h3
                        class="f-f1 f-ti5 f-tac"
                        style="color: rgba(48, 211, 133, 1)"
                      >
                        22
                      </h3>
                    </span>

                    <span class="f-f1 f-df">
                      <label class="f-tac f-f1">PM10</label>
                      <h3
                        class="f-f1 f-ti5 f-tac"
                        style="color: rgba(48, 211, 133, 1)"
                      >
                        11
                      </h3>
                    </span>

                    <span class="f-f1 f-df">
                      <label class="f-tac f-f1">SO2</label>
                      <h3
                        class="f-f1 f-ti5 f-tac"
                        style="color: rgba(48, 211, 133, 1)"
                      >
                        11
                      </h3>
                    </span>
                  </div>

                  <div class="f-f1 f-df">
                    <span class="f-f1 f-df">
                      <label class="f-tac f-f1">NO2 </label>
                      <h3
                        class="f-f1 f-ti5 f-tac"
                        style="color: rgba(48, 211, 133, 1)"
                      >
                        22
                      </h3>
                    </span>

                    <span class="f-f1 f-df">
                      <label class="f-tac f-f1">O3 </label>
                      <h3
                        class="f-f1 f-ti5 f-tac"
                        style="color: rgba(48, 211, 133, 1)"
                      >
                        11
                      </h3>
                    </span>

                    <span class="f-f1 f-df">
                      <label class="f-tac f-f1">CO </label>
                      <h3
                        class="f-f1 f-ti5 f-tac"
                        style="color: rgba(48, 211, 133, 1)"
                      >
                        11
                      </h3>
                    </span>
                  </div>

                  <h1 class="danwei">单位：μg/m³，CO：mg/m³</h1>
                </div>

                <el-divider></el-divider>
              </div>
              <div>
                <div
                  id="paint1"
                  style="height: 150px; width: 300px; margin: 0 auto"
                ></div>
                <span>优良天数</span>
                <span class="f-ti10" style="color: #30d385; font-size: 28px"
                  >123</span
                >
                <span class="f-ti25">重污染天数天数</span>
                <span class="f-ti10" style="color: #ff0200; font-size: 28px"
                  >18</span
                >
              </div>
            </div>
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
          <div v-show="type == 0" class="f-f1 f-df f-fdc f-pt20">
            <div class="f-f1 f-df">
              <div id="paint2" class="f-f1"></div>
              <div id="paint3" class="f-f1"></div>
              <div id="paint4" class="f-f1"></div>
            </div>
            <el-divider></el-divider>
            <div class="f-f1 f-df f-fdc">
              <el-radio-group v-model="checkboxGroup3" size="mini">
                <el-radio-button
                  v-for="city in cities"
                  :label="city"
                  :key="city"
                  >{{ city }}</el-radio-button
                >
              </el-radio-group>

              <div class="f-f1 f-mt10" id="paint5"></div>
            </div>
          </div>

          <div v-show="type == 1" class="f-f1 f-df f-fdc f-pt20">
            <div class="f-f3 f-df">
              <div class="f-h100p f-w100p f-df">
                <div class="f-f2">
                  <div class="f-h100p f-df f-fdc f-pr">
                    <div class="">排污大户-前五</div>
                    <el-select
                      class="select_cont wuranwu_select"
                      style="width: 100px"
                      size="mini"
                      v-model="wuranType"
                      change=""
                    >
                      <el-option
                        v-for="item in [
                          { value: 'klw', label: '颗粒物' },
                          { value: 'SO2', label: 'SO2' },
                          { value: 'NOx', label: 'NOx' },
                        ]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <div class="f-f1" id="paint24"></div>
                  </div>
                </div>
                <div class="f-f3">
                  <div class="f-h100p f-w100p f-df f-fdc f-pr">
                    <div class="">超标企业-前五</div>
                    <span
                      style="
                        color: #ffffff;
                        font-size: 12px;
                        top: 0px;
                        right: 40px;
                        opacity: 60%;
                      "
                      class="f-pa"
                      >单位：次</span
                    >
                    <div class="f-f1">
                      <div
                        class="f-h100p f-df f-fww"
                        style="
                          justify-content: flex-start;
                          align-content: space-around;
                        "
                      >
                        <div
                          class="f-w46p f-h23p f-df f-mr10"
                          v-for="item in 5"
                          :key="item"
                        >
                          <div
                            style="background: #053570"
                            class="f-h100p f-w100p f-df f-fdc f-p5"
                          >
                            <div class="f-f1">
                              <div class="f-h100p f-w100p f-df">
                                <div class="f-f1 f-lh26">
                                  01
                                  <span class="f-ti5"
                                    >大连蒙连石化有限公司</span
                                  >
                                </div>
                                <div style="color: #29deff; font-size: 18px">
                                  16
                                </div>
                              </div>
                            </div>
                            <div class="f-f1">
                              <div class="f-h100p f-w100p f-df">
                                <div class="f-f1 f-tac">
                                  颗粒物
                                  <span style="color: #29deff; font-size: 16px"
                                    >5</span
                                  >
                                </div>
                                <div class="f-f1 f-tac">
                                  SO2
                                  <span style="color: #29deff; font-size: 16px"
                                    >5</span
                                  >
                                </div>
                                <div class="f-f1 f-tac">
                                  NOx
                                  <span style="color: #29deff; font-size: 16px"
                                    >5</span
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="f-f2 f-df f-fdc">
              <div class="f-f1 f-mt10" id="paint6"></div>
            </div>
          </div>

          <div v-show="type == 2" class="f-f1 f-df f-fdc f-pt20">
            <div class="f-f3 f-df">
              <div class="f-h100p f-w100p f-df">
                <div class="f-f2">
                  <div class="f-h100p f-df f-fdc f-pr">
                    <div class="">排污大户-前五</div>
                    <el-select
                      class="select_cont wuranwu_select"
                      style="width: 100px"
                      size="mini"
                      v-model="wushuiType"
                      change=""
                    >
                      <el-option
                        v-for="item in [
                          { value: 'klw', label: '污水' },
                          { value: 'COD', label: 'COD' },
                          { value: '氨氮', label: '氨氮' },
                          { value: '总磷', label: '总磷' },
                        ]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <div class="f-f1" id="paint25"></div>
                  </div>
                </div>
                <div class="f-f3">
                  <div class="f-h100p f-w100p f-df f-fdc f-pr">
                    <div class="">超标企业-前五</div>
                    <span
                      style="
                        color: #ffffff;
                        font-size: 12px;
                        top: 0px;
                        right: 40px;
                        opacity: 60%;
                      "
                      class="f-pa"
                      >单位：次</span
                    >
                    <div class="f-f1">
                      <div
                        class="f-h100p f-df f-fww"
                        style="
                          justify-content: flex-start;
                          align-content: space-around;
                        "
                      >
                        <div
                          class="f-w46p f-h23p f-df f-mr10"
                          v-for="item in 5"
                          :key="item"
                        >
                          <div
                            style="background: #053570"
                            class="f-h100p f-w100p f-df f-fdc f-p5"
                          >
                            <div class="f-f1">
                              <div class="f-h100p f-w100p f-df f-lh26">
                                <div class="f-f1 f-lh26">
                                  01
                                  <span class="f-ti5"
                                    >大连蒙连石化有限公司</span
                                  >
                                </div>
                                <div style="color: #29deff; font-size: 18px">
                                  16
                                </div>
                              </div>
                            </div>
                            <div class="f-f1">
                              <div class="f-h100p f-w100p f-df">
                                <div class="f-f1 f-tac">
                                  颗粒物
                                  <span style="color: #29deff; font-size: 16px"
                                    >5</span
                                  >
                                </div>
                                <div class="f-f1 f-tac">
                                  SO2
                                  <span style="color: #29deff; font-size: 16px"
                                    >5</span
                                  >
                                </div>
                                <div class="f-f1 f-tac">
                                  NOx
                                  <span style="color: #29deff; font-size: 16px"
                                    >5</span
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="f-f2 f-df f-fdc">
              <div class="f-f1 f-mt10" id="paint7"></div>
            </div>
          </div>
          <!-- 中间切换结束 -->
        </div>

        <!-- <div class="f-h100p f-w100p f-df f-fdc">
                      <div class="f-f1 f-tac">PM2.5</div>
                      <div class="f-f1 f-fs08r f-fwb f-tac">134</div>
                      <div class="f-f1 f-tac">μg/m³</div>
                    </div> -->

        <div class="f-f1 f-df f-fdc f-ml24">
          <div class="f-f1 box" @click="changeType(1)">
            <h1 class="h1 h1-select" :class="{ 'h1-on': type == 1 }">
              废气达标
            </h1>

            <div class="f-df f-fdc">
              <label class="label">
                <img
                  src="../../../src/images/西中岛/西中岛中日合作产业园@2x.png"
                />
                废气排口数量<span>17</span>
              </label>
              <span class="f-mt5 f-ml30">因子超标次数</span>
              <label class="label f-mt5 f-df f-pt5" style="height: 70px">
                <span class="f-f1 f-df f-fdc" style="line-height: initial">
                  <span class="f-f1 f-tac xinmu">1</span>
                  <span class="f-f1 f-tac">SO2</span>
                </span>
                <span class="f-f1 f-df f-fdc" style="line-height: initial">
                  <span class="f-f1 f-tac xinmu">2</span>
                  <span class="f-f1 f-tac">NOx</span>
                </span>
                <span class="f-f1 f-df f-fdc" style="line-height: initial">
                  <span class="f-f1 f-tac xinmu">3</span>
                  <span class="f-f1 f-tac">烟尘</span>
                </span>
              </label>
            </div>
          </div>

          <div class="f-f1 box f-mt24" @click="changeType(2)">
            <h1 class="h1 h1-select" :class="{ 'h1-on': type == 2 }">
              废水达标
            </h1>

            <div class="f-df f-fdc">
              <label class="label">
                <img
                  src="../../../src/images/西中岛/西中岛中日合作产业园@2x.png"
                />
                废水排口数量<span>17</span>
              </label>
              <span class="f-mt5 f-ml30">因子超标次数</span>
              <label class="label f-mt5 f-df f-pt5" style="height: 70px">
                <span class="f-f1 f-df f-fdc" style="line-height: initial">
                  <span class="f-f1 f-tac xinmu">1</span>
                  <span class="f-f1 f-tac">COD</span>
                </span>
                <span class="f-f1 f-df f-fdc" style="line-height: initial">
                  <span class="f-f1 f-tac xinmu">2</span>
                  <span class="f-f1 f-tac">氨氮</span>
                </span>
                <span class="f-f1 f-df f-fdc" style="line-height: initial">
                  <span class="f-f1 f-tac xinmu">3</span>
                  <span class="f-f1 f-tac">PH</span>
                </span>
              </label>
            </div>

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
    <template v-else>
      <!-- 头部详细开始 -->
      <div class="zhiliang f-cw f-mt10 f-p20">
        <div class="f-h100p f-w100p f-df f-fdc">
          <div class="f-df" style="height: 1rem">
            <h2 class="f-fs06r f-f1">实时空气质量</h2>
            <h2 class="f-fs06r f-f1 f-tar">2020-12-01 17:00</h2>
          </div>
          <div class="f-f1">
            <div class="f-h100p f-w100p f-df f-fdc">
              <div class="f-f1">
                <div class="f-h100p f-w100p f-df">
                  <div class="f-f1 f-fs21r f-tar">134</div>
                  <div class="f-f1">
                    <div class="f-h100p f-w100p f-df f-fdc">
                      <div class="f-f1 f-df f-aic">
                        <span
                          class="f-ml10 f-o09 f-br4 f-p2"
                          style="background: rgba(255, 153, 2, 1)"
                          >轻度污染</span
                        >
                      </div>
                      <div class="f-f1 f-ml10 f-o09">首要污染物：无</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="f-f1 f-fs06r">
                <div class="f-h100p f-w100p f-df">
                  <div class="f-f1">
                    <div class="f-h100p f-w100p f-df f-fdc">
                      <div class="f-f1 f-tac">PM2.5</div>
                      <div class="f-f1 f-fs08r f-fwb f-tac">134</div>
                      <div class="f-f1 f-tac">μg/m³</div>
                    </div>
                  </div>
                  <div class="f-f1">
                    <div class="f-h100p f-w100p f-df f-fdc">
                      <div class="f-f1 f-tac">PM10</div>
                      <div class="f-f1 f-fs08r f-fwb f-tac">134</div>
                      <div class="f-f1 f-tac">μg/m³</div>
                    </div>
                  </div>
                  <div class="f-f1">
                    <div class="f-h100p f-w100p f-df f-fdc">
                      <div class="f-f1 f-tac">SO₂</div>
                      <div class="f-f1 f-fs08r f-fwb f-tac">134</div>
                      <div class="f-f1 f-tac">μg/m³</div>
                    </div>
                  </div>
                  <div class="f-f1">
                    <div class="f-h100p f-w100p f-df f-fdc">
                      <div class="f-f1 f-tac">NO₂</div>
                      <div class="f-f1 f-fs08r f-fwb f-tac">134</div>
                      <div class="f-f1 f-tac">μg/m³</div>
                    </div>
                  </div>
                  <div class="f-f1">
                    <div class="f-h100p f-w100p f-df f-fdc">
                      <div class="f-f1 f-tac">O₃</div>
                      <div class="f-f1 f-fs08r f-fwb f-tac">134</div>
                      <div class="f-f1 f-tac">μg/m³</div>
                    </div>
                  </div>
                  <div class="f-f1">
                    <div class="f-h100p f-w100p f-df f-fdc">
                      <div class="f-f1 f-tac">CO</div>
                      <div class="f-f1 f-fs08r f-fwb f-tac">134</div>
                      <div class="f-f1 f-tac">μg/m³</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="youlianglv f-df f-mt20">
        <div class="f-h100p f-w100p f-df">
          <div class="f-df f-fdc f-f1 f-bcw f-br12">
            <h2 class="f-tac f-cb f-fs07r f-m10">全年空气优良率</h2>
            <van-circle
              class="f-ma"
              v-model="currentRate"
              :rate="currentRate"
              :stroke-width="100"
              size="5rem"
              :text="text"
              color="rgba(51, 204, 156, 1)"
              layer-color="#ebedf0"
            />
          </div>
          <div style="width: 10px"></div>

          <div class="f-df f-fdc f-f1 f-bcw f-br12">
            <h2 class="f-tac f-cb f-fs07r f-m10">全年首要污染物分布</h2>
            <van-circle
              class="f-ma"
              v-model="currentRate"
              :rate="currentRate"
              :stroke-width="100"
              size="5rem"
              :text="text"
              color="rgba(51, 204, 156, 1)"
              layer-color="#ebedf0"
            />
          </div>
        </div>
      </div>
      <!-- 头部详细结束 -->

      <van-tabs class="f-mt20" v-model="active" color="white">
        <van-tab title="废气">
          <div style="height: 7rem" class="f-bcw f-br12 f-mt10"></div>
          <div style="height: 10rem" class="f-bcw f-br12 f-mt10"></div>
          <div style="height: 10rem" class="f-bcw f-br12 f-mt10"></div>
        </van-tab>
        <van-tab title="废水">
          <div style="height: 7rem" class="f-bcw f-br12 f-mt10"></div>
          <div style="height: 10rem" class="f-bcw f-br12 f-mt10"></div>
          <div style="height: 10rem" class="f-bcw f-br12 f-mt10"></div
        ></van-tab>
      </van-tabs>
    </template>
    <!-- mobile结束 -->
  </div>
</template>

<script>
// 生命周期
export default {
  data() {
    return {
      active: 2,
      currentRate: 80,
      checkboxGroup3: "AQI",
      weather: {},
      cities: ["AQI", "综合", "PM2.5", "PM10", "SO₂", "NO₂", "O₃", "CO"],
      timeType: "month",
      wuranType: "SO2",
      wushuiType: "COD",
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
  computed: {
    text() {
      return this.currentRate.toFixed(0) + "%";
    },
  },
  mounted() {
    console.log(this.$el);

    kit.ajax({
      url: "/fpi/air/weather",
      data: {
        cityCode: "",
      },
      success: (resp) => {
        console.log(resp);
      },
    });

    // kit.ajax();
    kit.chartRender(
      $("#paint1"),
      util.paintPie({
        title: "全年空气质量等级占比",
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
      $("#paint2"),
      util.paintPie({
        title: "空气质量等级占比分布图",
        formatter: "{b} {c} 天 \n 占比 {d} ",
        data: [
          { value: 1048, name: "优" },
          { value: 735, name: "良3" },
        ],
      })
    );

    kit.chartRender(
      $("#paint3"),
      util.paintPie({
        title: "首要污染物占比分布图",
        formatter: "{b} {c} 天 \n 占比 {d} ",
        data: [
          { value: 1048, name: "优" },
          { value: 735, name: "良3" },
        ],
      })
    );

    kit.chartRender(
      $("#paint4"),
      util.paintPie({
        title: "六项污染物贡献率分布图",
        formatter: "{b} {c} 天 \n 占比 {d} ",
        data: [
          { value: 1048, name: "优" },
          { value: 735, name: "良3" },
        ],
      })
    );

    kit.chartRender(
      $("#paint5"),
      util.paintLine({
        title: "",
        formatter: "{b} {c} 天 \n 占比 {d} ",
        data: [
          { value: 1048, name: "优" },
          { value: 735, name: "良3" },
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
    changeType(type) {
      this.type = type;

      if (type == 1) {
        this.$nextTick(() => {
          kit.chartRender(
            $("#paint6"),
            util.paintLine({
              title: "园区排放总量",
              formatter: "{b} {c} 天 \n 占比 {d} ",
              data: [
                { value: 1048, name: "优" },
                { value: 735, name: "良3" },
              ],
            })
          );
        });
      }

      this.$nextTick(() => {
        kit.chartRender(
          $("#paint24"),
          util.paintBar({
            formatter: "{b} {c} 天 \n 占比 {d} ",
            legend: ["收费", "缴费"],
            color: ["rgba(41, 222, 255, 1)"],
            data: [
              { value: 1048, name: "优" },
              { value: 735, name: "良3" },
            ],
          })
        );

        kit.chartRender(
          $("#paint25"),
          util.paintBar({
            formatter: "{b} {c} 天 \n 占比 {d} ",
            legend: ["收费", "缴费"],
            color: ["rgba(41, 222, 255, 1)"],
            data: [
              { value: 1048, name: "优" },
              { value: 735, name: "良3" },
            ],
          })
        );
      });

      if (type == 2) {
        this.$nextTick(() => {
          kit.chartRender(
            $("#paint7"),
            util.paintLine({
              title: "园区排放总量",
              formatter: "{b} {c} 天 \n 占比 {d} ",
              data: [
                { value: 1048, name: "优" },
                { value: 735, name: "良3" },
              ],
            })
          );
        });
      }
    },
    startHacking: function () {
      this.aaa = 111;

      //this.aaa = 111
    },
  },
};
</script>

<style lang="less" scoped>
.wuranwu_select {
  top: -5px;
  position: absolute;
  right: 10px;
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

.youlianglv {
  height: 8rem;
}

.air_detail {
  padding: 16px;
  position: relative;
  label {
    font-family: Bebas Neue;
    color: #ff9902;
    font-size: 64px;
    line-height: 48px;
  }
  i {
    position: absolute;
    top: 10px;
    width: 32px;
    height: 20px;
    background-color: #ff9902;
    border-radius: 2px;
    text-align: center;
  }
  span {
    opacity: 60%;
    width: 32px;
    height: 17px;
    color: #ffffff;
    font-size: 12px;
    line-height: 16px;
  }

  h3 {
    width: 84px;
    height: 20px;
    color: #ffffff;
    font-size: 14px;
    line-height: 18px;
    display: inline-block;
  }
  h4 {
    width: 45px;
    height: 16px;
    color: #29deff;
    font-size: 14px;
    line-height: 18px;
    display: inline-block;
  }
  img {
    width: 16px;
  }
}

.danwei {
  opacity: 70%;

  // height: 17px;
  font-family: PingFang SC;
  color: #ffffff;
  font-size: 12px;
  line-height: 14px;
  text-align: right;
  margin-right: 12px;
}

.xinmu {
  // font-family:Bebas Neue;
  color: #f54455;
  font-size: 26px;
}

.zhiliang {
  background-image: url(../../../src/images/西中岛app/轻度@2X.png);
  // background-image: url(../../../src/images/西中岛/top.png);
  background-repeat: no-repeat;
  // background-size: 100% 100%;
  // background-size: cover;
  background-size: 100% 100%;
  height: 8rem;
}

// .bottom {}
</style>



<style>
</style>
