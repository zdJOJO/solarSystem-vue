<template>
  <div class="shopcar-container">
    <!-- 商品列表区域 -->
    <div class="mui-card" v-for="(goodsinfo, i) in goodslist" :key="goodsinfo.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-switch
            v-model="getGoodsSelected[goodsinfo.id]"
            @change="selectedChange(goodsinfo.id,getGoodsSelected[goodsinfo.id])"
          ></mt-switch>&nbsp;&nbsp;
          <img :src="goodsinfo.thumb_path" alt />&nbsp;&nbsp;&nbsp;&nbsp;
          <div class="info">
            <h1>{{goodsinfo.title}}</h1>
            <p>
              <span class="price">￥{{ goodsinfo.sell_price }}</span>&nbsp;&nbsp;
              <numbox
                :initCount="getGoodsCount[goodsinfo.id]"
                :goodsid="goodsinfo.id"
                @chang-count="changeCount"
              />&nbsp;&nbsp;
              <a href="#" @click="remove(goodsinfo.id)">删除</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <p>
            <span class="zongji">总计</span>
            <br />以勾选商品&nbsp;
            <span class="red">{{getGoodsCountAndAmount.count}}</span>&nbsp;件&nbsp;
            总价&nbsp;
            <span
              class="red"
            >¥&nbsp;{{getGoodsCountAndAmount.amount}}</span>&nbsp;
          </p>
          <mt-button type="danger" @click="pay">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox";
import { mapState, mapGetters } from "vuex";
import { Toast } from "mint-ui";

export default {
  created() {
    this.$store.dispatch("cart/getGoodsList", { $http: this.$http });
  },
  computed: mapState({
    goodslist: (state) => state.cart.items,
    ...mapGetters({
      getGoodsSelected: "cart/getGoodsSelected",
      getGoodsCount: "cart/getGoodsCount",
      getGoodsCountAndAmount: "cart/getGoodsCountAndAmount",
    }),
  }),
  methods: {
    selectedChange(goodsid, status) {
      this.$store.commit("cart/UPDATE_SELECT_STATUS", {
        id: goodsid,
        status,
      });
    },

    remove(id) {
      this.$store.commit("cart/REMOVE_GOOD_FROM_CART", { id });
    },

    //改变了数量
    changeCount({ id, count }) {
      this.$store.commit("cart/CHANGE_COUNT", { id, count });
    },

    pay() {
      Toast({ message: "该功能暂未开发", duration: 1500 });
    },
  },
  components: {
    numbox,
  },
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  overflow: hidden;
  .mui-card-content-inner {
    display: flex;
    align-items: center;
    img {
      width: 55px;
    }
    h1 {
      font-size: 14px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }

  .jiesuan {
    display: flex; //开启布局
    justify-content: space-between; //布局为两端对齐
    align-items: center; //居中
    font-size: 14px;
    p {
      margin: 2px;
    }
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
    .zongji {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>