<template>
  <div>
    <mySwiper :swiperImgs="lunbotuList" :isfull="true" />
    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li
        class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
        v-for="menu in menus"
        :key="menu.name"
      >
        <router-link :to="menu.routePath">
          <img :src="'/public/images/' + menu.imgName" alt />
          <div class="mui-media-body">{{menu.name}}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import mySwiper from "../subcomponents/swiper";

export default {
  data() {
    return {
      menus: [
        {
          name: "新闻资讯",
          routePath: "/home/newslist",
          imgName: "menu1.png",
        },
        {
          name: "商品购买",
          routePath: "/home/goodslist",
          imgName: "menu1.png",
        },
        {
          name: "视频专区",
          routePath: "#",
          imgName: "menu2.png",
        },
        {
          name: "图片分享",
          routePath: "#",
          imgName: "menu3.png",
        },
        {
          name: "留言反馈",
          routePath: "#",
          imgName: "menu4.png",
        },
        {
          name: "联系我们",
          routePath: "#",
          imgName: "menu5.png",
        },
      ],
      lunbotuList: [],
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      //获取轮播图的方法
      this.$http.get("api/getlunbo").then((result) => {
        console.log(result.body);
        if (result.body.status === 0) {
          // 成功了
          this.lunbotuList = result.body.message;
        } else {
          // 失败的
          Toast("加载轮播图失败。。。");
        }
      });
    },
  },
  components: {
    mySwiper,
  },
};
</script>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img {
    width: 60px;
    height: 60px;
  }
  .mui-media-body {
    font-size: 13px;
  }
}

.mui-table-view .mui-grid-view .mui-grid-9 {
  border: 0;
}
</style>