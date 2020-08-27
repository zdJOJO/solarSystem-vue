<template>
  <div>
    <div class="goodslist-container pageBox">
      <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
        <el-card :body-style="{ padding: '0px' }">
          <img class="image" v-lazy="item.img_url" />
          <div style="padding: 5px">
            <span class="title">{{item.title}}</span>
          </div>
          <div class="info">
            <p class="price">
              <span class="now">￥{{ item.sell_price }}</span>
              <span class="old">￥{{ item.market_price }}</span>
            </p>
            <p class="sell">
              <span>热卖中</span>
              <span>剩{{ item.stock_quantity }}件</span>
            </p>
          </div>
        </el-card>
      </div>
    </div>
    <loadmore @start-load="getMore" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import loadmore from "../publicComponents/LoadMore";
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
  components: {
    loadmore,
  },
};
</script>

<style lang="scss" scoped>
.goodslist-container {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 10px 0 10px;
  justify-content: space-between;

  .goods-item:nth-child(odd) {
    margin-right: 5px;
  }

  .goods-item:nth-child(even) {
    margin-right: 5px;
  }

  .goods-item {
    width: calc(50vw - 15px);
    margin-bottom: 10px;
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 300px;

    img {
      width: 100%;
    }

    .el-card {
      box-shadow: none;
      height: 100%;
    }
    .title {
      font-size: 14px;
    }

    .info {
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
  .goods-item:last-child {
    clear: both;
  }
}
</style>