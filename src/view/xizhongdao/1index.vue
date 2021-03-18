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
            大连长兴岛（西中岛）石化产业基地是国家重点规划建设的”七大石化产业基地”之一，东北唯一的国家级石化基地。大连西中岛石化产业园区是大连长兴岛（西中岛）石化产业基地的核心区，是国家级专业化工园区和大型”石化岛。
          </p>
        </div>

        <div class="f-f1 box f-mt24">
          <h1 class="h1">特色片区</h1>
          <div class="f-df f-fdc">
            <label class="label">
              <img src="../../../src/images/西中岛/西中岛中日合作产业园@2x.png" />
              西中岛中日合作产业园
            </label>
            <label class="label f-mt10">
              <img src="../../images/西中岛/化工新材料产业园@2x.png" />
              化工新材料产业园</label
            >
          </div>
        </div>
      </div>
      <!-- 中 -->
      <div class="lunbotu f-df f-fdr">
        <img src="../../images/西中岛/地图左@2x.png" class="f-mr10" style="width:20px;height:500px;">
        <div class="f-f1 f-mt10">
          <el-carousel :interval="5000" arrow="always" height="480px">
          <el-carousel-item v-for="item in 4" :key="item">
            <img class="f-h100p f-w100p" src="../../images/西中岛/1.png" />
          </el-carousel-item>
        </el-carousel>
        </div>
        <img src="../../images/西中岛/地图右@2x.png" class="f-ml10" style="width:20px;height:500px;">
        
      </div>

      <!-- 右 -->

      <div class="f-f1  f-df f-fdc f-ml24">
        <div class="f-f1 box">
          <h1 class="h1">产业定位</h1>
          
          <div class="f-df f-fdr ">
            <label class="label label2 f-df f-fdc" style="margin-right:10px;">
              <img class="f1" src="../../images/西中岛/炼化一体化@2x.png" />
              <span clas="f1">炼化一体化</span>
            </label>
            <label class="label label2 f-df f-fdc" style="margin-left:0">
              <img class="f1"   src="../../images/西中岛/轻质化资源利用@2x.png" />
              <span clas="f1">轻质化资源利用</span>
              </label>

          </div>

          <div class="f-df f-fdr f-bsb f-mt10">


            <label class="label label2 f-df f-fdc"  style="margin-right:10px;">
              <img  class="f1"  src="../../images/西中岛/石化深加工@2x.png" />
              <span clas="f1">石化深加工</span></label
            >
             <label class="label label2 f-df f-fdc" style="margin-left:0">
              <img class="f1"   src="../../images/西中岛/气化岛@2x.png" />
              <span clas="f1">气化岛</span></label
            >
          </div>
        </div>

        <div class="f-f1 box f-mt24">
          <h1 class="h1">发展定位</h1>

          <div class="f-df f-fdr f-bsb f-mt10">


            <label class="label label2 f-df f-fdc"  style="margin-right:10px;">
              <img  class="f1"  src="../../images/西中岛/先进产业立园@2x.png" />
              <span clas="f1">先进产业立园</span></label
            >
             <label class="label label2 f-df f-fdc" style="margin-left:0">
              <img class="f1"   src="../../images/西中岛/创新开放驱动@2x.png" />
              <span clas="f1">创新开放驱动</span></label
            >
          </div>
          

          <div class="f-df f-fdc">
            
            <label class="label f-mt10 " style="text-align:center;">
              <img src="../../images/西中岛/绿色安全发展@2x.png" />
              绿色安全发展</label
            >
           
          </div>
        </div>
      </div>
    </div>

    <!-- 下部分 -->
    <div class="f-f2 f-df f-mt24 f-ofa bottom">
      <!-- 左 -->
      <div class="f-f2 box">
        <h1 class="h1">发展历程</h1>
        <el-steps :active="2" align-center class="f-mt10">
          <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
      </div>
      <!-- 右 -->
      <div class="f-f1 box f-ml24">
        <h1 class="h1">入围企业</h1>
        <div class="company">
          <img class="" src="../../images/西中岛/组28741@2x.png" />
          <img class="" src="../../images/西中岛/组28742@2x.png" />
          <img class="" src="../../images/西中岛/组28743@2x.png" />
          <img class="" src="../../images/西中岛/组28744@2x.png" />
          <img class="" src="../../images/西中岛/组28745@2x.png" />
          <img class="" src="../../images/西中岛/组28746@2x.png" />
          <img class="" src="../../images/西中岛/组28747@2x.png" />
          <img class="" src="../../images/西中岛/组28748@2x.png" />
          <img class="" src="../../images/西中岛/组28749@2x.png" />
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
       tableDate:[],
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

.company {
  height: 70%;
  overflow: auto;
  display:flex;
  flex-wrap: wrap;
  margin-left:2%;
  img {
     width: 21%;
     height: 45px;
     margin:1.5%;
     margin-top:0;
  }
}

// .bottom {}
</style>



<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
