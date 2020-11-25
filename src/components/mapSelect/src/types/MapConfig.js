export class MapConfig {
    constructor() {
        this.mapCenter  =  [30.257881, 120.195923]; // 地图默认中心点
        // this.url = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
        this.url = "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";
        this.maxZoom = 18; // 最大缩放
        this.minZoom = 5; // 最效缩放
        this.zoom = 14; // 默认缩放
        this.isSearch = true;
        this.city = "天津";
        this.searchConfigKey = '9cb097cec23e465d5916ef63f23798db';
        // this.searchConfigUrl = 'http://restapi.amap.com/v3/place/text'; 
        this.searchConfigUrl = "https://restapi.amap.com/v3/assistant/inputtips"
    }
}


//    http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=13548&y=6261&z=14 // 正常

// 有问题
//    http://webrd0c.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=3388&y=1564&z=12&service=WMS&request=GetMap&layers=&styles=&format=image%2Fpng&transparent=false&version=1.1.1&LAYERS=%E5%85%A8%E5%9B%BD%E5%8E%BF%40%E5%85%A8%E5%9B%BD%E5%8E%BF&TRANSPARENT=true&width=256&height=256&srs=EPSG%3A3857&bbox=13110479.091473432,4725642.836702736,13120263.031093935,4735426.776323237