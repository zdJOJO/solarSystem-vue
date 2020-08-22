<template>
  <div class="newsinfo-container">
    <!-- 头标题 -->
    <h3 class="title">{{ newsInfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsInfo.click }}次</span>
    </p>
    <hr />
    <!-- 内容区域 -->
    <div class="content" v-html="newsInfo.content"></div>
    <!--
            评论区域：  引入评论子组件
            :id为 详情组件向评论子组件传值
    -->
    <comment :id="newsId"></comment>
  </div>
</template>

<script type="text/javascript">
import comment from "../subcomponents/comment";
import { Toast } from "mint-ui";
import { mapState } from "vuex";

export default {
  computed: mapState({
    newsId: (state) => state.news.newsId,
    newsInfo: (state) => state.news.newsItemInfo,
  }),
  methods: {
    setNewsId(id) {
      this.$store.commit("news/SET_NEWS_ID", { id });
    },
  },
  created() {
    this.setNewsId(this.$route.params.id);
    this.$store.commit("comment/INIT_COMMENT_DATA");
    this.$store.dispatch("news/getNewsInfo", {
      $http: this.$http,
      id: this.$route.params.id,
    });
  },

  // 在复用新闻模块组件情况下， 初始化评论模块的数据
  watch: {
    $route(to, from) {
      this.setNewsId(to.params.id);
      this.$store.commit("comment/INIT_COMMENT_DATA");
      this.$store.dispatch("news/getNewsInfo", {
        $http: this.$http,
        id: to.params.id,
      });
      this.$store.dispatch("comment/loadMoreComments", {
        $http: this.$http,
        id: to.params.id,
      });
    },
  },
  components: {
    comment,
  },
};
</script>

<style lang="scss">
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>