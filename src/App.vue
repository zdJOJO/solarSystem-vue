<template>
  <div class="app-container">
    <!-- 顶部区域 -->
    <mt-header fixed title="Vue-Demo">
      <router-link v-show="isBack" to slot="left">
        <mt-button icon="back" @click="prevWeb">返回</mt-button>
      </router-link>
    </mt-header>
    <!-- 中间的 路由 router-view 区域 -->
    <transition>
      <!-- 包裹动画 -->
      <router-view></router-view>
      <!-- 这是放置路由的坑 -->
    </transition>
    <!-- 底部区域 -->
    <nav class="mui-bar mui-bar-tab">
      <div
        :class="currentPath===nav.routePath?'mui-tab-item-nav active':'mui-tab-item-nav' "
        v-for="nav in navs"
        :key="nav.name"
        @click="routerPush(nav.routePath)"
      >
        <span class="mui-icon" v-if="nav.ball">
          <span class="mui-badge" id="badge" v-show="cartTotalNum > 0">{{ cartTotalNum }}</span>
          <img
            v-show="currentPath!==nav.routePath"
            class="navIcon"
            :src="'/public/images/'+ nav.imgName+'.svg'"
          />
          <img
            v-show="currentPath===nav.routePath"
            class="navIcon"
            :src="'/public/images/'+ nav.imgName+'-active.svg'"
          />
        </span>
        <span class="mui-icon" v-if="!nav.ball">
          <img
            v-show="currentPath!==nav.routePath"
            class="navIcon"
            :src="'/public/images/'+ nav.imgName+'.svg'"
          />
          <img
            v-show="currentPath===nav.routePath"
            class="navIcon"
            :src="'/public/images/'+ nav.imgName+'-active.svg'"
          />
        </span>
        <span class="mui-tab-label">{{nav.name}}</span>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      navs: [
        {
          name: "首页",
          imgName: "home",
          routePath: "/home",
        },
        {
          name: "会员",
          imgName: "member",
          routePath: "/member",
        },
        {
          name: "购物车",
          imgName: "cart",
          routePath: "/cart",
          ball: true,
        },
        {
          name: "设置",
          imgName: "setting",
          routePath: "/setting",
        },
      ],
      currentPath: this.$router.path,
    };
  },
  watch: {
    $route(to, from) {
      console.log(to);
      if (to.path.indexOf(this.currentPath) >= 0) {
      }
      this.currentPath = `/${to.path.split("/")[1]}`;
    },
  },
  methods: {
    prevWeb() {
      this.$router.go(-1);
    },
    routerPush(path) {
      this.currentPath = path;
      this.$router.push(path);
    },
  },
  computed: {
    ...mapGetters("cart", {
      cartTotalNum: "cartTotalNum",
    }),
    // 顶部的浏览器是否返回
    isBack() {
      // 如果路由地址不是 /home 就出现返回按钮
      return this.$route.path != "/home";
    },
  },
};
</script>

<style lang="scss" scoped>
/* 全局设置 */
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.28em;
  line-height: 1;
  color: #333;
}

/* 重定义 ui主题 */
.mint-header {
  background-color: #ffd000;
  color: #222;
}

.mui-tab-item-zpj {
  color: #222;
}
.mui-bar-tab {
  .mui-icon {
    top: 4px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .navIcon {
    width: 24px;
    position: absolute;
    top: -22px;
    left: -50%;
    margin-left: -12px;
  }
  .navIcon.active {
    display: block;
  }
  .navIcon.unactive {
    display: none;
  }
  .mui-badge {
    top: -23px;
    left: 13px;
    z-index: 1;
  }
}

.app-container {
  /*
  让各组件显示在 顶部区域 和 底部区域 之间
  overflow-x: hidden 防止顶部和底部区域跟着动画移动
  */
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
  background-color: #fff;
}

.mint-header.is-fixed {
  z-index: 99; //防止图片列表忘上划的时候盖住顶部区域
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.mui-bar-tab {
  .mui-tab-item-nav.active {
    color: #ffd000;
  }
}

.mui-bar-tab .mui-tab-item-nav {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #222;
}

.mui-bar-tab .mui-tab-item-nav .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
