<template>
    <div class="select-location" ref="selectLocationContainer">
        <el-form class="select-location-con" v-if="isInput" :model="form" ref="selectLocation">
            <el-form-item class = "select-longitude" :style="{width: inputStyleWidth + 'px'}" prop="E" :rules='rulesE'>
                <el-input placeholder="请输入经度" style="width: 100%" :disabled="disable" v-model="E" @change='inputChange'></el-input>
            </el-form-item>
            <el-form-item class="select-latitude" :style="{width: inputStyleWidth + 'px'}" prop="N" :rules='rulesN'>
                <el-input placeholder="请输入纬度" style="width: 100%" :disabled="disable" v-model="N" @change='inputChange'></el-input>
            </el-form-item>
        </el-form>
        <i class="zmdi zmdi-zmdi-pin el-icon-location map-icon " @click="openMapDialog" v-if="!disable"></i>
        <div class="selct-dialog">
            <el-dialog size="mini" :visible.sync="dialogVisible" custom-class='yf_map-dialog-select' :lock-scroll="true" id="mapEditContainer" @close="closeMapSelect" :width="dialogWidth">
                <span slot="title">
                    {{title}}
                </span>
                <div :id="mapId" class="map-box">
                    <div class="mapTip">
                        <div class="text"> 经度：{{E1}}</div>
                        <div class="text"> 纬度：{{N1}}</div>
                    </div>
                    <div class="custom-content" v-if="$slots.customContent">
                        <slot name="customContent"></slot>
                    </div>
                </div>
                <div class="map-search" style="width: 200px" v-if="componentConfig.isSearch">
                    <el-input v-model="searchQuery" clearable placeholder="请输入关键词搜索" @blur="searchBlur" @clear="clearAddressList" @input="searchLocation" size="mini" suffix-icon="el-icon-search"></el-input>
                </div>
                <div class="map-search-list" style="width: 200px">
                    <search-list :result="positionList" @setLocationItem="setLocationItem" :activeIndex="activeIndex" :isNoData="searchIsNoData"></search-list>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancleFun" size="mini"> 取 消</el-button>
                    <el-button type="primary" @click="okFun" size="mini">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import { MapConfig } from "../types/MapConfig";
import {debounce, jsonpHttp} from '../utils/utils';
import * as coordtransform from "coordtransform";
import L from "leaflet";
import SearchList from "../search-list/SearchList";

