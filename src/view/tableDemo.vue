<template>
  <div>
    <div class="f-pt20">
      <!-- 复杂模式开始 -->
      <tabs
        :table-config="tableConfig"
        :table-data="tableData"
        :table-item="tableItem"
        :form-item="formItem"
      >


        <!-- 表单插槽 -->
        <template slot="form" slot-scope="scope"> 
           <el-input v-if="scope.data.type == 1" style="width:200px;"  v-model="scope.data.value" ></el-input>
        </template>


        <!-- 表格体插槽 -->
        <template slot="table" slot-scope="scope">
          <u-table-column label="操作" v-if="scope.data.type == 1">
            <template>
              <el-button type="text" size="small">查看</el-button>
            </template>
          </u-table-column>

          <u-table-column label="操作" v-if="scope.data.type == 2">
            <template>
              <el-button type="text" size="small">新增</el-button>
            </template>
          </u-table-column>
        </template>
      </tabs>
      <!-- 复杂模式结束 -->
    </div>
  </div>
</template>

<script>
import tabs from "@/components/tabs/index";

// 生命周期
export default {
  data() {
    return {
      // 表单配置项
      formItem: [
        {
          type:"select",
          value: "",
          options: [
            {
              value: "选项1",
              label: "黄金糕",
            },
            {
              value: "选项2",
              label: "双皮奶",
            }
          ],
        },
         {
          type:"input",
          value: "",
         
        },
        {
          type:"pick",
          value:""
        },
        {
          type:1,
          value:22222
        }
      ],


      tableItem: [
        { prop: "date", label: "日期" },
        { prop: "name", label: "姓名" },
        { prop: "name1", label: "姓名3" },
        { prop: "name2", label: "姓名4" },
        { prop: "name3", label: "姓名4" },
        { prop: "name4", label: "姓名4" },
        { prop: "address", label: "地址11" },
        { prop: "", label: "", type: 1 /**这个标志用于判断模板 */ },
        { prop: "", label: "", type: 2 /**这个标志用于判断模板 */ },
      ],

      

      tableConfig: {
        height: "400",
      },
      tableData: [],


      data: "",
      aaa: "",
    };
  },
  mounted() {
    console.log(this.$el);
    for (let i = 0; i < 1000; i++) {
      console.log(11);
      this.tableData.push({
        date: "2016-05-03",
        name: "王小虎",
        names: "王小虎",
        name3: "王小虎",
        name2: "王小虎",
        name4: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
      });
    }
  },
  beforeMount() {
    console.log(this.$el);
  },
  components: { tabs },

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
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
