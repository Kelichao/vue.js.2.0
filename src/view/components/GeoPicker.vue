<style lang="less" scoped>
.map-search{
    position :relative;;
    width: 648px;;
    height :500px;;
}
    
    .search-box{
          position: absolute;
        top: 16px;
        left :16px;
        width :284px;
        z-index: 999;
        div {
             margin-bottom: 6px;
            box-shadow: 0 2px 3px 0 rgba(0,0,0,0.30);
        }
    }
      
        .search-box-result{
            height: 306px;
            background-color: #fff;
            .card{
                  padding: 6px 13px;
                justify-content: flex-start;
                align-items: flex-start;
            }
              
                &.active{
                      background-color: #EFF2F7;
                }
                  
                .icon{
                    position: relative;
                    div {
                         position: absolute;
                        width :100%;
                        top: 2px;
                        left: 0;
                        text-align :center;
                        color: #fff;
                        font-size :12px;
                    }
                   
                }
                    
                   
                .content{
                    flex-direction: column;
                    align-items :flex-start;
                }
        }
            
                  
        .search-box-paging{
             height: 30px;
            width: 100%;
            background-color: #fff;
        }
           
    .position{
        height: 24px;
        width: 280px;
        opacity: .6;
        background: #000;
        border-radius: 100px;
        color: white;
        position :absolute;
        z-index :999;
        bottom: 20px;
        left: 50%;
        transform :translateX(-50%)
        ;}
        
    .name, .address{ text-align: left;
        width :227px};
       
    .name{ text-overflow: ellipsis;
        white-space :nowrap;
        overflow :hidden};
       
.pointer{ cursor: pointer};
   

</style>

<style lang="less">
.leaflet-div-icon {
  background-color: transparent !important;
  border: none !important;
}

.my-div-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
</style>


<template lang="pug">
el-dialog(
  :visible.sync="visible",
  title="经纬度选择",
  :show-close="true",
  :before-close="done"
)
  .map-search.pd0
    .search-box
      el-input.search-box-bar(
        size="small",
        placeholder="请输入地址",
        v-model="searchWord",
        style="width: 200px"
      )
        el-button(
          slot="append",
          icon="el-icon-search",
          type="primary",
          @click="() => search()"
        )
      template(v-if="hasResult")
        i-scrollbar.search-box-result(v-show="showResult")
          .card.pointer.flex.center(
            v-for="(poi, index in searchResult.pois)",
            :key="poi.id",
            @click="() => cardClick(poi)",
            :class="{ active: poi.id === selectPoiId }"
          )
            .icon.mgr-4
              i.fz-24.iconfont.icon-position_m.red
              div {{ index + 1 }}
            .flex.content
              span.name.fz-14.l-blue.mgb-2 {{ poi.name }}
              span.address.fz-12.gray {{ poi.address }}
        .search-box-paging.flex
          el-pagination(
            small,
            @current-change="onPaging",
            :current-page.sync="searchPage",
            layout="pager, next",
            style="width: 164px",
            :total="+searchResult.count"
          )
          span.l-blue.mgr-16.pointer(@click="showResult = !showResult") {{ showResult ? '隐藏' : '展开' }}
    l-map(
      style="height: 100%",
      :zoom="10",
      :center="center",
      :options="mapOption",
      ref="map",
      @click="mapClick"
    )
      l-tile-layer(
        url="http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
      )
      l-marker(
        v-for="(poi, index in searchResult.pois)",
        :ref="'marker_' + poi.location",
        :key="poi.id",
        :lat-lng="poi.location | latlong",
        :icon="createIcon(poi, index)",
        @click="() => markerClick(poi)"
      )
        l-popup
          .name.l-blue {{ poi.name }}
          .address.gray {{ poi.address }}
      l-marker(
        v-if="cusPosition",
        :lat-lng="activePos | latlong",
        :icon="createIcon({ location: activePos }, 0, 1)"
      )
    .position.flex.pdh-12
      span 经度：{{ activePos.split(',')[0] | num2deg }}
      span 纬度：{{ activePos.split(',')[1] | num2deg }}
  div(slot="footer")
    el-button(type="primary", @click="done(true)", size="small") 确定
    el-button(@click="done", size="small") 取消
