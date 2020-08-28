<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 15:42:37
-->
<template>
  <div class="cmt-container">
    <div v-if="!loading">
      <h3 :style="{color,'font-size':size}">发表评论</h3>
      <div>
        <textarea placeholder="请输入要评论的内容" v-model="msg" />
      </div>
      <div style="height: 0.64rem; line-height: 0.32rem">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-chat-dot-round"
          @click="postComment"
        >提交评论</el-button>
      </div>
    </div>
    <!-- 评论列表 -->
    <div class="cmt-list">
      <base-comment-item
        v-for="(comment,i) in comments"
        :key="i"
        :userName="comment.user_name"
        :time="comment.add_time"
        :content="comment.content"
        :loading="loading"
      />
      <base-loading :isLoading="loading" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { fontColor, fontSize } from "@/global";

export default {
  props: {
    id: String,
    isAll: Boolean,
    loading: Boolean,
  },
  created() {
    this.$store.commit("comment/INIT_COMMENT_DATA");
    this.getMoreComments();
  },
  data: function name(params) {
    return {
      color: fontColor,
      size: fontSize,
    };
  },
  computed: {
    msg: {
      get() {
        return this.$store.state.comment.msg;
      },
      set(newVal) {
        this.$store.commit("comment/SET_MSG", newVal);
      },
    },
    ...mapState({
      comments: (state) => state.comment.comments,
    }),
  },
  methods: {
    getMoreComments() {
      this.$store.dispatch("comment/loadMoreComments", {
        $http: this.$http,
        id: this.id,
        isAll: !!this.isAll,
      });
    },

    postComment() {
      this.$store.dispatch("comment/postNewsComments", {
        $http: this.$http,
        id: this.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cmt-container {
  padding: 0 0.2rem;
  h3 {
    font-size: 0.32rem;
    margin-top: 0.4rem;
  }
  textarea {
    font-size: 0.28rem;
    height: 1.7rem;
    margin: 0;
    width: 99%;
  }
  .cmt-list {
    margin: 0.6rem 0 0.2rem 0;
  }
}
</style>