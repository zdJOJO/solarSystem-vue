<template>
  <div class="shopcar-container pageBox">
    <cart-item
      v-for="goodsinfo in goodslist"
      :key="goodsinfo.id"
      :cart="goodsinfo"
      @change-cartItem-count="(obj)=>{changeCount(obj)}"
      @change-cartItem-check="(obj)=>{changeSelected(obj)}"
      @remove-count="(id)=>{remove(id)}"
    />

    <!-- 结算区域 -->
    <settlement :getGoodsCountAndAmount="getGoodsCountAndAmount" @go-pay="pay" />
  </div>
</template>

<script>
import CartItem from "../cart/CartItem";
import Settlement from "../cart/Settlement";
import { mapState, mapGetters } from "vuex";
import { Toast } from "mint-ui";

export default {
  created() {
    this.$store.dispatch("cart/getGoodsList");
  },
  computed: {
    ...mapState({
      goodslist: (state) => state.cart.items,
    }),
    ...mapGetters({
      getGoodsSelected: "cart/getGoodsSelected",
      getGoodsCount: "cart/getGoodsCount",
      getGoodsCountAndAmount: "cart/getGoodsCountAndAmount",
    }),
  },
  methods: {
    //改变状态
    changeSelected({ id, value }) {
      this.$store.commit("cart/UPDATE_SELECT_STATUS", {
        id,
        status: value,
      });
    },

    //改变了数量
    changeCount({ id, count }) {
      this.$store.commit("cart/CHANGE_COUNT", { id, count });
    },

    remove(id) {
      this.$store.commit("cart/REMOVE_GOOD_FROM_CART", { id });
    },

    pay() {
      Toast({ message: "该功能暂未开发", duration: 1500 });
    },
  },
  components: {
    "cart-item": CartItem,
    settlement: Settlement,
  },
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  margin: 0.2rem 0;
  overflow: hidden;
  
  .el-card{
    margin-bottom: 0.2rem;
  }
  
  .mui-card-content-inner {
    display: flex;
    align-items: center;
    img {
      width: 1.1rem;
    }
    h1 {
      font-size: 0.28rem;
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
    font-size: 0.28rem;
    p {
      margin: 0.04rem;
    }
    .red {
      color: red;
      font-weight: bold;
      font-size: 0.32rem;
    }
    .zongji {
      font-size: 0.32rem;
      font-weight: bold;
    }
  }
}
.mySwitch {
  .mint-switch-input:checked + .mint-switch-core {
    border-color: #ffd000 !important;
    background-color: #ffd000 !important;
  }
}
</style>