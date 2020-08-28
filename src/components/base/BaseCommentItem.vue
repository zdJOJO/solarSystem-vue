<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-23 21:51:54
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 15:45:40
-->
<template>
  <div>
    <el-card
      shadow="always"
      :style="userNameStyle"
      v-if="!loading"
      :body-style="{padding: '0.22rem' }"
    >
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
          <base-skeleton width="0.4rem" type="circle" :padding="padding" />
          <base-skeleton width="20vw" height="0.4rem" :padding="padding" />
          <base-skeleton width="35vw" height="0.4rem" :padding="padding" />
        </div>
        <base-skeleton width="80vw" height="0.3rem" :padding="padding" />
        <base-skeleton width="80vw" height="0.3rem" :padding="padding" />
      </div>
    </el-card>
  </div>
</template>
<script>
import { fontStyle } from "@/global";
export default {
  name: "base-comment-item",
  props: {
    content: String,
    time: String,
    userName: String,
    loading: Boolean,
  },
  data: function () {
    return {
      userNameStyle: {
        ...fontStyle,
        fontSize: "0.3rem",
      },
      timeFont: {
        color: "#8f8f94",
        fontSize: "0.24rem",
      },
      contentStyle: fontStyle,
      padding: "0.1rem 0.2rem 0 0",
    };
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 0.16rem 0;
  box-shadow: 0.06rem -0.04rem 0.1rem 0 rgba(0, 0, 0, 0.05);
  height: 2rem;

  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 1rem;
    // white-space: nowrap;
  }

  .el-row {
    line-height: 0.5rem;
  }
}
</style>