<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-28 19:46:59
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 22:31:23
 * @FilePath: \vue-demo\src\components\base\BaseMenuCell.vue
-->
<template>
  <div class="baseMenuCell">
    <router-link :to="routePath">
      <div class="baseMenuCellContent">
        <img :src="getImgSrc" alt />
        <div :style="{color, fontSize}" class="baseMenuName">{{menuName}}</div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "base-menu-cell",
  props: {
    menuName: String,
    imgSrc: {
      type: String,
      default: `menu-loading.svg`,
    },
    routePath: {
      type: String,
      default: "#",
    },
    color: {
      type: String,
      default: "#303133",
    },
    fontSize: {
      type: String,
      default: "0.26rem",
    },
  },
  computed: {
    getImgSrc: function () {
      return `/public/images/${this.imgSrc}`;
    },
  },
  data: function () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.baseMenuCell::before {
  content: "";
  padding-bottom: 100%;
  display: block;
}
.baseMenuCell {
  text-align: center;
  padding: 0.12rem;
  line-height: 0.4rem;

  display: grid;
}

.baseMenuCell::before,
.baseMenuCell a {
  grid-area: 1 / 1 / 2 / 2;
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
.baseMenuCellContent {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translateX(-50%) translateY(-50%);

  .baseMenuName {
    font-size: 0.27rem;
    margin-top: 0.1rem;
  }
}
</style>