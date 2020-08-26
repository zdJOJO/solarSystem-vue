<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-26 22:35:54
-->
<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>

    <hr />

    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
import { ROOT_ASYNC_REQUEST_ACTION } from "@/store/actions";
import { GOODS } from "@/httpConfig/api";
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: {}, // 图文数据
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    async getGoodsDesc() {
      const list = await this.$store.dispatch(ROOT_ASYNC_REQUEST_ACTION, {
        url: `${GOODS.DESC}${this.id}`,
      });
      this.info = list[0];
    },
  },
};
</script>

<!--把scoped去掉，不然的话图片显示过大-->
<style lang="scss">
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
