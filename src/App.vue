<template>
  <div class="app-container">
    <el-container>
      <!-- 顶部区域 -->
      <el-header style="height: 40px">
        <div style="position: relative; width: 100%">
          <el-button v-show="isBack" icon="el-icon-arrow-left" @click="prevWeb" />
          <div class="title">{{headMsg}}</div>
        </div>
      </el-header>

      <!-- 中间的 路由 router-view 区域 -->
      <el-main style="padding: 0 10px">
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
            :class="[{ isActive: firstPath===nav.routePath  }]"
            :key="nav.name"
            @click="routerPush(nav.routePath)"
          >
            <div class="navCell">
              <el-badge
                v-if="nav.routePath ==='/cart'"
                :hidden="cartTotalNum === 0"
                :value="cartTotalNum"
              >
                <i
                  id="badge"
                  :class="[firstPath===nav.routePath ?'el-icon-' + nav.activeIcon : 'el-icon-'+nav.icon]"
                />
              </el-badge>
              <i
                v-if="nav.routePath !=='/cart'"
                :class="[firstPath===nav.routePath ?'el-icon-' + nav.activeIcon : 'el-icon-'+nav.icon]"
              />
            </div>
            <div class="navCell navName">{{nav.name}}</div>
          </li>
        </ul>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { navs, menus, themeColor } from "@/global";

export default {
  data() {
    return {
      themeColor,
      firstPath: this.$router.path,
      currentPath: this.$router.path,
      navs,
    };
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
    headMsg() {
      let msg = "";
      (this.currentPath && this.currentPath.split("/").length === 2
        ? this.navs
        : menus
      ).forEach((element) => {
        if (element.routePath === this.currentPath) {
          msg = element.name;
        }
      });
      return msg;
    },
  },
  watch: {
    $route(to, from) {
      if (to.path.indexOf(this.first) >= 0) {
      }
      this.currentPath = to.path;
      this.firstPath = `/${to.path.split("/")[1]}`;
    },
  },
  methods: {
    prevWeb() {
      this.$router.go(-1);
    },
    routerPush(path) {
      this.firstPath = path;
      this.currentPath = path;
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
/* 全局设置 */
$themeColor: #ffd000;
$fontColor: #303133;
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
      font-size: 15px;
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
    background: #fff;

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
        // transition: color 0.3s;
        transition: all 0.3s;
        transform: scale(0.85);
        box-sizing: border-box;
        border-bottom: none;
        text-align: center;
        background-color: rgb(255, 255, 255);
        width: 25%;
        padding: 3px 0;
        margin: 0;

        .navCell {
          height: 22px;
          line-height: 22px;
          i {
            font-size: 23px;
            margin: 0;
          }
        }
        .navName {
          transform: scale(0.95);
        }
      }

      .navItem.isActive {
        color: $themeColor;
        transform: scale(0.95);
      }
    }
  }
}
</style>
