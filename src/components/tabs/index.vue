<template>
  <div>

     
       <template v-for="(item,index) in formItem">
        <el-select v-if="item.type=='select'" :key="index" v-model="item.value" placeholder="请选择">
          <el-option
            v-for="item in item.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-input style="width:200px;" v-else-if="item.type=='input'" v-model="item.value" :key="index"></el-input>

        <el-date-picker
        v-else-if="item.type=='pick'" 
        :key="index"
        v-model="item.value"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      
       <slot v-else name="form" :data="item">   </slot>
       </template>
  

    <template slot="empty">
      <slot name="empty">没有查询到符合条件的记录</slot>
    </template>

      <!-- 无数据插槽 -->
      <!-- <template slot="empty"> 无数据展示文案1 </template> -->

      <u-table
        :data="tableData"
        :height="tableConfig.height"
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
        <slot v-else name="table" :data="item">
        </slot>
      </template>
      
      
      </u-table>
    </slot>
  </div>
</template>

<script>
// 生命周期
export default {
  props: {
    tableConfig: {
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
    formItem:{
      default: function () {
        return [];
      },
    }
  },
  mounted() {},
  beforeMount() {
    console.log(this.$el);
  },

  data() {
    return {
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
  },
};
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
