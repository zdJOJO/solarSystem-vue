<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-25 15:20:02
 * @FilePath: \vue-demo\src\components\news\NewsInfo.vue
-->
<template>
  <div class="news">
    <h4 class="title">{{ newsInfo.title }}</h4>
    <!-- 子标题 -->
    <p>
      <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsInfo.click }}次</span>
    </p>
    <hr />
    <article v-html="newsInfo.content"></article>
    <my-comment :id="newsId" />
  </div>
</template>

<script type="text/javascript">
import MyComment from "../publicComponents/Comment";
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
    "my-comment": MyComment,
  },
};
</script>

<style lang="scss">
.news {
  padding: 10px 0;

  h4 {
    line-height: 25px;
  }
}
</style>