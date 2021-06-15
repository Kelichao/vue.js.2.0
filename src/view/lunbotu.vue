<template>
 
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
          <div class="swiper-slide">Slide 4</div>
          <div class="swiper-slide">Slide 5</div>
          <div class="swiper-slide">Slide 6</div>
          <div class="swiper-slide">Slide 7</div>
          <div class="swiper-slide">Slide 8</div>
          <div class="swiper-slide">Slide 9</div>
          <div class="swiper-slide">Slide 10</div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
        <!-- Add Arrows -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>


</template>

<script>
// import Swiper from "swiper";
import {Swiper} from "~/images/assets/swiper-bundle.min.js";
// https://github.com/surmon-china/vue-awesome-swiper  // 在vue中使用swiper

window.Swiper = Swiper;
// 生命周期
export default {
  mounted() {
    console.log(this.$el);

    var swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

    //     setTimeout(() => {
    //     var swiper = new Swiper('.swiper-container', {
    //     loop: true,
    //  speed: 900,
    //  autoplay: {
    //  delay: 3000, //3秒切换一次
    //  disableOnInteraction: false
    //  },
    //  observer: true,//修改swiper自己或子元素时，自动初始化swiper
    //  observeParents: true,//修改swiper的父元素时，自动初始化swiper
    //     // pagination: {
    //     //   el: '.swiper-pagination',
    //     //   clickable: true,
    //     // },
    //   });
    //   // console.log(swiper)
    //   // console.log($('.swiper-container'))
    //   },2000)
  },
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


html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
</style>
