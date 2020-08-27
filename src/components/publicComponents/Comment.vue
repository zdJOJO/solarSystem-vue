<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-27 17:44:02
-->
<template>
  <div class="cmt-container">
    <div v-if="!loading">
      <h3 :style="{color,'font-size':size}">发表评论</h3>
      <hr />
      <textarea placeholder="请输入要评论的内容" v-model="msg" />
      <el-button type="primary" size="small" icon="el-icon-chat-dot-round" @click="postComment">提交评论</el-button>
    </div>
    <!-- 评论列表 -->
    <div class="cmt-list">
      <comment-item
        v-for="(comment,i) in comments"
        :key="i"
        :userName="comment.user_name"
        :time="comment.add_time"
        :content="comment.content"
        :loading="loading"
      />
      <my-loading :isLoading="loading" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { fontColor, fontSize } from "@/global";
// import { Loading, CommentItem } from "./";
import CommentItem from "./CommentItem";
import Loading from "./Loading";

export default {
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
  props: ["id", "isAll", "loading"], //把父组件传过来的值取值
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
  components: {
    "my-loading": Loading,
    "comment-item": CommentItem,
  },
};
</script>

<style lang="scss" scoped>
.cmt-container {
  padding: 0 10px;
  h3 {
    font-size: 16px;
    margin-top: 20px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
    width: 99%;
  }
  .cmt-list {
    margin: 30px 0 10px 0;
  }
}
</style>