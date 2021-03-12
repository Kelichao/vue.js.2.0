<template>
  <!-- <div style='{backgroundUrl: "@/images/西中岛/背景.png"}' >123 -->
  <div class="container f-df f-fdc">
    <!-- 上部分 -->
    <div class="f-f3 f-df">
      <!-- 左 -->
      <div class="f-f1 f-mr24 f-df f-fdc">
        <div class="f-f1 box">
          <h1 class="h1">园区简介</h1>
          <p class="p">
            
          </p>
        </div>

       
      </div>
      <!-- 中 -->
      <div class="lunbotu f-df f-fdr box">
        
      </div>

      <!-- 右 -->

      <div class="f-f1  f-df f-fdc f-ml24">
        <div class="f-f1 box">
          <h1 class="h1">产业定位</h1>
          
          <div class="f-df f-fdr ">
            
          </div>

          <div class="f-df f-fdr f-bsb f-mt10">


            
          </div>
        </div>

        <div class="f-f1 box f-mt24">
          <h1 class="h1">发展定位</h1>

          <div class="f-df f-fdr f-bsb f-mt10">

          </div>
          

          <div class="f-df f-fdc">
            
          
           
          </div>
        </div>
      </div>
    </div>

    <!-- 下部分 -->
    <div class="f-f2 f-df f-mt24 f-ofa bottom">
      <!-- 左 -->
      <div class="f-f2 box">
        <h1 class="h1">发展历程</h1>
        
      </div>
      <!-- 右 -->
      <div class="f-f1 box f-ml24">
        <h1 class="h1">入围企业</h1>
        <div class="">
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 生命周期
export default {
  mounted() {
    console.log(this.$el);
    kit.ajax();
  },
  beforeMount() {
    console.log(this.$el);
  },
  components: {},
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

<style lang="less" scoped>
.container {
  padding: 40px;
  box-sizing: border-box;
  color: white;
  font-size: 14px;
}


.lunbotu {
  width: 800px;
}

.label2 {
  line-height:30px;
  width:50%;
  height:60px;
  text-indent:0;
    align-items: center;
    justify-content: center;
    border-radius: 0;
  img {
    margin:0;
  }
}

// .bottom {}
</style>



<style>

</style>
