<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <div class="list" v-infinite-scroll="getNewsList" infinite-scroll-disabled="disabled">
      <div class="list-item" v-for="news in newsList" :key="news.id">
        <router-link :to="'/home/newsinfo/'+news.id">
          <el-card class="box-card">
            <el-row :gutter="10">
              <el-col :span="6">
                <el-image :src="news.img_url" />
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
    <loading isLoading="true" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import loading from "../publicComponents/Loading";

export default {
  created() {
    this.getNewsList();
  },
  computed: mapState({
    newsList: (state) => state.news.newsList,
  }),
  methods: {
    getNewsList() {
      this.$store.dispatch("news/getNewsList", { $http: this.$http });
    },
  },
  components: {
    loading,
  },
};
</script>

<style lang="scss" scoped>
.infinite-list-wrapper {
  .box-card {
    height: 120px;
    overflow: hidden;

    .el-card__body {
      padding: 10px;
    }
  }
  .list-item {
    margin: 10px 7px;
  }
  .content {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .title {
    height: 40px;
    color: #303133;
  }
  .summary {
    height: 40px;
  }
}
</style>