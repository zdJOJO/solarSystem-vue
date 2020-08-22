<template>
  <div class="goos-info">
    <!-- 来个小球，实现动画 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball" />
    </transition>

    <!--轮播图区域-->
    <mySwiper :swiperImgs="swiperIsmgs" :isfull="false"></mySwiper>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
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
            <numbox :max="goodsinfo.stock_quantity" @get-count="getChoosedCount" />
          </p>
          <p>
            <mt-button type="primary" size="small" @click="buy">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
            <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
            <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面zhong 中获取到 选中的商品数量值-->
            <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
            <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import mySwiper from "../subcomponents/swiper";
import numbox from "../subcomponents/goodsinfo_numbox";
import { mapState } from "vuex";

export default {
  data() {
    return {
      id: this.$route.params.id,
      ballFlag: false, //小球是否显示
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
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)"; //要实现的动画效果
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
      this.$store.commit("cart/PUSH_TO_CART_LIST", {
        id: this.id,
        count:
          this.choosedCount <= this.goodsinfo.stock_quantity
            ? this.choosedCount
            : this.goodsinfo.stock_quantity,
        price: this.goodsinfo.sell_price,
        selected: true,
      });
    },
  },
  components: {
    mySwiper,
    numbox,
  },
};
</script>

<style lang="scss" scoped>
.goos-info {
  //background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute; //绝对定位
    z-index: 99; //小球显示在上层
    top: 351px;
    left: 151px;
  }

  .mui-card-header {
    height: 44px;
  }
}
</style>