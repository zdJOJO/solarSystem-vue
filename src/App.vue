<template>
  <div class="app-container">
    <el-container>
      <!-- 顶部区域 -->
      <el-header style="height: 40px">
        <div style="position: relative; width: 100%">
          <el-button v-show="isBack" icon="el-icon-arrow-left" @click="prevWeb" />
          <div class="title">VUE-DEMO</div>
        </div>
      </el-header>

      <!-- 中间的 路由 router-view 区域 -->
      <el-main>
        <transition>
          <router-view />
        </transition>
      </el-main>

      <!-- 底部nav导航区域 -->
      <el-footer style="height: 50px">
        <ul class="navBar">
          <li
            class="navItem"
            v-for="nav in navs"
            :class="[{ isActive: currentPath===nav.routePath  }]"
            :key="nav.name"
            @click="routerPush(nav.routePath)"
          >
            <div class="navName">
              <el-badge
                v-if="nav.routePath ==='/cart'"
                :hidden="cartTotalNum === 0"
                :value="cartTotalNum"
              >
                <i
                  id="badge"
                  :class="[currentPath===nav.routePath ?'el-icon-' + nav.activeIcon : 'el-icon-'+nav.icon]"
                />
              </el-badge>
              <i
                v-if="nav.routePath !=='/cart'"
                :class="[currentPath===nav.routePath ?'el-icon-' + nav.activeIcon : 'el-icon-'+nav.icon]"
              />
            </div>
            <div class="navName">{{nav.name}}</div>
          </li>
        </ul>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { navs, themeColor } from "@/global";

export default {
  data() {
    return {
      themeColor,
      currentPath: this.$router.path,
      navs,
    };
  },
  watch: {
    $route(to, from) {
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
      return this.$store.state.route.path !== "/home";
    },
  }
};
</script>

<style lang="scss" scoped>
/* 全局设置 */
$themeColor: #ffd000;
$fontColor: #303133;
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.28em;
  line-height: 1;
  color: $fontColor;
  scrollbar-width: 0;

  /*
  让各组件显示在 顶部区域 和 底部区域 之间
  overflow-x: hidden 防止顶部和底部区域跟着动画移动
  */
  .app-container {
    padding-top: 40px;
    padding-bottom: 50px;
    background-color: #fff;
  }

  /* 修改 element-ui 组件样式*/
  .el-container {
    .el-button {
      color: #333;
    }

    .el-header {
      padding: 0;
      display: flex;
      line-height: 40px;
      height: 40px;
      text-align: center;
      background: $themeColor;
      top: 0;
      right: 0;
      left: 0;
      position: fixed;
      z-index: 99;

      .el-button {
        background: $themeColor;
        border: none;
        font-size: 1.2rem;
        padding: 7px 10px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      .title {
        width: 100%;
        text-align: center;
      }
    }

    .el-main {
      overflow-x: hidden;
      padding: 0;
    }

    .el-footer {
      position: fixed;
      z-index: 10;
      right: 0;
      left: 0;
      bottom: 0;
      height: 50px;
      padding: 0;
      border-top: 0;
      border-bottom: 0;
      backface-visibility: hidden;

      ul.navBar {
        border-bottom: none;
        border-top: solid 1px #e6e6e6;
        text-align: center;
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;

        li.navItem {
          float: left;
          height: 56px;
          line-height: 56px;
          list-style: none;
          position: relative;
          white-space: nowrap;
          font-size: 14px;
          color: $fontColor;
          padding: 0 20px;
          cursor: pointer;
          transition: border-color 0.3s, background-color 0.3s, color 0.3s;
          box-sizing: border-box;
          border-bottom: none;
          text-align: center;
          background-color: rgb(255, 255, 255);
          width: 25%;
          padding: 3px 0;
          margin: 0;

          .navName {
            height: 22px;
            line-height: 22px;
            i {
              font-size: 23px;
              margin: 0;
            }
          }
        }

        .navItem.isActive {
          color: $themeColor;
        }
      }
    }
  }
}
</style>
