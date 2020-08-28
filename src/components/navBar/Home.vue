<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 20:24:09
-->
<template>
  <div>
    <base-swiper :swiperImgs="lunbotuList" :isfull="true" />
    <div class="box">
      <base-menu-container :memus="showMenus" :color="color" />
    </div>
  </div>
</template>

<script>
import { fontColor, menus } from "@/global";
import { HOME } from "@/httpConfig/api";

export default {
  data() {
    return {
      color: fontColor,
      lunbotuList: [],
    };
  },
  computed: {
    showMenus() {
      return menus.filter((i) => i.name !== "评论");
    },
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    async getLunbotu() {
      //获取轮播图的方法
      const result = await this.$store.dispatch("ROOT_ASYNC_REQUEST_ACTION", {
        url: HOME.HOME_SWIPER_IMGS,
      });
      this.lunbotuList = result;
    },
  },
};
</script>

<style lang="scss" scoped>
$width: 2.2rem;
$height: 2.2rem;

.box {
  margin: 0.2rem;
}
</style>