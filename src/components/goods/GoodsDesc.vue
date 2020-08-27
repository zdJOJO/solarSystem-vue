<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-27 21:55:26
-->
<template>
  <div class="goodsdesc-container pageBox">
    <div v-if="!loading">
      <h3>{{ info.title }}</h3>
      <div class="content" v-html="info.content"></div>
    </div>
    <div v-if="loading">
      <my-skeleton width="70vw" height="0.5rem" />
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
  padding: 0.08rem;
  h3 {
    font-size: 0.32rem;
    color: #226aff;
    text-align: center;
    margin: 0.2rem 0;
  }
  .content {
    font-size: 0.3rem;
    img {
      width: 100%;
    }
  }
}
</style>
