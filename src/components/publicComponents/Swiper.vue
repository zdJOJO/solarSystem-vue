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
      height: "200px",
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
    height: 5px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
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