export class MapConfig {
    constructor() {
        this.mapCenter  =  [30.257881, 120.195923]; // 地图默认中心点
        this.url = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
        // this.url = "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";
        this.maxZoom = 18; // 最大缩放
        this.minZoom = 5; // 最效缩放
        this.zoom = 14; // 默认缩放
        this.isSearch = true;
        this.searchConfigKey = '9cb097cec23e465d5916ef63f23798db';
        this.searchConfigUrl = 'http://restapi.amap.com/v3/place/text';
    }
}
