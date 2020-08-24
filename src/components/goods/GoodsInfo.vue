<template>
  <div class="goos-info">
    <!-- 来个小球，实现动画 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div id="ball" v-show="ballFlag" ref="ball" />
    </transition>

    <!--轮播图区域-->
    <my-swiper :swiperImgs="swiperIsmgs" :isfull="false"></my-swiper>

    <!-- 商品购买区域 -->
    <div class="my-card">
      <div class="my-card-header">{{ goodsinfo.title }}</div>
      <div class="my-card-content">
        <div class="my-card-content-inner">
          <p>
            市场价：
            <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <!--
            :max ： 父组件通过 属性 向子组件传值
            @getcount : 子组件通过 调用方法传入数据 向父组件传值
          -->
          <p>
            <span>购买数量：</span>
            <my-input-number :max="goodsinfo.stock_quantity" @get-count="getChoosedCount" />
          </p>
          <p>
            <el-button type="primary" @click="buy">立即购买</el-button>
            <el-button type="danger" @click="addToShopCar">加入购物车</el-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="my-card">
      <div class="my-card-header">商品参数</div>
      <div class="my-card-content">
        <div class="my-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="my-card-footer">
        <el-button type="primary" size="small" plain @click="goDesc(id)">图文介绍</el-button>
        <el-button type="danger" size="small" plain @click="goComment(id)">商品评论</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import MySwiper from "../publicComponents/Swiper";
import MyInputNumber from "../publicComponents/InputNumber";
import { cartBallTrasformTime } from "@/global";
import { mapState } from "vuex";

export default {
  data() {
    return {
      id: this.$route.params.id,
      ballFlag: false, //小球是否显示
      cartBallTrasformTime,
    };
  },
  created() {
    this.$store.dispatch("goods/getGoodsInfo", {
      $http: this.$http,
      id: this.id,
    });
    this.$store.dispatch("goods/getSwiperImgs", {
      $http: this.$http,
      id: this.id,
    });
    this.$store.commit("goods/INIT_GOODS_DATA", {
      paramStr: "choosedCount",
    });
  },
  computed: mapState({
    goodsinfo: (state) => state.goods.goodsItemInfo,
    swiperIsmgs: (state) => state.goods.swiperIsmgs,
    choosedCount: (state) => state.goods.choosedCount,
  }),
  methods: {
    buy() {
      Toast("该功能尚未开发");
    },

    goDesc(id) {
      // 点击使用编程式导航跳转到 图文介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      // 点击跳转到 评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },

    /*
    小球动画优化思路：
      1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
      3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
      4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      5. 如何 获取 徽标和小球的 位置？ domObject.getBoundingClientRect()
    */
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      // el.offsetWidth;
      // 相对于视窗的位置集合
      const ballPosition = this.$refs.ball.getBoundingClientRect();

      // 底部购物车数量小圈的位置集合
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${xDist}px, ${yDist}px)`; //最终要移到的坐标位置
      el.style.transition = `all ${this.cartBallTrasformTime/1000}s cubic-bezier(.4,-0.3,1,.8)`; //要实现的动画效果
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },

    //父组件定义一个方法,子组件调用这个方法传入我们想要的子组件中的数据
    getChoosedCount(count) {
      this.$store.commit("goods/SET_CHOOSED_GOOD_COUNT", { num: count });
    },

    //加入购物车
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      setTimeout(() => {
        this.$store.commit("cart/PUSH_TO_CART_LIST", {
          id: this.id,
          count:
            this.choosedCount <= this.goodsinfo.stock_quantity
              ? this.choosedCount
              : this.goodsinfo.stock_quantity,
          price: this.goodsinfo.sell_price,
          selected: true,
        });
      }, this.cartBallTrasformTime);
    },
  },
  components: {
    "my-swiper": MySwiper,
    "my-input-number": MyInputNumber,
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  font-size: 14px;
  position: relative;
  overflow: hidden;
  margin: 10px;
  border-radius: 2px;
  background-color: #fff;
  background-clip: padding-box;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  .my-card-footer,
  .my-card-header {
    position: relative;
    display: flex;
    min-height: 44px;
    padding: 10px 15px;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    font-size: 17px;
    border-radius: 2px 2px 0 0;
  }
  .my-card-content {
    font-size: 14px;
    position: relative;
  }
  .my-card-content-inner {
    position: relative;
    padding: 15px;
  }
  .my-card-header {
    height: 44px;
  }
  .my-card-footer {
    color: #6d6d72;
    border-radius: 0 0 2px 2px;
  }
}

.goos-info {
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
}
#ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #f56c6c;
  position: absolute; //绝对定位
  z-index: 99; //小球显示在上层
  top: 351px;
  left: 151px;
}
</style>