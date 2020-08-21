<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="news in newsList" :key="news.id">
        <router-link :to="'/home/newsinfo/'+news.id">
          <img class="mui-media-object mui-pull-left" :src="news.img_url" />
          <div class="mui-media-body">
            <h4>{{news.title}}</h4>
            <p class="mui-ellipsis">
              <span>发表时间:{{news.add_time | dateFormat}}</span>
              <span>点击:{{news.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { mapState } from "vuex";

export default {
  created() {
    this.$store.dispatch("news/getNewsList", { $http: this.$http });
  },
  computed: mapState({
    newsList: (state) => state.news.newsList,
  }),
};
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h4 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>