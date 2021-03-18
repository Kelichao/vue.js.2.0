 <!-- 个人门户 -->
<template>
  <div class="f-h100p person-cont">
    <div class="f-h100p f-df f-fdc" style="margin-top: -6px;">
      <!-- 上三分之二 -->
      <div class="f-f2 f-df f-ofa f-mb10">
        <!-- 左三分之二 -->
        <div class="f-df f-f2 f-fdc f-ofa f-mr10">
          <!-- 轮播图 -->
          <div class="f-mb10" style="height:114px;">
            <el-carousel trigger="click" height="114px">
              <el-carousel-item v-for="item in 4" :key="item">
                <!-- <div style="{ backgroundUrl: 'https://cn.vuejs.org/images/logo.png' }"> -->
                <img data-v-c3876194 src="../images/assets/aaa.png" style="height: 100%;width: 100%;" />
                <h3
                  style="position:absolute;top:0"
                  class="https://cn.vuejs.org/images/logo.png"
                >{{ item }}</h3>
                <!-- </div> -->
              </el-carousel-item>
            </el-carousel>
          </div>

          <div class="f-bw f-df f-fdc" style="height:350px">
            <h1 class="title">
              <span class="icon">|</span>
              <span>流程中心</span>
              <span class="more">更多</span>
            </h1>
            <div class="f-pl20">
              <el-button type="primary" round size="mini">发起申请</el-button>
              <el-button type="info" plain round size="mini">待审批</el-button>
              <el-button type="info" plain round size="mini">已审批</el-button>
              <el-button type="info" plain round size="mini">抄送我</el-button>
            </div>
            <ul class="f-f1 f-df liucheng f-fww">
              <li v-for="item in 8" :key="item">
                <img src="../images/assets/bbb.png" />
                <span class="f-cp" style="text-indent: 8px;">常用</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 日历 -->
        <div class="f-f1 f-ofa f-bw" style="min-width:350px;">
          <h1 class="f-ml20 f-mr20 f-mt15">
            <el-button
              class="f-w100p f-mt15"
              type="primary"
              round
              @click="dialogFormVisible = true"
              plain
            >添加日程</el-button>
          </h1>
          <el-calendar>
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template slot="dateCell" slot-scope="{date, data}">
              <p
                @click="getList(data.day)"
                style="line-height: 30px;text-align:center"
                :class="data.isSelected ? 'is-selected' : ''"
              >{{ data.day.split('-').slice(2).join('-') }} {{ data.isSelected ? '' : ''}}</p>
            </template>
          </el-calendar>
          <h1 class="meet">
            <span  class="f-fl f-w80p f-ell f-cp" @click="openNotify">
              <div class="status-point" title style=" background-color:#F34646"></div>{{dailyArray[0] && dailyArray[0].content}}
            </span>
            <span class="f-fr f-mr10">{{dailyArray[0] && dailyArray[0].startHm}}</span>
          </h1>
        </div>
      </div>

      <!-- 下三分之二 -->
      <div class="f-f1 f-df">
        <div class="f-f2 f-df">
          <div class="f-f1 f-bw f-mr10 f-df f-fdc">
            <h1 class="title">
              <span class="icon">|</span>
              <span>新闻动态</span>
              <span class="more">更多</span>
            </h1>
            <ul class="f-f1 f-df f-fdc">
              <li class="f-cp f-df f-jcl f-aic f-ml20 f-mr20 f-f1" v-for="item in 2" :key="item">
                <img data-v-c3876194 src="/src/assets/aaa.png" class="newImage" />
                <div
                  style="height:33px;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;"
                >案发时发生按时发送发顺丰大法师安抚啊的说法发送案发时发生按时发送发顺丰大法师安抚啊的说法发送案发时发生按时发送发顺丰大法师安抚啊的说法发送案发时发生按时发送发顺丰大法师安抚啊的说法发送</div>
              </li>
            </ul>
          </div>

          <div class="f-f1 f-bw f-df f-fdc">
            <h1 class="title">
              <span class="icon">|</span>
              <span>重要通知</span>
              <span class="more">更多</span>
            </h1>
            <h1 v-for="item in 4" class="meet f-f1" style="background:white;" :key="item">
              <div title="五一放假通知！五一放假通知！五一放假通知！" class="f-fl f-w80p f-ell">五一放假通知！五一放假通知！五一放假通知！</div>
              <span class="f-fr f-mr10" style="color:#7B8290">8:10</span>
            </h1>
          </div>
        </div>

        <div class="f-f1 f-bw f-ml10 f-df f-fdc">
          <h1 class="title">
            <span class="icon">|</span>
            <span>全部工具</span>
            <span class="more">更多</span>
          </h1>
          <ul class="f-f1 f-df f-fdr f-fww">
            <li
              class="f-cp f-df f-jcl f-aic f-fdc f-w25p f-jcc f-aic"
              v-for="item in 8"
              :key="item"
            >
              <img data-v-c3876194 src="../images/assets/ccc.png" style="height:26px;width:26px;" class />
              <div style="height:33px;overflow : hidden;">案发</div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 添加日历弹窗 -->
      <el-dialog title="添加日程" :visible.sync="dialogFormVisible" width="560px">
        <el-form :model="form">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.value1"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="程度" :label-width="formLabelWidth">
            <el-radio-group v-model="form.urgencyDegree">
              <el-radio label="紧急" :value="3"></el-radio>
              <el-radio label="重要" :value="2"></el-radio>
              <el-radio label="一般" :value="1"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="提醒" :label-width="formLabelWidth">
            <el-select multiple v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" type="primary" round plain>取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false" round>确 定</el-button>
        </div>
      </el-dialog>

      <div class="left">
        <!-- 日历详情弹窗 -->
        <el-dialog
          top="0"
          :modal="false"
          title="日程"
          :visible.sync="dialogDetailVisible"
          width="250px"
        >
          <h1 class="dailyTime f-mb20">{{date}}</h1>
          <div>
            <!-- 紧急  "紧急程度：一般1，重要2，紧急3" -->
            <div v-for="(item, index) in dailyArray" :class="{detail1:item.urgencyDegree == 3,detail2:item.urgencyDegree == 2,detail3:item.urgencyDegree == 1,'f-mb10': 1}" :key="index">
              <div class="head2" style>
                <div class="f-fl f-w70p f-ell f-fs14" style="color:#7B8290">3月12日 08:30-12:00</div>
                <span v-if="item.urgencyDegree == 3" class="f-fr f-fs10 jinji">紧急</span>
                 <span v-else-if="item.urgencyDegree == 2" class="f-fr f-fs10 jinji">重要</span>
                  <span v-else-if="item.urgencyDegree == 1" class="f-fr f-fs10 jinji">一般</span>
              </div>
              <div class="yichu2" style>案发时发生按时发送发顺</div>
              <div class="dailyIcon">
                <i class="el-icon-edit-outline f-cp"></i>

                <i class="el-icon-delete f-cp"></i>
              </div>
            </div>

            <!-- 一般 -->
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDetailVisible = false" type="primary">关闭</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      date: "",
      dailyArray:[],
      activeName: "first",
      dialogFormVisible: false,
      dialogDetailVisible: false,
      value2: "",
      form: {
        urgencyDegree:1,
        value1: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  computed: mapState({
    count: "count"
  }),
  mounted() {},
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
    handleClick() {
      alert();
    },
    getList(date) {
      // console.log(date)
      this.date = date;
      util.javaAjax(
        "/common/front/calendarSchedule/list",
        {
          startTime: date,
          endTime:date
        },
        resp => {
          this.dailyArray = resp.result.calendar[date];
          this.$set(this.dailyArray)
          console.log(this.dailyArray );
        }
      );
    },
    openNotify() {
      // const h = this.$createElement;
      this.dialogDetailVisible = true;
    }
  }
};
</script>

