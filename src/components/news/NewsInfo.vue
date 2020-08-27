<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-27 21:29:49
 * @FilePath: \vue-demo\src\components\news\NewsInfo.vue
-->
<template>
  <div class="news pageBox">
    <div class="content" v-if="!isLoading">
      <h4 class="title">{{ newsInfo.title }}</h4>
      <!-- 子标题 -->
      <p>
        <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
        <span>点击：{{ newsInfo.click }}次</span>
      </p>
      <hr />
      <article v-html="newsInfo.content"></article>
    </div>
    <div v-if="isLoading">
      <my-skeleton width="70vw" height="0.5rem" />
      <my-skeleton width="55vw" height="0.2rem" />
      <my-skeleton width="90vw" />
      <my-skeleton width="90vw" />
      <my-skeleton width="90vw" />
      <my-skeleton width="90vw" />
      <my-skeleton width="90vw" />
      <my-skeleton width="90vw" />
    </div>

    <!-- 评论区 -->
    <my-comment :id="newsId" :loading="isFetching" />
  </div>
</template>

<script type="text/javascript">
// import { Comment, Skeleton, Loading, CommentItem } from "../publicComponents";
import Skeleton from "../publicComponents/Skeleton";
import Comment from "../publicComponents/Comment";
import { Toast } from "mint-ui";
import { mapState } from "vuex";

export default {
  computed: mapState({
    newsId: (state) => state.news.newsId,
    newsInfo: (state) => state.news.newsItemInfo,
    isLoading: (state) => state.news.isLoading,
    isFetching: (state) => state.comment.isFetching,
  }),
  methods: {
    setNewsId(id) {
      this.$store.commit("news/SET_NEWS_ID", { id });
    },
  },
  created() {
    this.setNewsId(this.$route.params.id);
    this.$store.dispatch("news/getNewsInfo", {
      id: this.$route.params.id,
    });
  },

  // 在复用新闻模块组件情况下， 初始化评论模块的数据
  watch: {
    $route(to, from) {
      this.setNewsId(to.params.id);
      this.$store.commit("comment/INIT_COMMENT_DATA");
      this.$store.dispatch("news/getNewsInfo", {
        id: to.params.id,
      });
      this.$store.dispatch("comment/loadMoreComments", {
        id: to.params.id,
      });
    },
  },
  components: {
    // "my-loading": Loading,
    // "comment-item": CommentItem,
    "my-skeleton": Skeleton,
    "my-comment": Comment,
  },
};
</script>

<style lang="scss">
.news {
  padding: 0.2rem 0;

  h4 {
    line-height: 0.5rem;
  }
  .title {
    font-size: 0.4rem;
  }
  .content {
    font-size: 0.3rem;
  }
  .cmt-container{
    padding: 0 !important;
  }
}
</style>