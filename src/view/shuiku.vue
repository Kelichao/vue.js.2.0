<template>
  <div class="main">
    <div class="header">
      <h1 class="h1">釜山水库水质预测</h1>
    </div>

    <div class="left">
      <h1 class="f-fs16">釜山水库水质预测</h1>
      <div class="f-df f-p16">
        <div class="f-f1">
          <h2 class="f-trans5" :style={background:colorObj[totalInfo.levelId]}>{{totalInfo.level}}</h2>
          <span class="f-df f-jcsb f-mb2">
            <span class>I-III类占比</span>
            <span>{{okRant}}%</span>
          </span>
          <el-progress :percentage="okRant" :show-text="false"></el-progress>

          <span class="f-df f-jcsb f-mt10 f-mb2">
            <span>劣V类占比</span>
            <span>{{badRant}}%</span>
          </span>
          <el-progress :percentage="badRant" status="exception" :show-text="false"></el-progress>
        </div>
        <div class="f-pl30 f-pr10">
          <el-progress
            :width="92"
            :stroke-width="12"
            type="circle"
            :percentage="totalInfo.over_rate"
            color="rgba(245, 108, 108, 1)"
          ></el-progress>
        </div>
        <div class="info">{{factorName}}断面超标率</div>
      </div>
      <div style="margin-bottom:22px;">
        <el-table size="mini" :data="stationArray" style="width: 100%" max-height="280">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="stationName" label="站点名称"></el-table-column>
          <el-table-column prop="coefficient" label="单因子综合指数"></el-table-column>
          <el-table-column prop="value" label="浓度"></el-table-column>
          <el-table-column prop="level" label="水质类别">
            <template slot-scope="scope">
              <span class="tb_sp">{{scope.row.level}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="center">
      <!-- <el-radio border @change="changeYz(item)" v-model="factorCode" :label="item"  v-for="(item,index) in yz" :key="index">{{item.name}}</el-radio> -->

      <el-radio-group @change="changeYz" v-model="factorCode" size="mini" class="f-ml10">
        <el-radio-button
          :label="item.columnCode"
          v-for="(item,index) in yz"
          :key="index"
        >{{item.name}}</el-radio-button>
      </el-radio-group>
    </div>

    <div class="right">数据更新时间：2019-11-06 17:00</div>

    <div class="bottom">
      <img src="../assets/color.png" />
    </div>

    <div class="mapPanel">
      <div id="mapDiv"></div>
    </div>

    <footer class="foot f-df f-aic">
      <el-radio-group @change="changeDateType" v-model="dateType" size="mini" class="f-ml10">
        <el-radio-button label="60">日</el-radio-button>
        <el-radio-button label="1440">小时</el-radio-button>
      </el-radio-group>

      <el-date-picker
        size="mini"
        class="f-ml8"
        v-model="value1"
        type="datetimerange"
        style="width:324px;"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>

      <el-button
        style="height:26px;width:42px;margin-left: 12px;"
        icon="el-icon-caret-right"
        size="mini"
        type="primary"
      ></el-button>
      <div class="icon f-ml10">
        <!-- <span>122</span>
        <span>1</span>
        <span>1</span>
        <span>1</span>-->
        <!-- <el-scrollbar>
          
        </el-scrollbar>-->
        <div>
          <el-radio-group v-model="radio3" size="mini">
            <el-radio-button :label="index" v-for="index in 6" :key="index"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import popDetail from "./popDetail";
import Vue from "vue";
import L from "leaflet";
//  http://yapi.fpi-inc.site/project/795/interface/api/cat_5986
// 图片覆盖
// L.imageOverlay(<String> imageUrl, <LatLngBounds> bounds, <ImageOverlay options> options?)

// 陈强:
// http://112.29.71.165:8066/city-interpolation-server/public/interpolate/api/v1.0/show-interpolation/nh3n_2020090416.png

// 陈强:
// @陈强 现场访问路径：http://172.16.2.241:8080/city-interpolation-server/public/interpolate/api/v1.0/show-interpolation/nh3n_2020090416.png 参数为：因子(nh3n,tp,tn)，时间戳：小时数据为：yyyymmddhh，日数据为：yyyymmdd，目前有今天未来三天的模拟数据，还有今天9点以后未来6小时数据。你去设置外网映射吧。

// 生命周期
export default {
  name: "operation-map",
  data() {
    return {
      yz: [],
      stationArray: [],
      radio3: "上海",
      factorCode: "",
      factorName: "",
      map: null,
      chart: null,
      month: {
        length: 31,
      },
      hour: {
        length: 24,
      },
      value1: "",
      dateType: "60",
      data: "",
      aaa: "",
      totalInfo:{},
      colorObj: {
        1: "#827cc2",
        2:"#4c4c52",
        3:"#008000",
        4:"#ffdd00",
        5:"#FFA500",
        6:"#FF0000",
      }
    };
  },
  mounted() {
    console.log(this.$el);
    this.initMap();
    this.getInzi().then(() => {
      // this.getMapDetail();
    });
  },
  computed: {
    okRant() {
      var arr = this.stationArray.filter((value) => {
        return value.levelId <= 3;
      });
      // console.log(arr)
      return Number(((arr.length / this.stationArray.length) * 100).toFixed()) || 0;
    },
    badRant() {
      var arr = this.stationArray.filter((value) => {
        return value.levelId == 5;
      });

      return Number(((arr.length / this.stationArray.length) * 100).toFixed()) || 0;
    },
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
    changeDateType() {
      this.getWhole();
    },
    changeYz(data) {
      // console.log(data);
      var now = _.findWhere(this.yz, {columnCode: data})
      this.factorName = now.name.replace(/[ ]/g,"");;

      this.getWhole();
    },
    // 地图整体水质查询
    getWhole() {
      $.get({
        url: $config.url + "/wms/wms/outside/v1//map/total-data.do",
        data: {
          dateType: this.dateType,
          dateTime: "1599494400000",
          factorCode: this.factorCode,
          // dateTime=1599494400000
        },
      }).then((resp) => {
        this.stationArray = resp.siteInfos;
        this.totalInfo = resp.totalInfo
      });
    },
    getInzi() {
      return $.ajax({
        type: "get",
        url: $config.url + "/wms/wms/outside/v1/interpolation/factors.do",
      }).then((resp) => {
        this.yz = resp;
        this.factorCode = _.first(this.yz).columnCode;
        this.changeYz(this.factorCode)
      });
    },
    getMapDetail() {
      $.get({
        url: $config.url + "/wms/wms/outside/v1/map/site-data.do",
        data: {
          dateType: "1440",
          siteId: "2c90827271c3757f0171c4b793e70006", // 站点ID
          dateTime: "1599494400000",
        },
      });
    },
    startHacking: function () {
      this.aaa = 111;
    },
    initMap() {
      // 初始化地图
      this.map = L.map("mapDiv", {
        center: [32.677995, 118.675367], // 中心点
        zoom: 13.5, // 缩放
        zoomControl: false,
      }).setMaxBounds([
        [-90, 0],
        [90, 360],
      ]);

      L.tileLayer(
        "//webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        {
          maxZoom: 20,
          maxNativeZoom: 18,
          minZoom: 3,
          subdomains: "1234",
        }
      ).addTo(this.map);

      this.drawPoints([
        {
          longitude: "118.675367",
          latitude: "32.677995",
        },
      ]);
    },

    //添加点位
    drawPoints(points) {
      let that = this;
      let pointsJson = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
        },
        features: [],
      };
      pointsJson.features = points.map((item) => {
        let feature = {
          type: "Feature",
          properties: { ...item },
          geometry: {
            type: "Point",
            coordinates: [
              item.longitude ? parseFloat(item.longitude) : "",
              item.latitude ? parseFloat(item.latitude) : "",
            ],
          },
        };
        return feature;
      });

      L.geoJSON(pointsJson, {
        pointToLayer: function (geoJsonPoint, latlng) {
          if (latlng.lat !== 0 && latlng.lng !== 0) {
            return that.pointToLayerFunc(geoJsonPoint, latlng);
          }
        },
        onEachFeature: that.pipePopUpFunc,
      }).addTo(that.map);
    },
    //添加点位
    pointToLayerFunc(geoJsonPoint, latlng) {
      return L.marker(latlng, {
        icon: L.divIcon({
          html: `<div style="position:relative;width:20px;height:20px;background:red">
                            </div>`,
          className: "",
          iconAnchor: [30, 30],
        }),
      });
    },
    //弹框
    pipePopUpFunc(feature, layer) {
      layer.bindPopup(
        () => {
          let popUp = Vue.extend(popDetail);
          let popContent = new popUp({
            propsData: {
              siteName: "123131232",
              url: "",
            },
          });
          return popContent.$mount().$el;
        },
        {
          maxWidth: 320,
          direction: "top",
          // className: styles.myTooltip
          offset: [-20, -30],
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  min-width: 1100px;
  position: relative;
  height: 100%;
  font-family: 黑体;
}
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.header {
  width: 100%;
  height: 40px;
  background: rgba(64, 158, 255, 1);
}

.mapPanel {
  height: calc(100% - 44px);
}

.foot {
  position: fixed;
  height: 32px;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 10px rgba(35, 55, 77, 0.3);
  border: 1px solid rgba(35, 55, 77, 0.3);
  width: 100%;
  box-sizing: border-box;
  z-index: 1000;
  background: rgba(255, 255, 255, 1);
}

.right {
  border: 1px solid rgba(220, 223, 230, 1);
  border-radius: 14px;
  text-align: center;
  width: 208px;
  right: 60px;
  height: 28px;
  position: absolute;
  top: 56px;
  z-index: 1000;
  background: white;
  line-height: 29px;
  font-size: 12px;
  color: rgba(48, 49, 51, 1);
}

.left {
  width: 380px;
  min-height: 367px;
  // padding-bottom: 20px;
  position: absolute;
  z-index: 1000;
  background: white;
  top: 40px;
  box-shadow: 0 0 20px rgba(4, 61, 62, 0.2);

  h1 {
    font-size: 16px;
    text-indent: 16px;
    margin-top: 16px;
  }

  h2 {
    border-radius: 16px;
    background: #ff1744;
    font-size: 12px;
    color: white;
    width: 64px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    // margin-top: 16px;
    margin-bottom: 12px;
    font-weight: normal;
  }
}

.bottom {
  position: absolute;
  z-index: 1000;
  bottom: 40px;
  right: 10px;
}

.bottom img {
  width: 76px;
  height: 156px;
}

.center {
  z-index: 1000;
  position: absolute;
  left: 45%;
  top: 56px;
}

.icon span {
  display: inline-block;
  width: 29px;
  height: 26px;
  line-height: 26px;
  border-radius: 3px;
  background: rgba(197, 194, 194, 0.2);
  margin-left: 3px;
  cursor: pointer;
}

#mapDiv {
  width: 100%;
  height: 100%;
  background: rgba(197, 194, 194, 0.2);
}

.h1 {
  font-size: 24px;
  color: white;
  text-align: center;
}

.info {
  width: 53px;
  text-align: center;
  padding-top: 31px;
}

.tb_sp {
  background: rgb(238, 142, 0);
  height: 20px;
  width: 40px;
  line-height: 20px;
  color: white;
  text-align: center;
  border-radius: 10px;
  /* width: 48px; */
  padding: 0 6px;
}
</style>
