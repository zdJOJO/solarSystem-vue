<template>
  <el-card shadow="always" :body-style="{ padding: '10px' }">
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
  margin: 10px;
  p {
    margin: 5px 0;
  }
  .price {
    color: #f56c6c;
    font-weight: bold;
    display: inline-block;
    margin-bottom: 5px;
  }
  button {
    margin-top: 10px;
  }
  img {
    width: 100%;
  }
}
</style>