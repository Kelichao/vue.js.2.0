z<template>
  <div>
    <div class="header" v-show="!hideMenus">
      <h1 class="h1">釜山水库水质预测</h1>
    </div>
    <div class="container">
      <div class="left">
        <h1 class="f-fs16">釜山水库水质预测</h1>
        <div class="f-df f-p16">
          <div class="f-f1">
            <h2
              class="f-trans8"
              :style="{background:colorObj[totalInfo.levelId]}"
            >{{totalInfo.level}}</h2>
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
          <el-table size="mini" @row-click=stationClick :data="siteInfos" style="width: 100%" max-height="280">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="stationName" label="站点名称"></el-table-column>
            <el-table-column label="单因子综合指数">
              <template slot-scope="scope">{{scope.row.coefficient || "--"}}</template>
            </el-table-column>
            <el-table-column label="浓度">
              <template slot-scope="scope">{{scope.row.value || "--"}}</template>
            </el-table-column>
            <el-table-column prop="level" label="水质类别">
              <template slot-scope="scope">
                <span
                  class="tb_sp f-trans8"
                  :style="{background:colorObj[scope.row.levelId]}"
                >{{scope.row.level|| "--"}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="center">
        <!-- <el-radio border @change="changeYz(item)" v-model="factorCode" :label="item"  v-for="(item,index) in yz" :key="index">{{item.name}}</el-radio> -->

        <el-radio-group :disabled=disabledFlag @change="changeYz" v-model="factorCode" size="mini" class="f-ml10">
          <el-radio-button
            :label="item.columnCode"
            v-for="(item,index) in yz"
            :key="index"
          >{{item.name}}</el-radio-button>
        </el-radio-group>
      </div>

      <div class="right">数据更新时间：{{moment(dateTime).format("YYYY-MM-DD HH:mm")}}</div>

      <div class="bottom">
         <!-- <img src="/src/images/assets/color.png" /> -->
        <img :src="require('src/images/assets/color.png')" />
      </div>

      <div class="mapPanel">
        <div id="mapDiv"></div>
      </div>

      <footer class="foot f-df f-aic">
        <el-radio-group :disabled=disabledFlag @change="changeDateType" v-model="dateType" size="mini" class="f-ml10">
          <el-radio-button label="1440">日</el-radio-button>
          <el-radio-button label="60">小时</el-radio-button>
        </el-radio-group>

        <el-date-picker
        :disabled=disabledFlag 
          size="mini"
          class="f-ml8"
          v-model="value1"
          type="datetimerange"
          style="width:324px;"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeDate(); getWhole();createTimeArray();"
        ></el-date-picker>

        <el-button
          style="height:26px;width:42px;margin-left: 12px;"
          icon="el-icon-caret-right"
          size="mini"
          :disabled="disabledFlag"
          @click="startFuture"
          type="primary"
        ></el-button>

        <div class="icon f-ml10">
          <div>
            <el-radio-group  v-if="dateType == 60" v-model="lineSelect" size="mini" @change="changeDateLine">
              <el-radio-button :label="index" v-for="index in timeArray" :key="index">{{index | filterHour}}</el-radio-button>
           </el-radio-group>
            <el-radio-group  v-else v-model="lineSelect" size="mini" @change="changeDateLine">
              <el-radio-button :label="index" v-for="index in timeArray" :key="index">{{index | filterDay}}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import popDetail from "./popDetail";
import Vue from "vue";
import L from "leaflet";

//：http://172.16.2.241:8080/city-interpolation-server/public/interpolate/api/v1.0/show-interpolation/nh3n_2020090416.png 参数为：因子(nh3n,tp,tn)，时间戳：小时数据为：yyyymmddhh，日数据为：yyyymmdd，目前有今天未来三天的模拟数据，还有今天9点以后未来6小时数据。你去设置外网映射吧。
// hideMenus=true

// 生命周期
export default {
  name: "operation-map",
  data() {
    return {
      disabledFlag: false,
      timeArray: [],
      hideMenus: true,
      yz: [],
      moment: moment,
      siteInfos: [],
      lineSelect: "",
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
      value1: [new Date(), moment(new Date()).add(6, "days")._d],
      dateType: "60",
      data: "",
      aaa: "",
      dateTime: "",
      totalInfo: {},
      colorObj: {
        "":"gray",
        1: "#1976D2",
        2: "#03A9F4",
        3: "#85C940",
        4: "#D9CD4C",
        5: "#EF8E00",
        6: "#E12234",
      },
    };
  },
  mounted() {
    console.log(this.$el);
    
    this.changeDate();
    this.createTimeArray();
    this.initMap();
    this.getInzi();
  },
  computed: {
    // totalTime() {
    //   return this.lineSelect || this.dateTime;
    // },
    okRant() {
      var arr = this.siteInfos.filter((value) => {
        return value.levelId <= 3;
      });
      // console.log(arr)
      return (
        Number(((arr.length / this.siteInfos.length) * 100).toFixed()) || 0
      );
    },
    badRant() {
      var arr = this.siteInfos.filter((value) => {
        return value.levelId == 5;
      });

      return (
        Number(((arr.length / this.siteInfos.length) * 100).toFixed()) || 0
      );
    },
  },
  filters: {
    filterHour: (value) => {
      if (!value) return ''
        value = moment(value).format("HH")

      return value
    },
    filterDay:(value) => {
      if (!value) return ''
        value = moment(value).format("DD")
           return value
    }
},
  watch: {
//  "$store.state.time": {
//       handler() {
//         console.log(1111)
//         // this.getHistoryData();
//       }
//     },
    aaa: {
      handler() {
        console.log(1111);
      },
      immediate: false,
    },
  },
  methods: {
    changeDateLine(time) {
      
      this.$store.commit("setTime",time);
      // console.log(time)
      if (this.dateType == "60") {
        // debugger
        this.getWhole(time)
      } else {
        this.getWhole(time)
      }
    },
    startFuture() {
      this.disabledFlag = true;
      var index = 0;

      var st = setInterval(() => {
        
        this.lineSelect = this.timeArray[index];
        if (this.dateType == "60") {
  
          this.getWhole(this.lineSelect);
          this.ass= a;
        } else {
           this.getWhole(this.lineSelect);
        }
        index++;

        if (index == this.timeArray.length) {
          this.disabledFlag = false;
          
          clearInterval(st);
          setTimeout(() => {
            this.lineSelect = "";
            this.getWhole();
          },1500)
        }
      }, 1500);
    },
    createTimeArray() {
      if (!this.dateTime) {
        return;
      }
      if (this.dateType == "60") {
        this.timeArray = [
          moment(this.dateTime).add(1, "hours").valueOf(),
          moment(this.dateTime).add(2, "hours").valueOf(),
          moment(this.dateTime).add(3, "hours").valueOf(),
          moment(this.dateTime).add(4, "hours").valueOf(),
          moment(this.dateTime).add(5, "hours").valueOf(),
          moment(this.dateTime).add(6, "hours").valueOf(),
        ];
      } else {
        this.timeArray = [
          moment(this.dateTime).add(1, "days").valueOf(),
          moment(this.dateTime).add(2, "days").valueOf(),
          moment(this.dateTime).add(3, "days").valueOf(),
        ];
      }
    },
    changeDate() {
      if (this.dateType == 60){
        // debugger
         this.dateTime = moment(this.value1[0]).seconds(0).minutes(0).valueOf('x')
      } else {
        this.dateTime = moment(this.value1[0]).seconds(0).minutes(0).hours(0).valueOf('x')
      }
     
     this.lineSelect = "";
    },
    changeDateType() {
      this.lineSelect = "";
      this.createTimeArray()
      this.getWhole();
    },
    changeYz(data) {
      this.$store.commit("setYz",data);
      // console.log(data);
      var now = _.findWhere(this.yz, { columnCode: data });
      this.factorName = now.name.replace(/[ ]/g, "");
      this.stdCode = now.stdCode.toLowerCase();
      this.getWhole(this.lineSelect);
    },

    getImage(time) {

      if (this.imageLayer && this.map.hasLayer(this.imageLayer)) {
        this.map.removeLayer(this.imageLayer);
      }

      // nh3n_2020090416.png
      var url =
        $$.imageUrl +
        `${this.stdCode}_${
          this.dateType == 60 ? 
             moment(time || this.dateTime).format("YYYYMMDDHH"):
             moment(time || this.dateTime).format("YYYYMMDD")}.png`;
      //     debugger
      // moment(time).format("YYYYMMDDHH") || moment(this.dateTime).format("YYYYMMDDHH")
      // console.log(CheckImgExists(url));
      $.get(url)
        .then(() => {
          // 图片覆盖
          this.imageLayer = L.imageOverlay(
            url,
            [
              [32.693551958, 118.623246452],
              [32.693551958, 118.716952308],
              [32.663720011, 118.716952308],
              [32.663720011, 118.623246452],
            ],
            { opacity: 1 }
          ).addTo(this.map);
        })
        .catch(() => {
          console.log(url);
          console.warn("图片不存在");
        });
    },
    // 地图整体水质查询
    getWhole(time) {
      console.info("当前时间：" + moment(time || this.dateTime).format('LLLL'))
      $.get({
        url: $$.url + "/wms/wms/outside/v1/map/total-data.do",
        data: {
          dateType: this.dateType,
          dateTime: time || this.dateTime,
          factorCode: this.factorCode,
        },
      })
        .then((resp) => {
          this.siteInfos = resp.siteInfos;
          this.totalInfo = resp.totalInfo;
        })
        .then(() => {
          this.getImage(time);
          this.drawPoints(this.siteInfos);
        })
        .catch(() => {
          this.siteInfos = [];
          this.totalInfo = [];
          this.$message("站点数据不存在");
          this.getImage(time);
        });
    },
    getInzi() {
      return $.ajax({
        type: "get",
        url: $$.url + "/wms/wms/outside/v1/interpolation/factors.do",
      }).then((resp) => {
        this.yz = resp;
        this.factorCode = _.first(this.yz).columnCode;
        this.$store.commit("setYz",this.factorCode);
        this.changeYz(this.factorCode);
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

 
      // 底图类型
      L.tileLayer(
        // "http://t1.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}",
        // 'http://t1.tianditu.gov.cn/DataServer?T=vec_c&tk=8c6be0890f2afebbfba3bb0c21636cac&x={x}&y={y}&l={z}',// d2a862ecf7d40c6a1aa96fdff18bae22
        "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 20,
          maxNativeZoom: 18,
          minZoom: 3,
          subdomains: "1234",
        }
      ).addTo(this.map);
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

      // 画html
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
      // console.log(geoJsonPoint,2222)
      return L.marker(latlng, {
        icon: L.divIcon({
          html: `<div class="my_water water_${geoJsonPoint.properties.levelId}" title="${geoJsonPoint.properties.level}"></div>`,
          className: "",
          iconAnchor: [30, 30],
        }),
      });
    },
    //弹框
    pipePopUpFunc(feature, layer) {
    
      // console.log(feature);
      layer.bindPopup(
        () => {
          let popUp = Vue.extend(popDetail);
          let popContent = new popUp({
            propsData: {
              id: feature.properties.id,
              father: this,
              factorCode: this.factorCode
            },
          });
          // 
            setTimeout(() => {
                 this.map.panTo([feature.geometry.coordinates[1] + 0.015, feature.geometry.coordinates[0] - 0.01])
              // this.map.panTo([32.67384, 118.64516])
            },200)
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
    //弹框
    stationClick(point) {
      // console.log(L.popup().options.__proto__.maxWidth = 320)
      console.log('====>', L.popup().options)
      
      L.popup(  
          {
          maxWidth: 320,
          direction: "top",
          // className: styles.myTooltip
          offset: [-20, -30],
        })
      .setLatLng([point.latitude, point.longitude])
      .setContent(
        () => {
          let popUp = Vue.extend(popDetail);
          let popContent = new popUp({
            propsData: {
              id: point.id,
              father: this,
              lineSelect: this.lineSelect,
             
            },
          });
          return popContent.$mount().$el;
        })
      .openOn(this.map)

       setTimeout(() => {
              this.map.panTo([point.latitude + 0.015, point.longitude - 0.01])
          // this.map.panTo([32.67384, 118.64516])
        },200)
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  min-width: 1100px;
  position: relative;
  height: 100%;
  font-family: 黑体;
}


.header {
  width: 100%;
  height: 40px;
  background: rgba(64, 158, 255, 1);
  h1 {
    padding-top: 5px;
  }
}

.mapPanel {
  height: calc(100% - 44px);
}

.foot {
  position: absolute;
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
  top: 16px;
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
  top: 0px;
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
  top: 16px;
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
  // background: rgb(238, 142, 0);
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

<style  lang="less">
.my_water {
  position: relative;
  width: 20px;
  height: 20px;
  // background-color: red;
  
  background-size: cover;
  border-radius: 2px;
}

.water_1 {
  background-image: url("../../images/assets/I.png");
}

.water_2 {
  background-image: url("../../images/assets/II.png");
}
.water_3 {
  background-image: url("../../images/assets/III.png");
}
.water_4 {
  background-image: url("../../images/assets/IV.png");
}
.water_5 {
  background-image: url("../../images/assets/V.png");
}
.water_6 {
  background-image: url("../../images/assets/劣V.png");
}



</style>