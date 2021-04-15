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
              管网监测
            </h1>

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

          <div class="f-f1 box f-mt24 f-df f-fdc" @click="changeType(1)">
            <h1 class="h1 h1-select" :class="{ 'h1-on': type == 1 }">
              水费营收
            </h1>

            <div class="f-df f-fdr f-bsb f-mt10 f-f1">
              <div class="f-h100p f-w100p f-df f-fdc">
                <div class="f-f1">
                  <div class="f-h100p f-w100p f-df">
                    <div class="f-f1">
                      <div class="f-h70p f-w80p f-df f-fdc f-ma">
                        <div class="f-f1 f-tac">总用水量</div>
                        <div class="f-f1 f-tac">
                          <span
                            style="
                              color: rgba(41, 222, 255, 1);
                              font-size: 22px;
                            "
                            >200856.00
                          </span>
                          <span style="opacity: 0.6">吨</span>
                        </div>
                      </div>
                    </div>
                    <div class="f-f1">
                      <div class="f-h70p f-w80p f-ma f-df f-fdc">
                        <div class="f-f1 f-tac">总收费</div>
                        <div class="f-f1 f-tac">
                          <span
                            style="
                              color: rgba(41, 222, 255, 1);
                              font-size: 22px;
                            "
                            >200856.00
                          </span>
                          元
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="f-f1">
                  <div class="f-h100p f-w100p f-df">
                    <div class="f-f1">
                      <div class="f-h70p f-w80p f-ma f-df f-fdc">
                        <div class="f-f1 f-tac">企业用水</div>
                        <div class="f-f1 f-tac">
                          <span
                            style="
                              color: rgba(41, 222, 255, 1);
                              font-size: 22px;
                            "
                            >2008</span
                          >
                          <span style="opacity: 0.6">吨</span>
                        </div>
                      </div>
                    </div>
                    <div class="f-f1">
                      <div class="f-h70p f-w80p f-ma f-df f-fdc">
                        <div class="f-f1 f-tac">其他用水</div>
                        <div class="f-f1 f-tac">
                          <span
                            style="
                              color: rgba(41, 222, 255, 1);
                              font-size: 22px;
                            "
                            >200
                          </span>
                          <span style="opacity: 0.6">吨</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
          <div v-show="type == 0" class="lunbotu f-df f-fdc f-f1 f-pr">
            <el-select
              class="select_cont f-pa f-t-20 f-r10"
              style="width: 100px; position: absolute"
              size="mini"
              v-model="yilouType"
              change="change"
            >
              <el-option
                v-for="item in [
                  { value: 'month', label: '漏失率' },
                  { value: 'year', label: '漏损率' },
                ]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
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
              <div class="f-f1" style="" id="paint59"></div>
            </div>
            <el-divider></el-divider>
            <div class="f-f1 f-df f-fdc">
              <div class="f-f1 f-mt10" id="paint5"></div>
            </div>
          </div>

          <div class="lunbotu f-df f-fdc f-f1" v-show="type == '1'">
            <div class="f-f1 f-df">
              <div class="f-f2 f-df f-fdc f-p20" style="">
                <h1>营收统计</h1>
                <div class="f-h100p f-w100p f-df f-mt20">
                  <div class="f-f1">
                    <div class="f-h100p f-w100p f-df">
                      <div style="width: 50px" class="f-df f-jcc f-aic">
                        <img
                          style="width: 30px"
                          src="../../../src/images/西中岛/总购水量@2x.png"
                          alt=""
                        />
                      </div>
                      <div class="f-f1">
                        <div class="f-h100p f-w100p f-df f-fdc">
                          <div class="f-f1">
                            <span class="info">3660000.00</span
                            ><span class="f-o6">万吨</span>
                          </div>
                          <div class="f-f1 f-df f-fs12 f-aic">总购水量</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="f-f1">
                    <div class="f-h100p f-w100p f-df">
                      <div style="width: 50px" class="f-df f-jcc f-aic">
                        <img
                          style="width: 30px"
                          src="../../../src/images/西中岛/总缴费@2x.png"
                          alt=""
                        />
                      </div>
                      <div class="f-f1">
                        <div class="f-h100p f-w100p f-df f-fdc">
                          <div class="f-f1">
                            <span class="info">3660000.00</span
                            ><span class="f-o6">元</span>
                          </div>
                          <div class="f-f1 f-df f-fs12 f-aic">总缴费</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="f-h100p f-w100p f-df">
                  <div class="f-f1">
                    <div class="f-h100p f-w100p f-df">
                      <div style="width: 50px" class="f-df f-jcc f-aic">
                        <img
                          style="width: 30px"
                          src="../../../src/images/西中岛/总用水量@2x.png"
                          alt=""
                        />
                      </div>
                      <div class="f-f1">
                        <div class="f-h100p f-w100p f-df f-fdc">
                          <div class="f-f1">
                            <span class="info">3660000.00</span
                            ><span class="f-o6">万吨</span>
                          </div>
                          <div class="f-f1 f-df f-fs12 f-aic">总用水量</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="f-f1">
                    <div class="f-h100p f-w100p f-df">
                      <div style="width: 50px" class="f-df f-jcc f-aic">
                        <img
                          style="width: 30px"
                          src="../../../src/images/西中岛/总收费@2x.png"
                          alt=""
                        />
                      </div>
                      <div class="f-f1">
                        <div class="f-h100p f-w100p f-df f-fdc">
                          <div class="f-f1">
                            <span class="info">3660000.00</span
                            ><span class="f-o6">万吨</span>
                          </div>
                          <div class="f-f1 f-df f-fs12 f-aic">总收费</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="f-f2" style="">
                <h1>企业用水详情</h1>
                <div class="tab_cont" style="height: 90%">
                  <simple-table
                    :head="[
                      '企业',
                      '用水量（万吨）',
                      '应收费用（万元）',
                      '实收费用（万元）',
                      '欠款（万元）',
                    ]"
                    :value="tableDate2"
                  ></simple-table>
                </div>
              </div>
            </div>

            <el-divider style="width: 100%"></el-divider>

            <div class="f-f1 f-df f-fdc">
              <div class="f-f1 f-mt10" id="paint6"></div>
            </div>
          </div>

          <div class="lunbotu f-df f-fdc f-f1" v-show="type == '2'">
            <div class="f-f1 f-df">
              <div id="paint53" class="f-f2" style=""></div>
              <div class="f-f3" style="">
                <div class="f-h100p f-w100p f-df">
                  <div class="f-f2" div id="paint54"></div>
                  <div class="f-f1">
                    <div class="f-h100p f-w100p f-df f-fdc">
                      <div class="f-f1"></div>
                      <div class="f-f1">
                        <div class="f-h100p f-w100p f-df">
                          <div class="f-f2 f-tar">本月能耗</div>
                          <div class="f-f3 f-tar">
                            <span
                              style="
                                color: rgba(41, 222, 255, 1);
                                font-size: 16px;
                              "
                              >5.43</span
                            ><span class="f-o6">kw/h</span>
                          </div>
                        </div>
                      </div>
                      <div class="f-f1">
                        <div class="f-h100p f-w100p f-df">
                          <div class="f-f2 f-tar">上月能耗</div>
                          <div class="f-f3 f-tar">
                            <span
                              style="
                                color: rgba(41, 222, 255, 1);
                                font-size: 16px;
                              "
                              >5.43</span
                            ><span class="f-o6">kw/h</span>
                          </div>
                        </div>
                      </div>
                      <div class="f-f1">
                        <div class="f-h100p f-w100p f-df">
                          <div class="f-f2 f-tar">环比</div>
                          <div class="f-f3 f-tar">
                            <span
                              style="
                                color: rgba(41, 222, 255, 1);
                                font-size: 16px;
                              "
                              >5.43</span
                            ><span class="f-o6">%</span>
                          </div>
                        </div>
                      </div>
                      <div class="f-f1">
                        <div class="f-h100p f-w100p f-df">
                          <div class="f-f2 f-tar">去年同期</div>
                          <div class="f-f3 f-tar">
                            <span
                              style="
                                color: rgba(41, 222, 255, 1);
                                font-size: 16px;
                              "
                              >5.43</span
                            ><span class="f-o6">kw/h</span>
                          </div>
                        </div>
                      </div>
                      <div class="f-f1">
                        <div class="f-h100p f-w100p f-df">
                          <div class="f-f2 f-tar">同比</div>
                          <div class="f-f3 f-tar">
                            <span
                              style="
                                color: rgba(41, 222, 255, 1);
                                font-size: 16px;
                              "
                              >5.43</span
                            ><span class="f-o6">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="width: 50px"></div>
            </div>
            <el-divider></el-divider>
            <div class="f-f1 f-df f-fdc">
              <div class="f-f1 f-mt10" id="paint7"></div>
            </div>
          </div>

          <div class="lunbotu f-df f-fdc f-f1" v-show="type == '3'">
            <div class="f-f1 f-df">
              <div id="paint55" class="f-f1" style=""></div>
              <div id="paint56" class="f-f1" style=""></div>
            </div>
            <el-divider></el-divider>
            <div class="f-f1 f-df f-fdc">
              <div class="f-f1 f-mt10" id="paint8"></div>
            </div>
          </div>
          <!-- 中间切换结束 -->
        </div>

        <!-- 右 -->

        <div class="f-f1 f-df f-fdc f-ml24">
          <div class="f-f1 box" @click="changeType(2)">
            <h1 class="h1 h1-select" :class="{ 'h1-on': type == 2 }">
              路灯照明
            </h1>

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
            <h1 class="h1 h1-select" :class="{ 'h1-on': type == 3 }">
              巡查管控
            </h1>

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
    </template>
    <!-- PC结束 -->

    <!-- moblie开始 -->
    <template v-else>
      <div class="f-fs06r f-bcw f-br12 f-h10r f-mt15 f-df f-fdc">
        <h2 class="m_title">管网监测</h2>
        <div class="f-p15 f-pt1 f-f1 f-df">
          <div class="f-h100p f-w100p f-df f-fdc">
            <div class="f-jcc f-aic f-df">
              <div class="f-h100p f-w100p f-df">
                <div class="f-f1 f-jcc f-aic f-df">监测点数：10个</div>
                <div class="f-f1 f-jcc f-aic f-df">联网率：90.0%</div>
                <div class="f-f1 f-jcc f-aic f-df">开阀率：100.0%</div>
              </div>
            </div>
            <div class="f-f1 f-jcc f-aic f-df" id="paint_m1"></div>
          </div>
        </div>
      </div>
      <div class="f-fs06r f-bcw f-br12 f-mh22r f-mt15 f-df f-fdc">
        <h2 class="m_title">水费营收</h2>
        <div class="f-p15 f-pt1 f-pb1">
          <div class="f-f1 f-df">
            <div class="f-f2 f-df f-fdc" style="">
              <div class="f-h100p f-w100p f-df f-mt20">
                <div class="f-f1">
                  <div class="f-h100p f-w100p f-df">
                    <div style="width: 50px" class="f-df f-jcc f-aic">
                      <img
                        style="width: 30px"
                        src="../../../src/images/西中岛/总购水量@2x.png"
                        alt=""
                      />
                    </div>
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1">
                          <span class="info2">3660000.00</span
                          ><span class="f-o6">万吨</span>
                        </div>
                        <div class="f-f1 f-df f-fs12 f-aic">总购水量</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="f-f1">
                  <div class="f-h100p f-w100p f-df">
                    <div style="width: 50px" class="f-df f-jcc f-aic">
                      <img
                        style="width: 30px"
                        src="../../../src/images/西中岛/总缴费@2x.png"
                        alt=""
                      />
                    </div>
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1">
                          <span class="info2">3660000.00</span
                          ><span class="f-o6">元</span>
                        </div>
                        <div class="f-f1 f-df f-fs12 f-aic">总缴费</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="f-h100p f-w100p f-df">
                <div class="f-f1">
                  <div class="f-h100p f-w100p f-df">
                    <div style="width: 50px" class="f-df f-jcc f-aic">
                      <img
                        style="width: 30px"
                        src="../../../src/images/西中岛/总用水量@2x.png"
                        alt=""
                      />
                    </div>
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1">
                          <span class="info2">3660000.00</span
                          ><span class="f-o6">万吨</span>
                        </div>
                        <div class="f-f1 f-df f-fs12 f-aic">总用水量</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="f-f1">
                  <div class="f-h100p f-w100p f-df">
                    <div style="width: 50px" class="f-df f-jcc f-aic">
                      <img
                        style="width: 30px"
                        src="../../../src/images/西中岛/总收费@2x.png"
                        alt=""
                      />
                    </div>
                    <div class="f-f1">
                      <div class="f-h100p f-w100p f-df f-fdc">
                        <div class="f-f1">
                          <span class="info2">3660000.00</span
                          ><span class="f-o6">万吨</span>
                        </div>
                        <div class="f-f1 f-df f-fs12 f-aic">总收费</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <el-divider style="width: 100%"></el-divider>

          <div class="f-f1 f-df f-fdc">
            <div class="f-f1 f-mt10" id="paint6"></div>
          </div>
        </div>
        <div class="f-f1" id="paint1"></div>
        <div class=" f-p15 ">
          <div class="f-h100p f-w100p f-df f-fdc">
            <div class="f-f1 f-df">欠缴水费企业</div>
            <div class="f-f1 f-jcc f-aic f-df">
              <div class="f-h100p f-w100p f-df f-fdc">
                <div class="f-f1 f-df" style="color: rgba(96, 98, 102, 1)">
                  大连蒙连石化有限公司：<span
                    style="color: rgba(242, 25, 75, 1)"
                    >-1002505.00 元</span
                  >
                </div>
                <div class="f-f1 f-df" style="color: rgba(96, 98, 102, 1)">
                  大连蒙连石化有限公司：<span
                    style="color: rgba(242, 25, 75, 1)"
                    >-1002505.00 元</span
                  >
                </div>
                <div class="f-f1 f-df" style="color: rgba(96, 98, 102, 1)">
                  大连蒙连石化有限公司：<span
                    style="color: rgba(242, 25, 75, 1)"
                    >-1002505.00 元</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f-fs06r f-bcw f-br12 f-h10r f-mt15 f-df f-fdc">
        <h2 class="m_title">照明管控</h2>
        <div class="f-p15 f-pt1 f-f1 ">
          <div class="f-h100p f-w100p f-df f-fdc">
            <div class="f-jcc f-aic f-df">
              <div class="f-h100p f-w100p f-df">
                <div class="f-f1 f-jcc f-aic f-df">路灯数量：899个</div>
                <div class="f-f1 f-jcc f-aic f-df">联网率：90.0%</div>
                <div class="f-f1 f-jcc f-aic f-df">亮灯率：50.0%</div>
              </div>
            </div>
            <div class="f-f1 f-mt10" id="paint7"></div>
 
          </div>
        </div>
      </div>
      <div class="f-fs06r f-bcw f-br12 f-h10r f-mt15 f-df f-fdc">
        <h2 class="m_title">巡查管理</h2>
        <div class="f-p15 f-pt1 f-df f-f1">
          <div class="f-h100p f-w100p f-df f-fdc">
            <div class="f-jcc f-aic f-df">
              <div class="f-h100p f-w100p f-df">
                <div class="f-f1 f-jcc f-aic f-df">12月巡查次数：60</div>
                <div class="f-f1 f-jcc f-aic f-df">12月上报事件数量：8.0%</div>
              </div>
            </div>
            <div class="f-f1 f-mt10" id="paint8"></div>
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
  </div>
