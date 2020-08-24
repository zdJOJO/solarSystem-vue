<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-23 21:51:54
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-24 17:22:19
-->
<template>
  <el-card shadow="always" :style="userNameStyle">
    <el-row :gutter="24">
      <el-col :span="10" :style="userNameStyle">{{userName}}</el-col>
      <el-col :span="14" :style="timeFont">{{time | dateFormat}}</el-col>
    </el-row>
    <el-row :gutter="24" :style="contentStyle">
      <el-col>
        <div class="content">{{content}}</div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import { fontStyle } from "../../global";
export default {
  data: function () {
    return {
      userNameStyle: {
        ...fontStyle,
        fontSize: "15px",
      },
      timeFont: {
        color: "#8f8f94",
        fontSize: "12px",
      },
      contentStyle: fontStyle,
    };
  },
  props: ["content", "time", "userName"],
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 8px 0;
  box-shadow: 3px -2px 5px 0 rgba(0, 0, 0, 0.05);
  height: 100px;

  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 40px;
    // white-space: nowrap;
  }
}
</style>