<template>
  <div>
    <div class="goodslist-container pageBox">
      <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
        <el-card :body-style="{ padding: '3px' }">
          <img class="image" v-lazy="item.img_url" />
          <div style="padding: 0.1rem">
            <span class="title">{{item.title}}</span>
          </div>
          <div class="info">
            <p class="price">
              <span class="now">￥{{ item.sell_price }}</span>
              <span class="old">￥{{ item.market_price }}</span>
            </p>
            <p class="sell">
              <span style="color: #F56C6C">热卖中</span>
              <span>剩{{ item.stock_quantity }}件</span>
            </p>
          </div>
        </el-card>
      </div>
    </div>
    <base-load-more @start-load="getMore" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ROUTE_PATH } from "@/global";
export default {
  created() {
    this.getMore();
  },
  computed: mapState({
    goodsList: (state) => state.goods.goodsList,
  }),
  methods: {
    //列表 加载更多
    getMore() {
      this.$store.dispatch("goods/getGoodsList");
    },
    //去商品详情
    goDetail(id) {
      this.$router.push({
        name: ROUTE_PATH.HOME_GODDS_INOF_ID.name,
        params: { id: id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.goodslist-container {
  display: flex;
  flex-wrap: wrap;
  padding: 0.2rem 0.2rem 0 0.2rem;
  justify-content: space-between;

  .goods-item:nth-child(odd) {
    margin-right: 0.1rem;
  }

  .goods-item:nth-child(even) {
    margin-right: 0.1rem;
  }

  .goods-item {
    width: calc(50vw - 0.3rem);
    margin-bottom: 0.2rem;
    box-shadow: 0px 1px 0.1rem 1px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 6rem;

    img {
      width: 100%;
    }

    .el-card {
      box-shadow: none;
      height: 100%;
      line-height: 0.28rem;
    }
    .title {
      font-size: 0.28rem;
      line-height: 0.4rem;
    }

    .info {
      p {
        margin: 0;
        padding: 0.1rem;
      }
      .price {
        // height: 0.6rem;
        // line-height: 0.3rem;
        .now {
          color: #f56c6c;
          font-weight: bold;
          font-size: 0.32rem;
        }
        .old {
          text-decoration: line-through;
          font-size: 0.24rem;
          margin-left: 0.2rem;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 0.26rem;
      }
    }
  }
  .goods-item:last-child {
    clear: both;
  }
}
</style>