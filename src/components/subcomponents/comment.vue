<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要评论的内容" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">提交评论</mt-button>

    <!-- 评论列表 -->
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in comments" :key="i">
        <div
          class="cmt-title"
        >第{{ comments.length - i }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
        <div
          class="cmt-body"
        >{{ item.content === 'undefined' ? "用户: " + item.user_name + " 没有评价" : item.content }}</div>
      </div>

      <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    this.getMore();
  },
  props: ["id"], //把父组件传过来的值取值
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
      // msg: (state) => state.comment.msg, // 表单 这样无法实现双向绑定
    }),
  },
  methods: {
    getMore() {
      this.$store.dispatch("comment/loadMoreComments", {
        $http: this.$http,
        id: this.id,
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
  h3 {
    font-size: 16px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 28px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>