<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-27 21:47:02
 * @FilePath: \vue-demo\src\components\publicComponents\Swiper.vue
-->
<template>
  <div class="swiper" :style="{height}">
    <el-carousel
      :arrow="arrow"
      :height="height"
      :loop="loop"
      :autoplay="autoplay"
      :interval="interval"
    >
      <el-carousel-item v-for="item in swiperImgs" :key="item.img">
        <el-image v-if="!!item.img" :src="item.img" />
        <el-image v-if="!item.img">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  //子组件接受父组件传来的参数
  data() {
    return {
      arrow: "never",
      height: "4rem",
      loop: true,
      autoplay: false,
      interval: 3000,
    };
  },
  props: ["swiperImgs"],
};
</script>

<style lang="scss" scoped>
$fontColor: #303133;
.swiper {
  width: 100%;

  .el-carousel__button {
    height: 0.1rem;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 0.28rem;
    opacity: 0.75;
    line-height: 3rem;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: $fontColor;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: $fontColor;
  }

  .el-image {
    width: 100%;
    height: 100%;
  }
}
</style>