<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-24 00:48:12
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-27 21:15:35
 * @FilePath: \vue-demo\src\components\cart\CartItem.vue
-->
<template>
  <el-card shadow="always" :body-style="{ padding: '0.2rem' }">
    <el-row :gutter="24">
      <el-col :span="4">
        <el-checkbox
          size="medium"
          v-model="isChecked"
          @change="(value)=>{handleCheckedChange(cart.id, value)}"
        />
      </el-col>
      <el-col :span="6">
        <img :src="cart.thumb_path" />
      </el-col>
      <el-col :span="14">
        <p>{{cart.title}}</p>
        <div>
          <span class="price">￥ {{cart.price}}</span>
          <input-number :initCount="cart.count" @get-count="(value)=>{changeValue(cart.id,value)}" />
        </div>
        <div>
          <el-button class="delete" type="danger" size="small" @click="remove(cart.id)">删除</el-button>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import InputNumber from "../publicComponents/InputNumber";
export default {
  data() {
    return {
      isChecked: true,
    };
  },
  methods: {
    handleCheckedChange(id, value) {
      this.$emit("change-cartItem-check", { id, value });
    },
    changeValue(id, value) {
      this.$emit("change-cartItem-count", { id, count: value });
    },
    remove(id) {
      this.$emit("remove-count", id);
    },
  },
  props: ["cart"],
  components: {
    "input-number": InputNumber,
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  p {
    margin: 0.1rem 0;
    font-size: 0.28rem;
  }
  .price {
    color: #f56c6c;
    font-weight: bold;
    display: inline-block;
    margin-bottom: 0.1rem;
  }
  button {
    margin-top: 0.2rem;
  }
  img {
    width: 100%;
  }
}
</style>