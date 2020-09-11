
<template>
  <div class="popContent">
    <div style="background: rgba(64, 158, 255, 1);height: 32px;">
      <span class="f-dib f-mt5" style="text-indent:12px;font-size: 16px;color:white;">{{siteInfo.stationName}}</span>
      <span
        v-if="siteInfo.levelId > siteInfo.targetLevelId "
        class="f-dib info"
        style="margin-left:5px;width:48px;height:20px;font-size: 12px;background:rgba(224, 33, 52, 1)"
      >未达标</span>
    </div>
    <div class="f-p12 item">
      <el-row class :gutter="20">
        <el-col :span="12">
          <span>
            <i>评价水质:</i>
            <label
              class="sp"
              :style="{background:data.colorObj[siteInfo.levelId]}"
            >{{siteInfo.level}}</label>
          </span>
        </el-col>
        <el-col :span="12">
          <span>
            <i>目标水质:</i>
            <label
              class="sp"
              :style="{background:data.colorObj[siteInfo.targetLevelId]}"
            >{{siteInfo.targetLevel}}</label>
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <span>
            <i>所属水系:</i>
            <label>{{siteInfo.valley}}</label>
          </span>
        </el-col>
        <el-col :span="12">
          <span>
            <i>所属区域:</i>
            <label>{{siteInfo.area}}</label>
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <span>
            <i>控制级别:</i>
            <label>{{siteInfo.manageLevel}}</label>
          </span>
        </el-col>
        <el-col :span="12">
          <span>
            <!-- <i>监测方式:</i>
            <label>{{siteInfo.stationName}}</label>-->
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <span>
            <i>主要污染物:</i>
            <label>{{siteInfo.mainPolluter}}</label>
          </span>
        </el-col>
      </el-row>
    </div>

    <div>
      <label
        style="color:rgba(48, 49, 51, 1);font-weight:bold;margin-left:10px;padding-bottom:5px;display:inline-block"
      >预测数据</label>
      <span
        style="color:rgba(0, 145, 255, 1);float:right;margin-right:16px;"
      >{{moment(data.dateTime).format("YYYY-MM-DD hh:mm")}}</span>
    </div>

    <el-table size="mini" :data="factors" style="width: 100%" max-height="250">
      <el-table-column prop="name" width="80" label="监测因子"></el-table-column>
      <el-table-column prop="value" label="预测值"></el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
      <el-table-column prop="standardValue" label="标准值"></el-table-column>
    </el-table>

    <div>
      <label
        style="color:rgba(48, 49, 51, 1);font-weight:bold;padding:10px;display:inline-block;"
      >过去{{slot}}实测预测浓度变化对比</label>
      <span class="f-fr">
        <el-select
          @change="change"
          style="width:90px;padding:5px;padding-right:12px;"
          size="mini"
          v-model="nowSelect"
          placeholder="请选择"
        >
          <el-option
            v-for="item in data.yz"
            :key="item.columnCode"
            :label="item.name"
            :value="item.columnCode"
          ></el-option>
        </el-select>
      </span>
    </div>

    <div id="main2" style="height:160px;"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "pop",
  props: {
    url: {
      type: String,
    },
    id: {
      type: String,
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      slot:"--",
      siteInfo: {},
      moment: moment,
      factors: [],
      nowSelect: "",
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
  mounted() {
    this.getSiteDetail();
    this.nowSelect = _.first(this.data.yz).columnCode;
    this.getHistoryData();
  },
  methods: {
    change() {
      this.getHistoryData();
    },
    getHistoryData() {
      // 小时的时候是过去24小时，天的时候是过去7天
      if (this.data.dateType == "60") {
         var beginTime = moment(this.data.dateTime).subtract(24, "hours").format("x")
         this.slot ="24小时"
      } else {
        var beginTime = moment(this.data.dateTime).subtract(7, "days").format("x");
        this.slot ="7天"
      }
      $.get({
        url: $$.url + "/wms/wms/outside/v1/map/site-history-data.do",
        data: {
          siteId: this.id,
          beginTime: beginTime,
          endTime: this.data.dateTime,
          dateType: this.data.dateType,
          factorCode: this.nowSelect,
        },
      }).then((resp) => {
        // console.log(11);
        this.paint(resp);
      });
    },
    paint(resp) {
      var time = _.chain(resp.ycObj)
        .pluck("time")
        .map((value) => {
          return moment(value).format("MM-DD HH:MM");
        })
        .value();

      var real = _.pluck(resp.realObj,"value")
      var yc = _.pluck(resp.ycObj,"value")
      var stand = _.map(time,function() {return resp.standardVal})
      // debugger
      setTimeout(() => {
        echarts.init(document.getElementById("main2")).setOption({
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },
          xAxis: {
            type: "category",
            data: time,
          },
          yAxis: {
            type: "value",
          },
          grid: {
            top: "17%",
            left: "5%",
            right: "5%",
            bottom: "5%",
            containLabel: true,
          },
           legend: {
              data: ['实测值', '预测值', '标准值']
          },
          series: [
            {
               name: '实测值',
              data: real,
              type: "line",
              smooth: true,
            },
             {
                name: '预测值',
              data: yc,
              type: "line",
              smooth: true,
            },
             {
                name: '标准值',
              data: stand,
              type: "line",
              smooth: true,
            },
          ],
        });
      }, 200);
    },
    // 站点详情
    getSiteDetail() {
      $.get({
        url: $$.url + "/wms/wms/outside/v1/map/site-data.do",
        data: {
          dateType: this.data.dateType,
          siteId: this.id, // 站点ID
          dateTime: this.data.dateTime,
        },
      }).then((resp) => {
        this.siteInfo = resp.siteInfo;
        this.factors = resp.factors;
      });
    },
  },
};
</script>
<style>
/* .popContent
    width 300PX
    height 300PX
    .title
        padding 8PX
        font-size 14PX
    */
.popContent {
  width: 320px;
}
.leaflet-popup-content {
  margin: 0;
}
.leaflet-popup-content-wrapper {
  padding: 0;
}
.leaflet-container a.leaflet-popup-close-button {
  top: 5px;
  /* right: -11px; */
}
</style>
<style scoped>
.info {
  width: 48px;
  height: 20px;
  font-size: 12px;
  background: rgb(224, 33, 52);
  color: white;
  line-height: 20px;
  text-align: center;
}

.item {
  border-bottom: 1px solid rgba(220, 223, 230, 1);
  padding: 0px;
  margin: 10px;
}

.item span {
  margin-bottom: 3px;
  display: inline-block;
  height: 20px;
}

.item i {
  color: rgba(144, 147, 153, 1);
  font-size: 12px;
}

.item label {
  color: rgba(48, 49, 51, 1);
  font-size: 12px;
  text-indent: 3px;
  display: inline-block;
}

.item .sp {
  background: rgb(238, 142, 0);
  height: 20px;
  line-height: 20px;
  width: 40px;
  color: white;
  text-align: center;
  border-radius: 10px;
  /* width: 48px; */
  padding: 0 6px;
}
</style>
