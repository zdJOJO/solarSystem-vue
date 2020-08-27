<template>
  <div class="photoinfo-container pageBox">
    <!-- 头标题 -->
    <h3 class="title">{{ photoInfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ photoInfo.add_time | dateFormat }}</span>
      <span>点击：{{ photoInfo.click }}次</span>
    </p>
    <hr />
    <div class="thumbnail">
      <vue-preview :slides="thumbnails" />
    </div>

    <!-- 图片内容区域 -->
    <div class="photoinfo-content" v-html="photoInfo.content"></div>

    <!-- 评论子组件区域 -->
    <!-- 1.3 向评论子组件传值 -->
    <my-comment :id="id"></my-comment>
  </div>
</template>

<script>
import MyComment from "../publicComponents/Comment";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      id: this.$route.params.id, //接受参数：图片id
      photoinfo: {}, //图片详情
      list: [], //图片缩略图数组
    };
  },
  computed: {
    ...mapState({
      photoInfo: (state) => state.photoes.photoInfo,
      thumbnails: (state) => state.photoes.thumbnails,
    }),
  },
  created() {
    this.getPhotoInfo();
    this.getThumbnails();
  },

  // beforeRouteUpdate(to, from, next) {
  //   this.id = to.params.id;
  //   this.getPhotoInfo();
  //   this.getThumbnails();
  // },

  methods: {
    getPhotoInfo() {
      this.$store.dispatch("photoes/getPhotoInfo", { id: this.id });
    },

    getThumbnails() {
      this.$store.dispatch("photoes/getThumbnails", { id: this.id });
    },
  },
  components: {
    "my-comment": MyComment,
  },
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 0 4px;

  .title {
    font-size: 16px;
    margin: 5px 0;
  }
  .subtitle {
    font-size: 13px;
    color: #ffd000;
    display: flex;
    justify-content: space-between;
  }
  .photoinfo-content {
    font-size: 13px;
    line-height: 20px;
  }
  .thumbnail {
    img {
      width: 60px;
      height: 80px;
      margin: 5px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>

<style lang="scss">
.photoinfo-container {
  .thumbnail {
    .my-gallery {
      display: flex;
      flex-wrap: wrap;
    }
    figure {
      width: 60px;
      height: 80px;
      margin: 10px;
      box-shadow: 0 0 8px #999;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>