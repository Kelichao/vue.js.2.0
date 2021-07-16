<template>
  <div>
    <div class="form">
      <template v-for="(item, index) in formItem">
        
        <el-select
        size="mini"
        clearable
          v-if="item.type == 'select'"
          :key="index"
          v-model="item.value"
          :placeholder="item.placeholder"
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
        size="mini"
          style="width: 200px;margin-right:6px;"
          :clearable="item.clearable || true"
          :placeholder="item.placeholder"
          v-if="item.type == 'input'"
          v-model="item.value"
          :key="index"
        ></el-input>

        <el-date-picker
        size="mini"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
          style="margin-right:6px;"
          :format="item.format"
          :value-format="item.valueFormat"
          v-if="item.type == 'pick'"
          :key="index"
          v-model="item.value"
          :type="item.timeType || 'date'"
          :placeholder="item.placeholder"
        >
        </el-date-picker>
      
        <slot v-else name="form" :data="item"> </slot>
      </template>
    </div>

    <template slot="empty">
      <slot name="empty">没有查询到符合条件的记录</slot>
    </template>

    <!-- 无数据插槽 -->
    <!-- <template slot="empty"> 无数据展示文案1 </template> -->

    <u-table
      v-if="tableItem.length"
      :border="tableConfig.border"
      @selection-change="selectionChange"
      :stripe="tableConfig.stripe"
      :data="tableData"
      :height="tableConfig.height"
      selectTrClass="selectTr"
      use-virtual
    >
    
        <u-table-column
        type="selection"
        width="55">
      </u-table-column>
      <template v-for="item in tableItem">
          
        <!-- 没有type的普通渲染 -->
        <u-table-column
          v-if="!item.type"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
        </u-table-column>

        <!-- 单一按钮渲染 -->
        <u-table-column
          v-if="item.type == 'button'"
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

        <!-- 复选框 -->
        <u-table-column
          v-if="item.type == 'check'"
          :key="item.prop"
          type="selection"
          width="55"
        >
        </u-table-column>
        <!-- 其他的插槽渲染 -->
        <slot v-else name="table" :data="item"> </slot>
      </template>
    </u-table>

    <slot name="page">
      <div class="page">
        <el-pagination
        v-if="tableItem.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="nowPage"
          :page-sizes="[2,5, 10, 20, 30, 40, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </slot>
  </div>
</template>

<script>
// 生命周期
export default {
  name: "tabs1",
  props: {
    total: {
      default: function() {
        return 0;
      }
    },
    tableConfig: {
      default: function () {
        return {};
      },
    },
    callback: {
      default: function () {
        return new Function;
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
  mounted() {
    if(!this.callback) {
      this.callback = function(){}
    }
  },
  beforeMount() {
    // console.log(this.$el);
  },

  data() {
    return {
      nowPage: 1,
      pageSize: 10,
      searchObj:{},
      data: "",
    };
  },
  watch: {
    // 这里需要添加一个节流
    formItem: {
      handler(newV, oldV) {
        var key = kit._.pluck(newV,"key")
        var value = kit._.pluck(newV,"value")

        // 如果是时间范u围的数组,则让范围值,也变为shu'z
        key.forEach((val,key) => {
          if (kit._.isArray(val)) {
            value[key] = (value[key] || ["",""])
          }
        })
        // console.log(key,value);

        key = kit._.flatten(key)
        value = kit._.flatten(value)
        
        // console.log(newV)
        var object = kit._.object(key,value)
        this.searchObj = object;
        console.log("表单处理后数据",this.searchObj)
        this.handleFormChange();
      },
      deep:true,
      immediate: false,
    },
  },
  methods: {
    selectionChange(val) {
      // this.tableItem[0].callback.call(this.$parent,val);
      // console.log(val)
      this.$emit('selectionChange',val);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;

      this.callback(this.nowPage, this.pageSize,this.searchObj);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val},实际 ${val - 1}`);// hack后端这样搞的,从0开始,烦
      // this.nowPage = val;
       this.callback(this.nowPage, this.pageSize,this.searchObj);
    },
    handleFormChange(val) {
      this.callback(this.nowPage, this.pageSize,this.searchObj);
    }
  },
};
</script>

<style lang="css" rel="stylesheet/css" scoped>
.page {
  float: right;
  margin: 16px 0 0 0;
}

.form {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
