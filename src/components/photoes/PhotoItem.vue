<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-28 17:29:06
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-30 15:54:24
 * @FilePath: \vue-demo\src\components\photoes\PhotoItem.vue
-->
<template>
  <div :class="getClass" @click="handleClick(photoItem.id)">
    <el-card :body-style="{ padding: '0px' }">
      <img v-lazy="photoItem.img_url" class="photoItemImage" />
      <div style="padding: 10px;">
        <span>{{photoItem.title}}</span>
        <div class="photoItemBottom">
          <div class="user">
            <i class="el-icon-s-custom" />
            <span style="padding: 5px;">{{photoItem.admin || '匿名用户'}}</span>
            <el-tag>{{photoItem.tags || '默认'}}</el-tag>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { ROUTE_PATH } from "@/global";
export default {
  props: {
    photoItem: Object,
    classType: {
      type: String,
      default: "left",
    },
  },
  methods: {
    handleClick(id) {
      this.$emit("handle-click", id);
    },
  },
  computed: {
    getClass: function () {
      return `item ${this.classType}`;
    },
  },
};
</script>

<style lang="scss">
.item {
  box-sizing: border-box;
  .time {
    font-size: 13px;
    color: #999;
  }
  .photoItemBottom {
    margin-top: 5px;
    line-height: 12px;
  }
  .user {
    margin: 8px 0;
    font-size: 13px;
    color: #909399;
    position: relative;
    .el-tag {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .photoItemImage {
    display: block;
    width: 100%;
  }
}
.item.left {
  padding: 0 5px 10px 0;
}
.item.right {
  padding: 0 0 10px 5px;
}
</style>