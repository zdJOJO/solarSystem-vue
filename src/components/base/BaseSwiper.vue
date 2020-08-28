<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 19:34:28
 * @FilePath: \vue-demo\src\components\base\BaseSwiper.vue
-->
<template>
  <div class="swiper" :style="{width}">
    <nut-swiper
      direction="horizontal"
      :swiperData="swiperImgs"
      :lazyLoad="true"
      :lazyLoadUrl="lazyLoadUrl"
      :paginationVisible="true"
      :autoPlay="3000"
      :loop="true"
    >
      <div v-for="(item,index) in swiperImgs" :key="index" class="nut-swiper-slide">
        <img :data-src="item.img" class="nut-img-lazyload imgItem" />
      </div>
    </nut-swiper>
  </div>
</template>
// 
<script>
export default {
  name: "base-swiper",
  props: {
    swiperImgs: Array,
  },
  data() {
    return {
      arrow: "never",
      width: "7.5rem",
      // height: "4rem",
      lazyLoadUrl: "/public/images/loading.gif",
      loop: true,
      autoplay: false,
      interval: 3000,
    };
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  .imgBox {
    width: 100%;
    height: 100%;
  }
  .imgItem {
    width: 100%;
    height: 100%;
  }
}
</style>


