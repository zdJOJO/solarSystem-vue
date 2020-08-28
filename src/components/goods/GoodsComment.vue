<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 15:33:18
 * @FilePath: \vue-demo\src\components\goods\GoodsComment.vue
-->
<template>
  <div>
    <!--把id属性传过去-->
    <my-comment :id="$route.params.id"></my-comment>
  </div>
</template>

<script>
//导入评论子组件
import Comment from "../comment/Comment";

export default {
  //注册评论子组件进来
  components: {
    "my-comment": Comment,
  },
};
</script>

<style lang="scss" scoped>
</style>
