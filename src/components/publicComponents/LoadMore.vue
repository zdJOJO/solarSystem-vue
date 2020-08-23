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
  data: function () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.loadMore {
  text-align: center;
  margin: 10px 0;
}
</style>