import {kit} from "./tool/kit"
import jquery from "jquery"
import config from "./env"
import moment from "moment"
import _ from "underscore"
import { Message, MessageBox } from 'element-ui';
import * as echarts from 'echarts';

// 定义全局变量
window.kit = kit;
window.jquery = jquery;
window.$ = jquery;
window._ = _;
window.echarts = echarts;
window.$$ = config[process.env.NODE_ENV];

console.log(config,process.env.NODE_ENV)
// console.log(ElementUI)

window.util = {
    javaAjax(url,data,callback) {
        return $.ajax({
          type:"post",
          data: {userId:1,...data},
          url: "http://dev.oa.zcabc.com/api/v1/boot/" + url
        })  
          .then((resp) => {
            
            if (resp.meta.code === 200) {
                callback(resp.data)
            }
          })
          .catch((e) => {
            Message({ message: '请求出错', type: "error" });
            console.error(e)
          });
      },
};


// 日期格式化
// moment().format('MMMM Do YYYY, h:mm:ss a'); // 九月 10日 2020, 9:48:39 上午
// moment().format('dddd');                    // 星期四
// moment().format("MMM Do YY");               // 9月 10日 20
// moment().format('YYYY [escaped] YYYY');     // 2020 escaped 2020
// moment().format();                          // 2020-09-10T09:48:39+08:00
// 相对时间
// moment("20111031", "YYYYMMDD").fromNow(); // 9 年前
// moment("20120620", "YYYYMMDD").fromNow(); // 8 年前
// moment().startOf('day').fromNow();        // 10 小时前
// moment().endOf('day').fromNow();          // 14 小时内
// moment().startOf('hour').fromNow();       // 1 小时前
// 日历时间
// moment().subtract(10, 'days').calendar(); // 2020/08/31
// moment().subtract(6, 'days').calendar();  // 上星期五09:48
// moment().subtract(3, 'days').calendar();  // 上星期一09:48
// moment().subtract(1, 'days').calendar();  // 昨天09:48
// moment().calendar();                      // 今天09:48
// moment().add(1, 'days').calendar();       // 明天09:48
// moment().add(3, 'days').calendar();       // 下星期日09:48
// moment().add(10, 'days').calendar();      // 2020/09/20
window.moment = moment;