<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 15:27:23
 * @FilePath: \vue-demo\src\components\base\BaseInputNumber.vue
-->
<template>
  <div class="iputNumBox">
    <el-input-number
      v-model="num"
      :min="1"
      :max="parseInt(max)"
      :label="label"
      @change="handleChange"
    ></el-input-number>
  </div>
</template>

<script>
export default {
  name: "base-input-number",
  props: {
    label: String,
    min: Number,
    max: Number,
    initCount: Number,
  },
  created() {
    this.init();
  },
  data() {
    return {
      num: 1,
    };
  },
  methods: {
    init() {
      this.num = 1;
      if (this.initCount > 0) {
        this.num = this.initCount;
      }
    },
    handleChange(value) {
      console.log(value);
      this.$emit("get-count", parseInt(value));
    },
  },
};
</script>

<style lang="scss" scoped>
.iputNumBox {
  display: inline;
}
</style>