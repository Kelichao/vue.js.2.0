
<template>
  <div class="popContent">
    <div style="background: rgba(64, 158, 255, 1);height: 32px;">
      <span class="f-dib" style="text-indent:12px;font-size: 16px;color:white;">浮标站</span>
      <span
        class="f-dib info"
        style="margin-left:5px;width:48px;height:20px;font-size: 12px;background:rgba(224, 33, 52, 1)"
      >未达标</span>
    </div>
    <!-- <div class="title"> 站点名称：{{siteName}}测试测试</div> -->
    <div class="f-p12 item">
      <el-row class :gutter="20">
        <el-col :span="12">
          <span>
            <i>评价水质:</i>
            <label class="sp" style="background:rgba(238, 142, 0, 1);">123123</label>
          </span>
        </el-col>
        <el-col :span="12">
          <span>
            <i>目标水质:</i>
            <label class="sp" style="background:rgba(225, 34, 52, 1);">123123</label>
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <span>
            <i>所属水系:</i>
            <label>123123</label>
          </span>
        </el-col>
        <el-col :span="12">
          <span>
            <i>所属区域:</i>
            <label>123123</label>
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <span>
            <i>控制级别:</i>
            <label>123123</label>
          </span>
        </el-col>
        <el-col :span="12">
          <span>
            <i>监测方式:</i>
            <label>123123</label>
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <span>
            <i>主要污染物:</i>
            <label>123123</label>
          </span>
        </el-col>
      </el-row>
    </div>

    <div>
      <label
        style="color:rgba(48, 49, 51, 1);font-weight:bold;margin-left:10px;padding-bottom:5px;display:inline-block"
      >预测数据</label>
      <span style="color:rgba(0, 145, 255, 1);float:right;margin-right:16px;">{{moment(data.dateTime).format("YYYY-MM-DD hh:mm")}}</span>
    </div>

    <el-table size="mini" :data="tableData" style="width: 100%" max-height="250">
      <el-table-column prop="date" width="80" label="监测因子"></el-table-column>
      <el-table-column prop="date" label="预测值"></el-table-column>
      <el-table-column prop="name" label="单位"></el-table-column>
      <el-table-column prop="address" label="标准值"></el-table-column>
    </el-table>

    <div>
      <label
        style="color:rgba(48, 49, 51, 1);font-weight:bold;padding:10px;display:inline-block;"
      >过去24小时实测预测浓度变化对比</label>
      <span class="f-fr">
        <el-select style="width:90px;padding:5px;padding-right:12px;" size=mini v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
    siteName: {
      type: String,
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      moment:moment,
      tableData: [
        {
          date: "2016",
          name: "王小虎",
          address: "上海",
        },
        {
          date: "20164",
          name: "王小虎",
          address: "上海",
        },
        {
          date: "2016-01",
          name: "王小虎",
          address: "上海市普沙",
        },
        {
          date: "2016-",
          name: "王小虎",
          address: "上海市普",
        },
      ],
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
        value: ''
    
    };
  },
  mounted() {
    this.getSiteDetail()
    setTimeout(() => {
      echarts.init(document.getElementById("main2")).setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        grid: {
        top: "5%",
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
    },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
          },
        ],
      });
    });
  },
  methods: {
        // 站点详情
    getSiteDetail() {
      $.get({
        url: $$.url + "/wms/wms/outside/v1/map/site-data.do",
        data: {
          dateType: this.data.dateType,
          siteId: "2c90827271c3757f0171c4b793e70006", // 站点ID
          dateTime: this.data.dateTime,
        },
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
  margin-top: 6px;
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
