/*!
 * @description: util较为特殊的项目二次封装工具库
 * @author: kelichao
 * date: 2021-03-11
 */
import { Message } from 'element-ui';
let util = {};

util.status = {
   0:"处置中",
  1:"已处置",
  2: "未处置",
}
//
util.ajax = function(options) {
  return kit.ajax({
    ...{
    headers: {
      token:  kit.searchObject("token") || "", // 默认参数,每个请求需要夹带
    },
    complete: (info)=> {
      // console.log(info.responseJSON)
        if(info.responseJSON && (info.responseJSON.msg == "未授权的内部用户!!!")){
        console.log("token过期")
        Message({
          message: '未授权的内部用户!!!',
          type: 'warning'
        });

        setTimeout(() => {
          window.location.href = "http://47.104.111.5:8808/ipes-portal-web/#/portal";
        },3000)
      }
    },...options,
    
  }})
}


util.paintPie = function (options = {
  title: "",
  formatter: "",
  data: []
}) {

  // 标题
  return {
    title: {
      text: options.title,
      textStyle: {
        color: store.state.platformType == 'pc' ? 'white':"black",
        fontSize: 14
      },
      top:"top",
      left: options.titlePosition,
    },
    tooltip: {
      trigger: "item",
    },
    grid: {
      left: "2%",
      right: "4%",
      bottom: "3%",
      top: "10%",
      containLabel: true,
    },
    graphic:options.graphic,
    //  graphic:[{
    //             type:"text",
    //             left:"20%",
    //             top:"45%",
    //             style:{
    //                 text:"16个",
    //                 textAlign:"center",
    //                 fill:"white",
    //                 fontSize:20,
    //                 fontWeight:700
    //             }
    //         },{
    //             type:"text",
    //             left:"20%",
    //             top:"45%",
    //             style:{
    //                 text:"18个",
    //                 textAlign:"center",
    //                 fill:"white",
    //                 fontSize:12,
    //                 fontWeight:700
    //             }
    //         }],
    legend: {
        orient: store.state.platformType == 'pc' ? 'vertical':'horizontal',
        align: store.state.platformType == 'pc' ?"left":"auto",// 图标相对于文字的位置
        left: store.state.platformType == 'pc' ?'right':"center",
        top:store.state.platformType == 'pc' ?"center":"bottom",
        textStyle: {
          color: store.state.platformType == 'pc' ? 'white':"black", 
          rich: {
            a: {
              color: 'rgba(41, 222, 255, 1)',
              fontFamily:"Bebas Neue",
              align:'right',
              //   padding:[0,15,0,0],
              //   lineHeight:25
              fontSize: store.state.platformType == 'pc' ? '14':"10",
              width:50,
              // fontWeight: 700
            },
            b: {
              color: 'white',
              fontSize: store.state.platformType == 'pc' ? '14':"10",
              float:"right"
              // fontWeight: 700
            },
            c: {
              // color: 'blue',
              width:store.state.platformType == 'pc' ?55:"",
              fontSize: store.state.platformType == 'pc' ? '14':"10",
              // float:"right"
              // color: '#65F7CB',
              // fontSize: 32,
              // fontWeight: 700
            },
             d: {
              color: store.state.platformType == 'pc' ? 'rgba(41, 222, 255, 1)':'#303133',
              fontFamily:"Bebas Neue",
              align:'right',
              //   padding:[0,15,0,0],
              //   lineHeight:25
              fontSize: store.state.platformType == 'pc' ? '14':"10",
              // width:store.state.platformType == 'pc' ? 50:,
              fontWeight: 700
            },
            e: {
                color: 'white',
              fontFamily:"Bebas Neue",
              align:'right',
              //   padding:[0,15,0,0],
              //   lineHeight:25
              fontSize: store.state.platformType == 'pc' ? '14':"10",
              width:30,
              // fontWeight: 700
            }
          },
        },
        itemWidth:store.state.platformType == 'pc' ? 14:10,
        itemHeight:store.state.platformType == 'pc' ? 14:10,
        icon:"rect",
        ...(options.legend || {}),
    },
    series: {
        color: options.color || ["rgba(48, 211, 133, 1)", "rgba(255, 211, 0, 1)", "rgba(255, 153, 2, 1)", "rgba(255, 2, 0, 1)", "rgba(153, 0, 153, 1)", "rgba(153, 0, 0, 1)"],// 饼图颜色,会不断循环
        name: "",
        type: "pie",
        radius: ["36%", "83%"],
        center: ['22%', '50%'],
         label: {
                show: false,
                position: 'center'
            },
        // label: {
        //   formatter: options.formatter,
        //   //  fontSize: 14,
        //   color: store.state.platformType == 'pc' ? 'white':"black",
        // },
        data: options.data,
        ...options.series
      },
    
  }
}

