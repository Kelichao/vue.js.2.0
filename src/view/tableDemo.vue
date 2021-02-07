<template>
  <div>
    <div class="f-pt20">







      <!-- 表格组件开始 -->
      <tabs
        :table-data="tableData"
        :table-item="tableItem"
        :form-item="formItem"
        :page-config="pageConfig"
      >
      </tabs>
      <!-- 表格组件结束 -->








      <el-divider ><i class="el-icon-mobile-phone"></i></el-divider>
      <div style="margin-bottom: 600px;"></div>













      <!-- 表格组件开始 -->
      <tabs
        :table-config="tableConfig"
        :table-data="tableData"
        :table-item="tableItem"
        :form-item="formItem"
        :page-config="pageConfig"
      >
      
        <!-- 表单插槽 -->
        <template slot="form" slot-scope="scope">
          <el-input
            v-if="scope.data.type == 1"
            style="width: 200px"
            v-model="scope.data.value"
          ></el-input>
        </template>

        <!-- 表格体插槽 -->
        <template slot="table" slot-scope="scope">
          <!-- type为插槽类型 -->
          <u-table-column label="操作" v-if="scope.data.type == 2">
            <template>
              <el-button type="text" size="small">新增</el-button>
            </template>
          </u-table-column>
        </template>
      </tabs>
      <!-- 表格组件结束 -->
    </div>
  </div>
</template>

<script>

import tabs from "@/components/tabs/index";
import item from "@/view/config/item.js"


// 生命周期
export default {
  data() {
    return {
      // 表单配置项
      formItem: item.formItem,
      tableItem: item.tableItem,
      tableConfig: item.tableConfig,
      pageConfig: item.pageConfig,



      
      tableData: [],
    };
  },
  mounted() {
    this.$getData();
  },
  components: { tabs },
  methods: {
    $getData() {
      for (let i = 0; i < 1000; i++) {
        console.log(11);
        this.tableData.push({
          date: "2016-05-03",
          name: "王小虎",
          name1: "小猪",
          names: "王小虎3",
          name3: "王小虎g",
          name2: "王小虎4",
          name4: "王小虎adg",
          address: "上海市普陀区金沙江路 1518 弄",
        });
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
