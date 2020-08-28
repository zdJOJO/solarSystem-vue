<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-28 20:02:08
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 23:33:13
 * @FilePath: \vue-demo\src\components\base\BaseMenuContainer.vue
-->
<template>
  <div class="baseMenuContainer" :style="{gridTemplateColumns: getColums, gridgGap: gap}">
    <base-menu-cell
      v-for="(menu, index) in memus"
      :key="index"
      :menuName="menu.name"
      :imgSrc="menu.imgName"
      :routePath="menu.routePath"
      :color="color"
      :fontSize="fontSize"
    />
  </div>
</template>
<script>
export default {
  name: "base-menu-container",
  props: {
    memus: Array,
    cloum: {
      type: Number,
      default: 5,
    },
    gap: {
      type: String,
      default: "0 rem",
    },
    color: {
      type: String,
      default: "#303133",
    },
    fontSize: String,
  },
  computed: {
    getColums: function () {
      return `repeat(${this.cloum}, 1fr)`;
    },
  },
  data: function () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.baseMenuContainer {
  display: grid;
}
</style>