util.paintLine = function (options = {
  title: "",
  titlePosition: '',
  formatter: "",
  xData:[],
  data: []
}) {
  // console.log(options.yData)
  var platformType = store.state.platformType

  return {
    title: {
      text: options.title || "",
      textStyle: {
        color: platformType == 'pc' ?"white":"rgba(96, 98, 102, 1)",
        fontSize: platformType == 'pc' ?14:10,
      },
      left:platformType == 'pc' ?'left':'4%'

    },
    // // 鼠标上移的tip提示框
    tooltip: {
      trigger: "axis",
      // formatter: "{b} : {c} 个({d}%)",// 设置提示框的文案格式
      // 调整tip框的位置，防止空间不够一直在抖动
      // 而且参数可以传数组当对象
      position: function ([x, y]) {
        return platformType == 'pc' ?[x - 200, y]:[x - 20, y];
      },
    },
    color: ['rgba(28,108,197,1)', "rgba(255, 2, 0, 1)", "rgba(255, 153, 2, 1)", "rgba(2, 194, 108, 1)"],      //关键加上这句话，legend的颜色和折线的自定义颜色就一致了
    legend: {
      data: options.legend || [],
      textStyle: {
        color: platformType == 'pc' ?"white":"rgba(96, 98, 102, 1)",
        fontSize:platformType == 'pc' ?14:10,
      },
      top:'top',
      left:platformType == 'pc' ?"center":'right',
      right:platformType == 'pc' ?"center":'0%',
      itemWidth: platformType == 'pc' ? 25:12,
      itemHeight: platformType == 'pc' ? 14:6,
    },
    // 整体位置区域,只对line或bar有效
    grid: options.grid ||{
      left: "4%",
      right: "4%",
      bottom: "3%",
      top: platformType == 'pc' ?"15%":'25%',
      containLabel: true,
    },
    //// 工具栏
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },
    xAxis: {
      type: options.xType || "category",
      boundaryGap: false,
      // name:"日期",// 坐标的单位
      // 画图区域的分割线
      splitLine: {
        show: false,
      },
      // // 坐标轴轴线相关设置
      axisLine: {
        // onZero: false,
        lineStyle: {
          color: "gray",
          opacity: 0.1 // 轴体的透明度
        },
      },
      data: options.xData,
    },
    yAxis: {
      type: options.yType || "value",
      name: options.name || "",// 坐标的单位
      // scale: true,
      // 画图区域的分割线
      splitLine: {
        show: false,
      },
      // 带区域的分隔栏
      splitArea: {
        show: true,
        // 分割区域颜色
        areaStyle: {
          color: platformType == 'pc' ?["rgba(0, 65, 136, 1)", "rgba(0,0,0,0)"]:["rgba(208, 216, 229, 0.2)", "rgba(0,0,0,0)"],
        },
      },
      // // 坐标轴轴线相关设置
      axisLine: {
        onZero: true,
        lineStyle: {
          color: "gray",
          opacity: 0.1 // 轴体的透明度
        },
      },
    },
    series: options.yData || []
    // [{
    //     name: "邮件营销",
    //     type: "line", // 图标类型
    //     stack: "总量",
    //     // 线条样式,不要修改,否则会对不上
    //     //  lineStyle: {
    //     //       color: 'rgba(28,108,197,1)',
    //     //       // width: 4,
    //     //       // type: 'dashed'
    //     //     },
    //     // // 折现上点位的样式
    //     // itemStyle: {
    //     //   borderWidth: 3,
    //     //   borderColor: 'rgba(255, 211, 0, 1)',
    //     //   // color: 'yellow'// 这个不要
    //     // },

    //     data: [120, 132, 101, 134, 90, 230, 210],
    //   }
    // ],
  };
}

