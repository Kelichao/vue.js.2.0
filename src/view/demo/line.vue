<template>
  <div>
    <div class="f-pt20">
      <el-button @click="startHacking">demo</el-button>
      <div id="aaa" style="width: 600px; height: 400px"></div>
    </div>
  </div>
</template>

<script>
// 生命周期
export default {
  data() {
    return {
      type: 0,
      tableDate: [],
      data: "",
      aaa: "",
    };
  },
  mounted() {
    console.log(this.$el);

    kit.chartRender($("#aaa"), {
      // title: {
      //   text: "折线图堆叠",
      //   textStyle: {
      //     color: "white",
      //     fontSize: "14px",
      //   },
      // },
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
      color:['rgba(28,108,197,1)','#ff6600','#808bc6'],      //关键加上这句话，legend的颜色和折线的自定义颜色就一致了
      // legend: {
      //   data: ["邮件营销", "联盟广告"],
      // },
      // 整体位置区域,只对line或bar有效
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "4%",
        containLabel: true,
      },
      //// 工具栏
      // toolbox: {
      //   feature: {
      //     saveAsImage: {},
      //   },
      // },
      xAxis: {
        type: "category",
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
        type: "value",
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
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    });
  },
  beforeMount() {
    console.log(this.$el);
  },
  components: {},

  watch: {
    aaa: {
      handler() {
        console.log(1111);
      },
      immediate: false,
    },
  },
  methods: {
    startHacking: function () {
      this.aaa = 111;

      //this.aaa = 111
    },
  },
};
</script>

<style lang="less" scoped>

</style>