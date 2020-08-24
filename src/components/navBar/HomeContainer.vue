<template>
  <div>
    <my-swiper :swiperImgs="lunbotuList" :isfull="true" />
    <div class="box">
      <div class="grid">
        <div class="cell" v-for="menu in menus" :key="menu.name">
          <router-link :to="menu.routePath">
            <img :src="'/public/images/' + menu.imgName" alt />
            <div :style="{color}">{{menu.name}}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import MySwiper from "../publicComponents/Swiper";
import { fontColor } from "../../global";

export default {
  data() {
    return {
      color: fontColor,
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
    "my-swiper": MySwiper,
  },
};
</script>

<style lang="scss" scoped>
$width: 110px;
$height: 110px;
.box {
  margin: 10px auto;
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: minmax(100px, 1fr);
    // grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-gap: 5px;

    .cell::before {
      content: "";
      padding-bottom: 100%;
      display: block;
    }
    .cell {
      border: 1px solid #e5e4e95c;
      text-align: center;
      padding: 6px;
      line-height: 20px;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
      display: grid;
    }

    .cell::before,
    .cell a {
      grid-area: 1 / 1 / 2 / 3;
    }

    a {
      text-decoration: none;
      width: 100%;
      height: 100%;
    }
    img {
      width: 80px;
      height: 80px;
      object-fit: contain;
    }
  }
}
</style>