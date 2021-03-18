/*!
 * @description: util较为特殊的项目工具库
 * @author: kelichao
 * date: 2021-03-11
 */

let util = {};

util.paintPie = function(options = {
  title: "", 
  formatter:"", 
  data: []
}){

    // 标题
    return {
      title: {
      text: options.title,
      textStyle: {
        color: 'white',
        fontSize :"14px"
      },
      
      // subtext: '全年空气质量等级占比',// 副标题
      left: "left",
      // top:"0"
    },
    tooltip: {
      trigger: "item",
    },
    // 网格边缘
    // grid: {
    //     top: 0,
    //     bottom: 30
    // },
    // // 项目列表
    // legend: {
    //     orient: 'vertical',
    //     left: 'center',
    //     top:"bottom"
    // },
    series: [
      {
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

util.paintLine = function(options = {
  title: "", 
  formatter:"", 
  data: []
}){
  return  {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    grid: {
        top: 0,
        bottom: 30
    },
    series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
    }]
  };
}





export default util;