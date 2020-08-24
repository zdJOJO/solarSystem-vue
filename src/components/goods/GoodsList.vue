<template>
  <div>
    <div class="goodslist-container">
      <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
        <el-card :body-style="{ padding: '0px' }">
          <img class="image" :src="item.img_url" />
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
    <!-- <div class="loadMore">
      <el-button type="primary" size="small" icon="el-icon-arrow-down" @click="getMore">往下加载更多</el-button>
    </div>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import loadmore from "../publicComponents/LoadMore";
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
      this.$router.push({ name: "goodsinfo", params: { id: id } });
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
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 300px;

    img {
      width: 100%;
    }

    .el-card {
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