</template>
<script>

import * as L from "leaflet";
// import L from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "leaflet";
// import coordtransform from "coordtransform";
// import { ENV } from "config";
let AMapKey = "9cb097cec23e465d5916ef63f23798db";
import { Scrollbar } from "element-ui";
export default {
  name: "map-search",

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },

  props: {
    dialog: Object,
  },

  data() {
    // let latlng = ENV.gridOne.center.concat([]).reverse();
    return {
      visible: true,
      center: L.latLng.apply(L, latlng),
      mapOption: {
        zoomControl: false,
      },
      searchResult: {},
      hasResult: false,
      showResult: true,
      searchPage: 1,
      searchWord: "",
      activePos: "",
      selectPoiId: "",
      cusPosition: false,
    };
  },

  computed: {},

  watch: {},

  filters: {
    latlong(str) {
      return str.split(",").reverse();
    },
    num2deg(num) {
      if (!num) return "--";
      let a = Math.floor(num);
      let [b, cc] = deal(num - a);
      let [c, dd] = deal(cc);
      function deal(num) {
        let dd = num * 60;
        return [Math.floor(dd), dd - Math.floor(dd)];
      }

      return a + "°" + b + "′" + c + "″";
    },
  },

  methods: {
    search(page = 1) {
      this.searchPage = page;
      if (this.searchWord === "") return false;
      // -高德地图 关键字搜索api服务
      this.$get("https://restapi.amap.com/v3/place/text", {
        key: AMapKey,
        page,
        offset: 10,
        keywords: this.searchWord,
      }).then((resp) => {
        if (resp.status === "1") {
          // 底图也是高德底图 不需要进行坐标转换
          // resp.pois.forEach(poi => {
          //     poi.location = coordtransform.gcj02towgs84.apply(null, poi.location.split(',')).join(',')
          // })
          this.searchResult = resp;
          if (resp.pois.length > 0) {
            this.map.setView(
              L.latLng.apply(L, resp.pois[0].location.split(",").reverse())
            );
            this.map.setZoom(15);
            this.hasResult = true;
          }
        }
      });
    },
    onPaging(page) {
      this.search(page);
    },
    createIcon(poi, index, type = 0) {
      let className =
        type !== 0 || this.selectPoiId === poi.id ? "red" : "l-blue";
      return L.divIcon({
        html: `
                <div class="my-div-icon">
                    <i class="iconfont icon-position_m ${className}" style="font-size: 30px"></i>
                    ${
                      type === 0
                        ? `<div style="width: 100%; font-size: 14px; color: #fff; position: absolute; top: 7px; left: 0; text-align: center">${
                            index + 1
                          }</div>`
                        : ""
                    }
                </div>
            `,
      });
    },
    mapClick(e) {
      let { lat, lng } = e.latlng;
      this.activePos = `${lng},${lat}`;
      this.cusPosition = true;
      this.selectPoiId = "";
    },
    markerClick(poi) {
      this.activePos = poi.location;
      this.selectPoiId = poi.id;
      this.cusPosition = false;
    },
    cardClick(poi) {
      this.$refs[`marker_${poi.location}`][0].mapObject.fire("click");
      this.activePos = poi.location;
      this.selectPoiId = poi.id;
    },
    done(confirm) {
      this.visible = false;
      this.dialog.type = undefined;
      if (confirm == true) {
        const [long, lat] = this.activePos.split(",");
        let poi;
        if (!long) return false;
        if (this.selectPoiId) {
          poi = this.searchResult.pois.find(
            (poi) => poi.location === this.activePos
          );
        }
        this.dialog.promise.resolve({
          long: (+long).toFixed(4),
          lat: (+lat).toFixed(4),
          position: poi ? poi.address : "",
        });
      }
    },
  },

  mounted() {
    // this.search()
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject; // work as expected
      if (this.dialog.params.long) {
        let { long: lng, lat } = this.dialog.params;

        this.mapClick({
          latlng: {
            lat,
            lng,
          },
        });

        this.map.setView(L.latLng(lat, lng));
      }
    });
  },
};
</script>