</template>

<script>
// 生命周期
export default {
  data() {
    return {
      type: 0,
      tableDate2: [],
      timeType: "month",
      yilouType: "month",
      time: new Date(),
      platformType: store.state.platformType,
      tableDate: [],
      data: "",
      aaa: "",
    };
  },
  mounted() {
    console.log(this.$el);
    kit.ajax();
    this.allPaint()

    
    kit.chartRender(
      $("#paint_m1"),
      util.paintLine({
        title: "",
        formatter: "{b} {c} 天 \n 占比 {d} ",
        legend: ["漏失率", "漏损率"],
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
      $("#paint1"),
      util.paintLine({
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
      util.paintBar({
        title: "测点对比",
        formatter: "{b} {c} 天 \n 占比 {d} ",
        legend: ["收费", "缴费"],
        data: [
          { value: 1048, name: "优" },
          { value: 735, name: "良3" },
        ],
      })
    );

    kit.chartRender(
      $("#paint59"),
      util.paintBar({
        title: "区域排名-前五",
        xyChange: true,
        formatter: "{b} {c} 天 \n 占比 {d} ",
        color: ["rgba(41, 222, 255, 1)"],
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

      this.allPaint()
    },
    allPaint() {
      this.$nextTick(() => {
        kit.chartRender(
          $("#paint6"),
          util.paintLine({
            title: "用水企业详情",
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
          util.paintLine({
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
          util.paintLine({
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
          util.paintPie({
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
          util.paintPie({
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
          util.paintPie({
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
          util.paintBar({
            title: "能耗对比",
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
  width: 1000px;
}

.info {
  color: #29deff;
  font-size: 17px;
}

.info2 {
  color: rgba(0, 85, 255, 1);
  font-size: 0.8rem;
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
