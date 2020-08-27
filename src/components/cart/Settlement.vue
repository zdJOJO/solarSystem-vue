<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-24 02:14:29
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-27 10:46:08
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
  margin: 15px 0 10px 0;

  .total {
    margin: 5px 0;
  }
  .totalPrice {
    margin: 5px 0;
    color: #f56c6c;
    font-weight: bold;
    font-size: 20px;
  }
  .btn {
    margin: 7px 0;
  }
}
</style>