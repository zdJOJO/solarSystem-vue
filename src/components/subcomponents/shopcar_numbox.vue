<template>
  <!-- mui 拿来即用 -->
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initCount"
      @change="$emit('chang-count',{
        id: goodsid,
        count: $refs.numbox.value
        })"
      ref="numbox"
      readonly
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  mounted() {
    //mui文档中：mui在mui.init()中会自动初始化基本控件,但是 动态添加的Numbox组件需要手动初始化
    mui(".mui-numbox").numbox();
  },
  props: ["initCount", "goodsid"],
};
</script>

<style lang="scss" scoped>
</style>