export default {
    name: 'SelectLocation',
    components: {
        SearchList
    },
    data() {
        return {
            activeIndex: -1,
            componentConfig: {
                mapCenter: [30.257881, 120.195923],
                url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
                maxZoom: 18,
                minZoom: 5,
                zoom: 14,
                isSearch: true,
                searchConfigKey: 'cb097cec23e465d5916ef63f23798db',
                searchConfigUrl: 'http://restapi.amap.com/v3/place/text',
            },
            positionList: [],
            N: "", // 纬度(显示值)
            E: "", // 经度(显示值)
            N1: "", // 纬度temp  数值
            E1: "", // 经度temp  数值
            N2: "", // 鼠标滑动值
            E2: "", // 鼠标滑动值
            select: this.mapType, // 1-度分秒；2-度
            dialogVisible: false,
            searchIsNoData: false,
            map: null, // 地图
            marker: null, // masker
            searchQuery: "", // 地图搜索内容
            rulesE:  [
                {
                    validator: (rule, value, callback, source, options,) => {
                        if (value == "" || value == null) {
                            callback();
                        }
                        if (
                            !/^\d+(\.\d+)?$/.test(value) ||
                            Number(value) > 180 ||
                            Number(value) < 0
                        ) {
                            callback(new Error("请输入合法的经度值"));
                        } else {
                            callback();
                        }
                    },
                    trigger: "blur",
                },
            ], // 经度校验规则
            rulesN:  [
                {
                    validator: (rule, value, callback, source, options,) => {
                        if (value == "" || value == null) {
                            callback();
                        }
                        if (
                            !/^\d+(\.\d+)?$/.test(value) ||
                            Number(value) > 90 ||
                            Number(value) < 0
                        ) {
                            callback(new Error("请输入合法的维度值"));
                        } else {
                            callback();
                        }
                    },
                    trigger: "blur",
                },
            ] // 经度校验规则
        }
    },
    props: {
        mapConfig: {
            type: Object,
            default: () => {
                return new MapConfig()
            }
        },
        width: {
            type: Number,
            default: 320
        },
        mapId: {
            type: String,
            default: 'map'
        },
        value: {
            type: Array,
            default: () => {
                return []
            }
        },
        dialogWidth: {
            type: String,
            default: '800px'
        },
        mapType: {
            type: [Number, String],
            default: '2'
        },
        toFixedNum: {
            type: Number,
            default: 6
        },
        isInput: {
            type: Boolean,
            default: true
        },
        disable: {
            type: Boolean,
            default: false
        },
        isClear: {
            type: Boolean,
            default: false
        },
        isMarker: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: '请在地图上单击选择坐标点'
        }
    },
    computed: {
        form() {
            return {
                E: this.E ? Number(this.E).toFixed(this.toFixedNum) : "",
                N: this.N ? Number(this.N).toFixed(this.toFixedNum) : "",
            };
        },
        inputStyleWidth() {
            return this.width ? (this.width / 2 - 30) : 140;
        },
        nullValueStr() {
            const zero = 0;
            return zero.toFixed(this.toFixedNum);
        }
    },
    watch: {
        value: {
            immediate: true,
            handler: function (val) {
                this.initValue(val)
            }
        }
    },
    created(){
        this.initConfig()
    },
    methods: {
        /**
         * 销毁地图
         */
        destroyMap() {
            // if (this.map) {
            //     this.map.remove();
            //     this.map = null;
            //     this.marker = null;
            //     this.N = this.N1 = this.N2 = '';
            //     this.E = this.E1 = this.E2 = '';
            //     this.activeIndex = -1;
            //     this.sync();
            // }
        },
        /**
         * 清除value
         */
        clearValue() {
            this.N = this.N1 = this.N2 = '';
            this.E = this.E1 = this.E2 = '';
            this.activeIndex = -1;
        },
        /**
         * 组件配置初始化
         */
        initConfig() {
            this.componentConfig = {
                ...this.componentConfig,
                ...this.mapConfig,
            };
        },
        /**
         * 打开弹框
         */
        openMapDialog() {
            if (this.disable) {
                return false;
            }
            this.dialogVisible = true;
            const that = this;
            // 选择类型是度分秒 对值进行一次转化
            this.N1 = this.select === "1" ? this.strToFloat(this.N) : this.N;
            this.E1 = this.select === "1" ? this.strToFloat(this.E) : this.E;
            setTimeout(() => {
                if (!this.map) {
                    this.map = L.map(this.mapId, {
                        crs: L.CRS.EPSG3857,
                        center: this.componentConfig.mapCenter,
                        maxZoom: 18,
                        minZoom: 5,
                        maxBounds: L.latLngBounds(
                            L.latLng(4, 73),
                            L.latLng(54, 135),
                        ),
                        zoom: 14,
                    });
                    L.tileLayer
                        .wms(this.componentConfig.url, {
                            LAYERS: "全国县@全国县",
                            TRANSPARENT: true,
                            format: "image/png",
                        })
                        .addTo(this.map);
                    if (this.N1 && this.E1) {
                        this.setMarker();
                        this.map.setView([this.N1, this.E1]);
                    }
                    this.map.on("click", (e) => {
                        this.N1 = e.latlng.lat.toFixed(this.toFixedNum);
                        this.E1 = e.latlng.lng.toFixed(this.toFixedNum);
                        this.setMarker();
                    });
                    this.map.on("mousemove", (e) => {
                        this.N2 = e.latlng.lat.toFixed(this.toFixedNum);
                        this.E2 = e.latlng.lng.toFixed(this.toFixedNum);
                    });
                    this.map.on("zoomend", (e) => {
                        console.log(e.target.getZoom());
                        this.zoomChange(e.target.getZoom());
                    });
                }
                this.mapOnloadView();
            }, 300);
            if (this.map) {
                this.mapOnloadView();
            }
        },
        /**
         * 输入框修改
         */
        inputChange() {
            const arr = [
                Number(this.form.N).toFixed(this.toFixedNum),
                Number(this.form.E).toFixed(this.toFixedNum),
            ];
            this.sync(arr);
        },
        /**
         * 关闭弹框
         */
        closeMapSelect() {
            this.searchQuery = '';
            this.positionList = [];
            this.searchIsNoData = false;
            if (this.marker) {
                try {
                    this.map.removeLayer(this.marker);
                } catch (e) {
                    return true;
                }
            }
            if (this.map) {
                this.map.setView([
                        this.N1 || this.componentConfig.mapCenter[0],
                        this.E1 || this.componentConfig.mapCenter[1]],
                    14, { animate: true, duration: 0.25 });
            }
        },
        /**
         * 节流触发搜索
         */
        searchLocation() {
            this.activeIndex = -1;
            if (this.searchQuery) {
                debounce(this.getLocationQuery, 250)();
            }
        },
        /**
         * 清空搜索数据
         */
        clearAddressList() {
            this.positionList = [];
            this.searchIsNoData = false;
        },
        /**
         * 搜索框焦点
         */
        searchBlur() {
            if (!this.searchQuery) {
                this.positionList = [];
                this.searchIsNoData = false;
            } else {
                this.searchLocation();
            }
        },
        /**
         * 地图位置搜索
         */
       async getLocationQuery() {
            let positionList = [];
            const res = await jsonpHttp(
                this.componentConfig.searchConfigUrl,
                {
                    city: this.componentConfig.city, 
                    keywords: this.searchQuery,
                    key: this.componentConfig.searchConfigKey,
                    platform: "JS",
                    logversion: "2.0",
                    csid: "A7C5FE6F-1539-4E57-BF67-932F3CB19954",
                    sdkversion: "1.4.15"
                 });
                if (res.info == 'OK') {
                    positionList = res.tips;
                }

                this.positionList = positionList;
                this.searchIsNoData = this.positionList.length === 0;
        },
        /**
         * 定位当前选中的地址
         */
        async setLocationItem({ item, index } ) {
            if (item.location) {
                const temp = item.location.split(',');
                this.activeIndex = index;
                const loacation = await coordtransform.gcj02towgs84(temp[0], temp[1]);
                this.N1 = loacation[1].toFixed(this.toFixedNum);
                this.E1 = loacation[0].toFixed(this.toFixedNum);
                this.setMarker();
                this.map.setView(
                    [this.N1 || 30, this.E1 || 120],
                    12,
                    { animate: true, duration: 0.25 },
                );
            }
        },
        /**
         * 弹框关闭
         */
        cancleFun() {
            this.dialogVisible = false;
            this.closeMapSelect();
        },
        /**
         * 定位点确认修改
         */
        okFun() {
            this.dialogVisible = false;
            if (this.select === '1') { // 当前选中为度分秒，则转换回去
                this.N = this.floatToStr(this.N1);
                this.E = this.floatToStr(this.E1);
            } else {
                this.N = this.N1;
                this.E = this.E1;
            }
            this.sync();
        },
        /**
         * 绘制地图标记
         */
        setMarker() {
            if(!this.isMarker) {
                return;
            }
            if (!this.marker) {
                this.marker = L.marker([this.N1, this.E1], {
                    icon: new L.icon({
                        iconUrl: require("./images/selectLocation.png"),
                        iconAnchor: [16, 32],
                    }),
                });
                try {
                    this.marker.setLatLng([this.N1, this.E1]);
                    this.map.addLayer(this.marker);
                } catch (e) {
                    return true;
                }
            } else {
                try {
                    this.marker.setLatLng([this.N1, this.E1]);
                    this.map.addLayer(this.marker);
                } catch (e) {
                    return true;
                }
            }
        },
        /**
         * 十进制转换度分秒
         */
        floatToStr(ft) {
            if (ft !== "" && /^\d+(\.\d+)?$/.test(ft)) {
                let ret = null;
                const du = parseInt(ft, 10);
                const fendoc = ft - du;
                const fens = fendoc * 60;
                const fen = parseInt(String(fens), 10);
                const miaodoc = fens - fen;
                const miao = Math.floor(miaodoc * 60 * 100) / 100;
                ret = du + "°" + fen + "′" + miao + "″";
                return ret;
            } else {
                return "";
            }
        },
        /**
         * 度分秒转十进制（度）
         */
        strToFloat(ret) {
            if (ret !== "") {
                let ft = null;
                let fen = 0;
                let miao = 0;
                const splitFirst = ret.split("°");
                const du = parseFloat(splitFirst[0]);
                if (isNaN(du)) {
                    return "";
                }
                if (splitFirst.length > 1) {
                    const splitSecond = splitFirst[1].split("′");
                    fen = parseFloat(splitSecond[0]);
                    if (isNaN(fen)) {
                        fen = 0;
                    }
                    if (splitSecond.length > 1) {
                        miao = parseFloat(splitSecond[1]);
                        isNaN(fen) && (miao = 0);
                    }
                }
                ft = du + fen / 60 + miao / 3600;
                return ft.toFixed(this.toFixedNum);
            } else {
                return "";
            }
        },
        /**
         * 地图加载视图
         */
        mapOnloadView() {
            if (this.N1 && this.E1) {
            this.setMarker();
            this.map.setView(
                [
                    this.N1 || this.componentConfig.mapCenter[0],
                    this.E1 || this.componentConfig.mapCenter[1],
                ],
                12,
                { animate: true, duration: 0.25 });
            } else {
                this.map.setView(
                    [
                        this.N1 || this.componentConfig.mapCenter[0],
                        this.E1 || this.componentConfig.mapCenter[1],
                    ],
                    14,
                    { animate: true, duration: 0.25 },
                );
            }
        },
        /**
         * 地图value初始化
         * @param val
         */
        initValue(val) {
            if (val && val.length > 1) {
                const N = Number(val[0]) ?  Number(val[0]).toFixed(this.toFixedNum) : null;
                const E = Number(val[1]) ?  Number(val[1]).toFixed(this.toFixedNum) : null;
                this.N = this.N1 = this.N2 = N;
                this.E = this.E1 = this.E2 = E;
                this.closeMapSelect();
                this.setMarker();
            } else {
                this.N = this.N1 = this.N2 = '';
                this.E = this.E1 = this.E2 = '';
                this.closeMapSelect();
            }
        },
        /**
         * 位置数据双向绑定
         */
        sync(val) {
            if (Array && Array.isArray(val) && val.length === 2) {
                this.$emit('input', val)
                return val;
            }
            if (this.E != this.nullValueStr || this.N != this.nullValueStr) {
                this.$emit('input', [this.N, this.E])
                return [this.N, this.E];
            }
        },
        /**
         * 缩放级别修改
         * @param val
         */
        zoomChange(val) {
            this.$emit('zoomChange', val);
        }
    }
}
</script>
<style lang="css" scoped src="./index.css"></style>
<style lang="css">
    .yf_map-dialog-select .el-dialog__body {
        padding-top: 0;
        padding-bottom: 0;
    }

    .select-location .el-input {
        width:200px;
    }
    .map-icon {
        margin-top:-10px;
    }
</style>
