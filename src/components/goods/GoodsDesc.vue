<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-27 17:30:35
-->
<template>
  <div class="goodsdesc-container">
    <div v-if="!loading">
      <h3>{{ info.title }}</h3>
      <hr />
      <div class="content" v-html="info.content"></div>
    </div>
    <div v-if="loading">
      <my-skeleton width="70vw" height="25px" />
      <my-skeleton width="90vw" />
      <my-skeleton width="90vw" />
      <my-skeleton width="90vw" />
      <my-skeleton width="90vw" />
      <my-skeleton width="90vw" />
      <my-skeleton width="90vw" />
    </div>
  </div>
</template>

<script>
import { ROOT_ASYNC_REQUEST_ACTION } from "@/store/actions";
import { GOODS } from "@/httpConfig/api";
import Skeleton from "../publicComponents/Skeleton";
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: {}, // 图文数据
      loading: false,
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    async getGoodsDesc() {
      this.loading = true;
      const list = await this.$store.dispatch(ROOT_ASYNC_REQUEST_ACTION, {
        url: `${GOODS.DESC}${this.id}`,
      });
      this.loading = false;
      this.info = list[0];
    },
  },
  components: {
    "my-skeleton": Skeleton,
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
