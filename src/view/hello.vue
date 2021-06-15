<template>
  <div>
    <!-- <div>
      <el-button @click="startHacking">我是通过路由引导的页面2</el-button>
      <input v-model="aaa" />
    </div> -->
    <!-- <div id="main2" style="height: 200px; width: 200px"></div> -->

    <el-table v-if="type==1" :data="tableData" height="500" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="name" label="地址"> </el-table-column>
    </el-table>

    <!-- <div style="height:200px;">

    </div> -->

    <u-table v-else :data="tableData" height="500" :border="false" style="width: 100%" use-virtual>
      <template slot="empty"> 没有查询到符合条件的记录 </template>
      <u-table-column prop="date" label="日期" width="180"> </u-table-column>
      <u-table-column prop="name" label="姓名" width="180"> </u-table-column>
      <u-table-column prop="address" label="地址" width="180"> </u-table-column>

    </u-table>
    <!-- <div>
      <tabs></tabs>
    </div> -->
  </div>
</template>

<script>
import tabs from "@/components/tabs/index";

// 生命周期
export default {
    data() {
    return {
      type:1,
      type:2,
      data: "",
      aaa: "",
      tableData: [],
    };
  },
  mounted() {
    console.log(this.$el);

    for (let i = 0; i < 10000; i++) {
      console.log(11);
      this.tableData.push({
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
      });
    }
    // echarts.init(document.getElementById("main2")).setOption({
    //   title: { text: "Line Chart" },
    //   tooltip: {},
    //   toolbox: {
    //     feature: {
    //       dataView: {},
    //       saveAsImage: {
    //         pixelRatio: 2,
    //       },
    //       restore: {},
    //     },
    //   },
    //   xAxis: {},
    //   yAxis: {},
    //   series: [
    //     {
    //       type: "line",
    //       smooth: true,
    //       data: [
    //         [12, 5],
    //         [24, 20],
    //         [36, 36],
    //         [48, 10],
    //         [60, 10],
    //         [72, 20],
    //       ],
    //     },
    //   ],
    // });
  },
  beforeMount() {
    console.log(this.$el);
  },
  components: {
    tabs,
  },

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

<style>

</style>
