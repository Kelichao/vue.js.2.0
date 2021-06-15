<template>
  <div class=" f-pt40">
    <div>
      <el-button @click="startHacking">demo</el-button>
          <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

          
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="400px">
      <fixed :visible.sync="dialogVisible"></fixed>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import fixed from '~/components/fixed/fixed'
// 生命周期
export default {
  mounted() {
    console.log(this.$el)
  },
  beforeMount() {
    console.log(this.$el)
  },
  components:{
    fixed
  },
  data() {
    return {
            dialogVisible: false,
    data:"",
      aaa:""
    }
  },
  watch: {
    aaa: {
      handler() {
      console.log(1111)
    },
    immediate: false
    },
    
  },
  methods: {
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    startHacking: function() {
      this.aaa = 111
      
      //this.aaa = 111
    }
  }
};
</script>

<style>

</style>
