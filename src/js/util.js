/*!
 * @description: util较为特殊的项目二次封装工具库
 * @author: kelichao
 * date: 2021-03-11
 */
import { Message } from 'element-ui';
let util = {};

//
util.ajax = function(options) {
  return kit.ajax({...{
    headers: {
      token: klcs.cookie().token || kit.locaSearch("token") || "23caa9ec2b5043b39701c895c3c1e47c", // 默认参数,每个请求需要夹带
    }
  },...options,...{
    
    complete: (info)=> {
        if(info.responseJSON.msg == "未授权的内部用户!!!"){
        console.log("token过期")
        Message({
          message: '未授权的内部用户!!!',
          type: 'warning'
        });
      }
    }
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
        color: store.state.platformType == 'pc' ? 'black':"black",
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
    //                 fill:"black",
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
    //                 fill:"black",
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
          color: "black", 
          rich: {
            a: {
              color: 'rgba(41, 222, 255, 1)',
              fontFamily:"Bebas Neue",
              align:'right',
              //   padding:[0,15,0,0],
              //   lineHeight:25
              fontSize: store.state.platformType == 'pc' ? '16':"10",
              width:50,
              // fontWeight: 700
            },
            b: {
              color: 'black',
              fontSize: store.state.platformType == 'pc' ? '16':"10",
              float:"right"
              // fontWeight: 700
            },
            c: {
              // color: 'blue',
              width:store.state.platformType == 'pc' ?100:"",
              fontSize: store.state.platformType == 'pc' ? '16':"10",
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
              fontSize: store.state.platformType == 'pc' ? '16':"10",
              // width:store.state.platformType == 'pc' ? 50:,
              fontWeight: 700
            },
            e: {
                color: 'black',
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
        radius: ["56%", "83%"],
        center: ['22%', '50%'],
         label: {
                show: false,
                position: 'center'
            },
        // label: {
        //   formatter: options.formatter,
        //   //  fontSize: 14,
        //   color: store.state.platformType == 'pc' ? 'black':"black",
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

  var platformType = store.state.platformType

  return {
    title: {
      text: options.title || "",
      textStyle: {
        color: platformType == 'pc' ?"black":"rgba(96, 98, 102, 1)",
        fontSize: "14px",
      },

    },
    // // 鼠标上移的tip提示框
    tooltip: {
      trigger: "axis",
      // formatter: "{b} : {c} 个({d}%)",// 设置提示框的文案格式
      // 调整tip框的位置，防止空间不够一直在抖动
      // 而且参数可以传数组当对象
      position: function ([x, y]) {
        return [x - 200, y];
      },
    },
    color: ['rgba(28,108,197,1)', "rgba(255, 2, 0, 1)", "rgba(255, 153, 2, 1)", "rgba(2, 194, 108, 1)"],      //关键加上这句话，legend的颜色和折线的自定义颜色就一致了
    legend: {
      data: options.legend || [],
      textStyle: {
        color: "rgba(96, 98, 102, 1)",
      }
    },
    // 整体位置区域,只对line或bar有效
    grid: {
      left: "4%",
      right: "4%",
      bottom: "3%",
      top: "15%",
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
      // name:"摄氏度",// 坐标的单位
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

  var xAxis = {
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

    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  };

  var yAxis = {
    type: options.yType || "value",
    name: "摄氏度",// 坐标的单位
    // scale: true,
    // 带区域的分隔栏
    // 带区域的分隔栏
    splitArea: {
      show: true,
      // 分割区域颜色
      areaStyle: {
        color: ["rgba(0, 65, 136, 1)", "rgba(0,0,0,0)"],
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
        color: "black",
        fontSize: "14px",
      },
    },
    // // 鼠标上移的tip提示框
    tooltip: {
      trigger: "axis",
      // formatter: "{b} : {c} 个({d}%)",// 设置提示框的文案格式
      // 调整tip框的位置，防止空间不够一直在抖动
      // 而且参数可以传数组当对象
      position: function ([x, y]) {
        return [x - 200, y];
      },
    },
    legend: {
      data: ["邮件营销", "联盟广告"],
      textStyle: {
        color: "black"
      }
    },
    color: options.color || ["rgba(255, 153, 2, 1)"],
    // 整体位置区域,只对line或bar有效
    grid: options.grid || {
      left: "3%",
      right: "4%",
      bottom: "3%",
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
        name: "邮件营销",
        barWidth: 13,//柱图宽度
        type: "bar", // 图标类型
        stack: "总量",
        data: [120, 132, 101, 134, 90, 230, 210],
      }
    ],
  }
}

util.pdfExport = function(dom = null, name) {
    if (!dom) return
    dom.style.background = "#FFFFFF";
    // scale = !scale ? 2 : scale;
    // // allowTaint: true 表示允许跨越的图片
    html2Canvas(dom, { allowTaint: true }).then((canvas) => {
        // console.log('canvas',canvas)
        // const contentWidth = canvas.width / scale
        // const contentHeight = canvas.height / scale
        // const PDF = new JsPDF(undefined, 'pt', [contentWidth, contentHeight])
        // const pageData = canvas.toDataURL('image/jpeg', 1.0)
        // PDF.addImage(pageData, 'JPEG', 0, 0, contentWidth, contentHeight)
        // PDF.save(name + '.pdf') // 调用save方法生成pdf文件

        const pageWidth = 700
        const pageHeight = 892.28
        // 设置内容的宽高
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        // 默认的偏移量
        let position = 0
        // 设置生成图片的宽高
        const imgCanvasWidth = pageWidth
        const imgCanvasHeight = (592.28 / contentWidth) * contentHeight
        let imageHeight = imgCanvasHeight
        // 生成canvas截图，1表示生成的截图质量（0-1）
        const pageData = canvas.toDataURL('image/jpeg', 1)
        // new JsPDF接收三个参数，landscape表示横向，（默认不填是纵向），打印单位和纸张尺寸
        const PDF = new JsPDF('landscape', 'pt', 'a4')
        // 当内容不超过a4纸一页的情况下
        if (imageHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 20, 20, imgCanvasWidth, imgCanvasHeight)
        } else {
            // 当内容超过a4纸一页的情况下，需要增加一页
            while (imageHeight > 0) {
                PDF.addImage(pageData, 'JPEG', 20, position, imgCanvasWidth, imgCanvasHeight)
                imageHeight -= pageHeight
                position -= pageHeight
                // 避免添加空白页
                if (imageHeight > 0) {
                    PDF.addPage()
                }
            }
        }
        // 调用save方法生成pdf文件
        PDF.save(name + '.pdf')

    })
}



export default util;