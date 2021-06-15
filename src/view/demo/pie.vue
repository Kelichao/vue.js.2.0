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

    kit.chartRender($("#aaa"),{
      chart: {
        // 类型饼图
        type: "pie",
      },
      // 鼠标上移的tip提示框(pie)
      tooltip: {
        trigger: "item",
        // 设置提示框的文案格式
        formatter: "{b} : {c} 个({d}%)",
        // 调整tip框的位置，防止空间不够一直在抖动
        // 而且参数可以传数组当对象
        position: function ([x, y]) {
          return [x - 200, y];
        },
      },
      // 小标签位置
      legend: {
        orient: "vertical",// 小标签排列方向 水平：'horizontal'  垂直：'vertical'
        
        x: "20", // x坐标
        y: "center",// y坐标
        data: ["地方政府债", "商业银行债", "国债"],
      },
      series: [
        {
          // color:["blue","yellow"],// 饼图颜色,会不断循环
          name: "访问来源", // 提示的固定名称
          type: "pie",
          // 大小扇形
          //roseType:"radius",
          minAngle: 20, // 最小角度
          data: [
            { name: "地方政府债", value: 40 },
            { name: "商业银行债", value: 2 },
            { name: "国债", value: 60 },
          ],
          // 直径与容器短边的比值
          radius: "85%",
          // 圆心对于容器的相对位置
          center: ["50%", "55%"],
          itemStyle: {
            // 一般情况下饼图上显示的文案
            normal: {
              label: {
                position: "inner",
                show: !0,
                formatter: function (total) {
                  return (total.percent - 0).toFixed(0) + "%";
                },
                textStyle: {
                  color: "#ffffff",
                },
              },
              labelLine: {
                show: !1,
              },
            },
            // 鼠标上浮时候饼图上显示的文案
            emphasis: {
              label: {
                show: !0,
                formatter: function (total) {
                  return (total.percent - 0).toFixed(0) + "%";
                },
              },
            },
          },
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