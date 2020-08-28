<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-23 23:46:36
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 15:27:01
 * @FilePath: \vue-demo\src\components\base\BaseLoadMore.vue
-->
<template>
  <div class="loadMore">
    <el-button
      type="primary"
      plain
      size="small"
      icon="el-icon-arrow-down"
      @click="$emit('start-load',{})"
    >往下加载更多</el-button>
  </div>
</template>
<script>
export default {
  name: "base-load-more",
  data: function () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.loadMore {
  text-align: center;
  margin: 0.2rem 0;
}
</style>