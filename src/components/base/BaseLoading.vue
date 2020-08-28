<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-23 21:18:25
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 15:27:35
-->
<template>
  <div class="myLoading" v-if="isLoading" :style="{color, 'font-size':size}">
    <i class="el-icon-loading"></i>
    <span>加载中......</span>
  </div>
</template>
<script>
import { themeColor, fontSize } from "@/global";
export default {
  name: "base-loading",
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
  data: function () {
    return {
      color: themeColor,
      size: fontSize,
    };
  },
};
</script>

<style lang="scss" scoped>
.myLoading {
  text-align: center;
  margin: 0.1rem 0;
}
</style>