/*!
 * @description: util较为特殊的项目工具库
 * @author: kelichao
 * date: 2021-03-11
 */

let util = {};

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
        color: 'white',
        fontSize: "14px"
      },
      left: options.titlePosition,
    },
    tooltip: {
      trigger: "item",
    },

    series: [
      {
        color: ["rgba(48, 211, 133, 1)", "rgba(255, 211, 0, 1)", "rgba(255, 153, 2, 1)", "rgba(255, 2, 0, 1)", "rgba(153, 0, 153, 1)", "rgba(153, 0, 0, 1)"],// 饼图颜色,会不断循环
        name: "",
        type: "pie",
        radius: ["30%", "40%"],
        label: {
          formatter: options.formatter,
          //  fontSize: 14,
          color: "white",
        },
        data: options.data,
      },
    ],
  }
}

util.paintLine = function (options = {
  title: "",
  titlePosition: '',
  formatter: "",
  data: []
}) {
  return {
    title: {
      text: options.title || "",
      textStyle: {
        color: "white",
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
        color: "white"
      }
    },
    // 整体位置区域,只对line或bar有效
    grid: {
      left: "2%",
      right: "4%",
      bottom: "3%",
      top: "10%",
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
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
          color: ["rgba(0, 65, 136, 1)", "rgba(0,0,0,0)"],
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
    series: [
      {
        name: "联盟广告",
        type: "line",
        stack: "总量",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "邮件营销",
        type: "line", // 图标类型
        stack: "总量",
        // 线条样式,不要修改,否则会对不上
        //  lineStyle: {
        //       color: 'rgba(28,108,197,1)',
        //       // width: 4,
        //       // type: 'dashed'
        //     },
        // // 折现上点位的样式
        // itemStyle: {
        //   borderWidth: 3,
        //   borderColor: 'rgba(255, 211, 0, 1)',
        //   // color: 'yellow'// 这个不要
        // },

        data: [120, 132, 101, 134, 90, 230, 210],
      }
    ],
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
        color: "white",
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
        color: "white"
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





export default util;