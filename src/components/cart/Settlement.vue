<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-24 02:14:29
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-27 22:14:16
 * @FilePath: \vue-demo\src\components\cart\Settlement.vue
-->
<template>
  <el-card shadow="always">
    <div>
      <el-row :gutter="24">
        <el-col class="total" :span="12">总价:</el-col>
        <el-col class="totalPrice" :span="12">¥ {{getGoodsCountAndAmount.amount}}</el-col>
      </el-row>
      <div class="btn">
        <el-button
          type="danger"
          size="default"
          @click="pay"
        >去结算 ( {{getGoodsCountAndAmount.count}} )</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  methods: {
    pay() {
      this.$emit("go-pay");
    },
  },
  props: ["getGoodsCountAndAmount"],
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 0.1rem 0 0.2rem 0;

  .total {
    margin: 0.1rem 0;
  }
  .totalPrice {
    margin: 0.1rem 0;
    color: #f56c6c;
    font-weight: bold;
    font-size: 0.4rem;
  }
  .btn {
    margin: 0.14rem 0;
  }
}
</style>