util.paintBar = function (options = {
  title: "",
  formatter: "",
  data: [],
  xyChange:"",// xy轴位置兑换
  color: [],
}) {
  var platformType = store.state.platformType
  var xAxis = {
    // 放在内部
    //  axisLabel: {
    //         inside: true,
    //         textStyle: {
    //             color: '#fff'
    //         }
    //     },
    //  axisLabel:{
		// 				     interval:0,//横轴信息全部显示
		// 				     rotate:-30,//-30度角倾斜显示
    //  },
    // 画图区域的分割线
    splitLine: {
      show: false,
    },
    // boundaryGap: false,
    // name:"日期",// 坐标的单位
    // // 坐标轴轴线相关设置
    axisLine: {
      // onZero: false,
      lineStyle: {
        color: "gray",
        opacity: 0.1 // 轴体的透明度
      },
    },
    type: options.xType || "category",

    data:  options.xData //||["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  };

  var yAxis = {
    type: options.yType || "value",
    name: options.name,// 坐标的单位
    // scale: true,
    // 带区域的分隔栏
    // 带区域的分隔栏
    splitArea: {
      show: true,
      // 分割区域颜色
      areaStyle: {
        color: platformType == 'pc' ?["rgba(0, 65, 136, 1)", "rgba(0,0,0,0)"]:['#d0d8e5','#ffffff'],
      },
    },
    splitLine: {
      show: false,
    },
    // // 坐标轴轴线相关设置
    axisLine: {
      onZero: false,
      lineStyle: {
        color: "gray",
        opacity: 0.1 // 轴体的透明度
      },
    },
  }

  var arr = [xAxis,yAxis];

  if (options.xyChange) {
    arr = arr.reverse();
  }

  return {
    title: {
      text: options.title || "",
      textStyle: {
        color: platformType == 'pc' ?"white":'black',
        fontSize: platformType == 'pc' ?"14":'10',
      },
    },
    // 鼠标上移的tip提示框
    tooltip: {
      trigger: "axis",
      formatter: "{b} : {c} " + (options.name|| ""),// 设置提示框的文案格式
      // 调整tip框的位置，防止空间不够一直在抖动
      // 而且参数可以传数组当对象
      position: function ([x, y]) {
        return platformType == 'pc' ?[x, y]:[x,y];
      },
    },
    legend: {
      data: options.legend,//["邮件营销", "联盟广告"],
      textStyle: {
        color: platformType == 'pc' ?"white":"black"
      }
    },
    color: options.color || ["rgba(255, 153, 2, 1)"],
    // 整体位置区域,只对line或bar有效
    grid: options.grid || {
      left: "3%",
      right: "4%",
      bottom: "3%",
      // top:"5%",
      containLabel: true,
    },
    //// 工具栏
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },
    xAxis: arr[0],
    yAxis: arr[1],
    series: [
      {
        barWidth: 13,//柱图宽度
        type: "bar", // 图标类型
        stack: "总量",
        data: options.yData //|| [120, 132, 101, 134, 90, 230, 210],
      }
    ],
  }
}





export default util;