<style scoped>
.more {
  float: right;
  margin-right: 20px;
  color: #7b8290;
  cursor: pointer;
  font-weight: normal;
}
.person-cont {
  font-family: 黑体;
  color: #00020d;
}
.head {
  text-align: left;
}
.head label {
  display: inline-block;
  text-align: center;
  line-height: 30px;
  width: 94px;
  height: 30px;
  background: #f5f5f5;
  border-radius: 6px 6px 0px 0px;
  margin-right: 4px;
  cursor: pointer;
  color: #7b8290;
  font-family: PingFangSC-Regular, sans-serif;
  text-indent: 16px;
}

.detail1 {
  width: 210px;
  height: 104px;
  background: rgba(247, 233, 230, 1);
  border-radius: 4px;
}

.detail2 {
  width: 210px;
  height: 104px;
  background: #e6f7f5;
  border-radius: 4px;
}

.detail3 {
  width: 210px;
  height: 104px;
  background: #f7f5e6;
  border-radius: 4px;
}

.head .point {
  background: rgba(255, 255, 255, 1);
  color: #00020d;
}

.is-selected {
  color: #1989fa;
}

.title {
  color: #00020d;
  height: 55px;
  line-height: 55px;
  text-indent: 20px;
}
.icon {
  color: #01c6ac;
  margin-right: 2px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.head2 {
  height: 14px;
  padding: 10px;
}

.meet {
  margin-left: 20px;
  margin-right: 20px;
  background: rgba(247, 233, 230, 1);
  border-radius: 4px;
  height: 32px;
  line-height: 32px;
  font-weight: normal;
  color: #00020d;
  text-indent: 10px;
}
.status-point {
  margin-right: 10px;
}

.liucheng {
  padding: 20px;
}
.liucheng li {
  width: 25%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

.liucheng img {
  width: 36px;
  height: 36px;
}
</style>
<style>
.el-calendar-table .el-calendar-day {
  box-sizing: border-box;
  padding: 0px;
  text-align: center;
  height: 30px;
}
.el-calendar__body {
  padding-bottom: 20px;
}

.newImage {
  height: 56px;
  width: 90px;
  margin-right: 10px;
}

.el-dialog__title {
  border-left: 2px solid #01c6ac;
  text-indent: 6px;
  display: inline-block;
  line-height: 20px;
}

.el-notification__title {
  border-left: 2px solid #01c6ac;
  text-indent: 6px;
  display: inline-block;
  line-height: 16px;
}

.el-dialog__header {
  padding: 30px 20px 10px;
  font-weight: bold;
  font-size: 16px;
}

.el-button--primary.is-plain {
  background: white;
}

.el-calendar-table tr td,
.el-calendar-table tr,
.el-calendar-table tbody {
  border: none;
}

.el-calendar-table tr td:first-child {
  border-left: none;
}

.el-calendar-table tr:first-child td {
  border-top: none;
}

.dailyTime {
  color: black;
  font-weight: bold;
  font-size: 18px;
}

.dailyIcon {
  text-align: right;
  padding-right: 10px;
  margin-top: 14px;
}

.yichu2 {
  padding-left: 10px;
  padding-right: 10px;
  color: #00020d;
  height: 33px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.jinji {
  background: #f86666;
  color: #00020d;
  width: 32px;
  text-align: center;
}

.left .el-dialog {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0;
}

.left .el-dialog__title {
  font-size: 14px;
  line-height: 14px;
}
.el-dialog__body {
  padding: 20px;
  max-height: 388px;
    overflow: auto;
}
.el-calendar-day {
  padding: 0;
}
</style>