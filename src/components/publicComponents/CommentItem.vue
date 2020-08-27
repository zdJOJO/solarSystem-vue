<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-23 21:51:54
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-27 17:06:41
-->
<template>
  <div>
    <el-card shadow="always" :style="userNameStyle" v-if="!loading">
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

    <el-card
      shadow="always"
      :style="userNameStyle"
      v-if="!loading && new Date(time).getTime() % 300 === 0"
    >
      <div>
        <div style="display: flex">
          <my-skeleton width="20px" type="circle" :padding="padding" />
          <my-skeleton width="20vw" height="20px" :padding="padding" />
          <my-skeleton width="35vw" height="20px" :padding="padding" />
        </div>
        <my-skeleton width="55vw" height="15px" :padding="padding" />
        <my-skeleton width="70vw" height="15px" :padding="padding" />
      </div>
    </el-card>
  </div>
</template>
<script>
import { fontStyle } from "@/global";
// import { Skeleton } from "./";
import Skeleton from "./Skeleton";
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
      padding: "5px 10px 0 0",
    };
  },
  props: ["content", "time", "userName", "loading"],
  components: {
    "my-skeleton": Skeleton,
  },
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