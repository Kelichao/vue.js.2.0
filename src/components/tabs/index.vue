<template>
  <div>
    <template v-for="(item, index) in formItem">
      <el-select
        v-if="item.type == 'select'"
        :key="index"
        v-model="item.value"
        placeholder="请选择"
      >
        <el-option
          v-for="item in item.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-input
        style="width: 200px"
        v-else-if="item.type == 'input'"
        v-model="item.value"
        :key="index"
      ></el-input>

      <el-date-picker
        v-else-if="item.type == 'pick'"
        :key="index"
        v-model="item.value"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>

      <slot v-else name="form" :data="item"> </slot>
    </template>

    <template slot="empty">
      <slot name="empty">没有查询到符合条件的记录</slot>
    </template>

    <!-- 无数据插槽 -->
    <!-- <template slot="empty"> 无数据展示文案1 </template> -->

    <u-table
      :data="tableData"
      :height="tableConfig.height || 400"
      :border="false"
      use-virtual
    >
      <template v-for="item in tableItem">
        <u-table-column
          v-if="!item.type"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
        </u-table-column>
        <u-table-column
          v-else-if="item.type == 'button'"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
          <template>
            <el-button type="text" size="small" @click="item.callback()"
              >查看button</el-button
            >
          </template>
        </u-table-column>
        <slot v-else name="table" :data="item"> </slot>
      </template>
    </u-table>

    <slot name="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageConfig.total"
      >
      </el-pagination>
    </slot>
  </div>
</template>

<script>
// 生命周期
export default {
  name:"tabs1",
  props: {
    tableConfig: {
      default: function () {
        return {};
      },
    },
    pageConfig: {
      default: function () {
        return {};
      },
    },
    tableData: {
      default: function () {
        return [];
      },
    },
    tableItem: {
      default: function () {
        return [];
      },
    },
    formItem: {
      default: function () {
        return [];
      },
    },
  },
  mounted() {},
  beforeMount() {
    console.log(this.$el);
  },

  data() {
    return {
      currentPage: 1,
      pageSize:100,
      data: "",
      aaa: "",
    };
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageConfig.callback && this.pageConfig.callback(val, this.pageSize)
    },
  },
};
</script>

<style>

</style>
