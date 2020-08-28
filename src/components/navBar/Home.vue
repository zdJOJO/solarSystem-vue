<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 15:45:55
-->
<template>
  <div>
    <base-swiper :swiperImgs="lunbotuList" :isfull="true" />
    <div class="box">
      <div class="grid">
        <div class="cell" v-for="menu in showMenus" :key="menu.name">
          <router-link :to="menu.routePath">
            <div class="sub-cell">
              <img :src="'/public/images/' + menu.imgName" alt />
              <div :style="{color}" class="menuName">{{menu.name}}</div>
            </div>
          </router-link>
        </div>
      </div>
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

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    // grid-template-rows: minmax(100px, 1fr);
    // grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-gap: 0.06rem;

    .cell::before {
      content: "";
      padding-bottom: 100%;
      display: block;
    }
    .cell {
      border: 1px solid #e5e4e95c;
      text-align: center;
      padding: 0.12rem;
      line-height: 0.4rem;
      box-shadow: 0 0.02rem 0.04rem 0 rgba(0, 0, 0, 0.1);
      display: grid;
    }

    .cell::before,
    .cell a {
      grid-area: 1 / 1 / 2 / 4;
    }

    a {
      text-decoration: none;
      width: 100%;
      height: 100%;
      position: relative;
    }
    img {
      width: 0.6rem;
      height: 0.6rem;
      object-fit: contain;
    }
    .sub-cell {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translateX(-50%) translateY(-50%);

      .menuName {
        font-size: 0.27rem;
        margin-top: 0.1rem;
      }
    }
  }
}
</style>