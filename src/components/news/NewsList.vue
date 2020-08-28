<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 15:46:40
-->
<template>
  <div class="pageBox" style="overflow:auto">
    <div class="list">
      <div class="list-item" v-for="news in newsList" :key="news.id">
        <router-link :to="path + news.id">
          <el-card class="box-card">
            <el-row :gutter="10">
              <el-col :span="6">
                <div class="el-image">
                  <img class="el-image__inner" v-lazy="news.img_url" />
                </div>
              </el-col>
              <el-col :span="18">
                <p class="content title">{{ news.title }}</p>
                <p class="content summary">{{ news.zhaiyao }}</p>
              </el-col>
            </el-row>
          </el-card>
        </router-link>
      </div>
    </div>
    <base-loading :isLoading="true" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ROUTE_PATH } from "@/global";

export default {
  created() {
    this.getNewsList();
  },
  data: function () {
    return {
      path: `${ROUTE_PATH.HOME_NEWS_ID.split(":")[0]}`,
    };
  },
  computed: mapState({
    newsList: (state) => state.news.newsList,
  }),
  methods: {
    getNewsList() {
      this.$store.dispatch("news/getNewsList");
    },
  },
};
</script>

<style lang="scss" scoped>
.pageBox {
  .box-card {
    height: 2.4rem;
    overflow: hidden;

    .el-card__body {
      padding: 0.2rem;
    }
  }
  .list-item {
    margin: 0.26rem 0;
  }
  .content {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .title {
    height: 0.8rem;
    color: #303133;
    font-size: 0.3rem;
  }
  .summary {
    height: 0.8rem;
    font-size: 0.24rem;
    color: #68696a;
    margin-top: 0.1rem;
  }
}
</style>