<template>
  <div class="container f-df f-fdc">
    <!-- 表格组件开始 -->
    <tabs
      ref="tab"
      :total="item.total"
      :table-data="item.tableData"
      :table-item="item.tableItem"
      :form-item="item.formItem"
      :callback="callback"
    >
      <!-- 表单插槽 -->
      <template slot="form" slot-scope="scope">
        <el-input
          size="mini"
          v-if="scope.data.type == 1"
          style="width: 200px"
          v-model="scope.data.value"
        ></el-input>
      </template>

      <!-- 表格体插槽 -->
      <template slot="table" slot-scope="scope">
        <!-- type为插槽类型 -->
        <u-table-column label="操作" v-if="scope.data.type == 2">
          <template slot-scope="scope">
            <span
              style="padding: 0 5px; background: rgba(255, 153, 2, 1);color: white;"
              >{{ scope.row.statusStr }}</span
            >
          </template>
        </u-table-column>

        <u-table-column label="操作" v-if="scope.data.type == 3">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="dele(scope.row)"
              >删除</el-button
            >
          </template>
        </u-table-column>
      </template>
    </tabs>
    <!-- 表格组件结束 -->
  </div>
</template>

<script>
  import tabs from "@/components/tabs/index";
  import {item} from "./item.js"
  // 生命周期
  export default {
    data() {
      return {
        item: item
      };
    },
    mounted() {
      // console.log(this.$refs.tab.searchObj)
      this.defaultGetData();
    },
    components: { tabs },
    methods: {
      callback(page, pageSize, searchObj) {
        // 触发请求
        this.$getData({
          ...searchObj,
          // beginTime// 时间戳开始
          // endTime// 时间戳
          offset: page - 1,
          limit: pageSize
        });
      },
      defaultGetData() {
        // console.log(this.$refs.tab.page)
        this.callback(
          this.$refs.tab.nowPage,
          this.$refs.tab.pageSize,
          this.$refs.tab.searchObj
        );
      },
      dele(data) {
        console.log(data.id);
        util.ajax({
          url: "/api/v1/law-enforce/pc/delete",
          type: "post",
          contentType: "application/json;charset=UTF-8",
          processData: false,
          data: JSON.stringify([data.id]),
          success: () => {
            this.defaultGetData();
          }
        });
      },
      edit(data) {},
      $getData(searchObj) {

        util.ajax({
          url: "api/v1/law-enforce/pc/list",
          data: {
            ...searchObj
          },
          complete: resp => {
            // console.log(111)
            var arr = [];
            for (var i = 0; i < 10; i++) {
              // console.log(11);
              
              arr.push({
                checkTime: "2016-05-03",
                companyName: "徐州中发水务投资有限公司",
                troubleTypeName: "小猪",
                userName: "王小虎3",
                statusStr: "王小虎g",
                name2: "王小虎4",
                name4: "王小虎adg",
                address: "上海市普陀区金沙江路 1518 弄"
              });
            }

            this.item.tableData = arr;
            this.item.total = i;
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 15px;
    box-sizing: border-box;
  }
</style>
