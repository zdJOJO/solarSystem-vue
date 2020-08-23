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
  props: ["label", "min", "max", "initCount"],
};
</script>

<style lang="scss" scoped>
.iputNumBox {
  display: inline;
}
</style>