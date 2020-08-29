<template>
  <!-- <div class="app-container" @scroll="handleScroll" :style="{paddingTop}"> -->
  <div class="app-container" @scroll="handleScroll">
    <el-container>
      <!-- 顶部区域 -->
      <el-header :style="headStyle" ref="headNav">
        <div style="position: relative; width: 100%">
          <el-button v-show="isBack" icon="el-icon-arrow-left" @click="prevWeb" />
          <div class="title">{{headMsg}}</div>
        </div>
      </el-header>

      <!-- 中间的 路由 router-view 区域 -->
      <el-main>
        <transition :name="transitionName" mode="out-in">
          <router-view />
        </transition>
      </el-main>

      <!-- 底部nav导航区域 -->
      <el-footer style="height: 1rem">
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
      transitionName: "",
      headStyle: {
        lineHeight: "0.8rem",
        height: "0.8rem",
      },
      // paddingTop: "0px",
    };
  },
  computed: {
    ...mapGetters("cart", {
      cartTotalNum: "cartTotalNum",
    }),
    // 顶部的浏览器是否返回
    isBack() {
      // 如果路由地址不是 / 就出现返回按钮
      return this.$store.state.route.path !== "/";
    },
    isSetting() {
      // 如果路由地址不是 / 就出现返回按钮
      return this.$store.state.route.path === "/member";
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
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }

      // if (to.path.indexOf(this.first) >= 0) {
      // }
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
    handleScroll(event) {
      let top = event.target.scrollTop;
      let opacity = top / 40;
      if (opacity > 1 || top === 0) {
        opacity = 1;
      }
      if (event.target.scrollTop > 40) {
        this.headStyle = {
          top: 0,
          right: 0,
          left: 0,
          position: "fixed",
          zIndex: 99,
          lineHeight: "0.8rem",
          height: "0.8rem",
          opacity,
        };
        // this.paddingTop = "0.8rem";
      } else {
        this.headStyle = {
          position: "relative",
          lineHeight: "0.8rem",
          height: "0.8rem",
          opacity,
        };
        // this.paddingTop = "0px";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* 全局设置 */
$themeColor: #ffd000;
$fontColor: #303133;

// 路由模块 切换特效
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 150ms cubic-bezier(0, 1, 0.5, 1);
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.app-container::-webkit-scrollbar {
  display: none;
}

.app-container {
  height: calc(100% - 1rem);
  overflow-y: scroll;
  padding-bottom: 0.2rem;
  background-color: #fff;

  /* 修改 element-ui 组件样式*/
  .el-container {
    .el-button {
      color: #333;
    }

    //  头部
    .el-header {
      padding: 0;
      display: flex;
      line-height: 0.8rem;
      height: 0.8rem;
      text-align: center;
      background: $themeColor;
      transition: all 0.3s ease;

      .el-button {
        background: $themeColor;
        border: none;
        font-size: 0.5rem;
        padding: 0.14rem 0.2rem;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      .title {
        width: 100%;
        text-align: center;
        font-size: 0.3rem;
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
      height: 1rem;
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
          height: 1.12rem;
          line-height: 1.12rem;
          list-style: none;
          position: relative;
          white-space: nowrap;
          font-size: 0.28rem;
          color: $fontColor;
          padding: 0 0.4rem;
          cursor: pointer;
          // transition: color 0.3s;
          transition: all 0.3s;
          transform: scale(0.85);
          box-sizing: border-box;
          border-bottom: none;
          text-align: center;
          background-color: rgb(255, 255, 255);
          width: 25%;
          padding: 0.06rem 0;
          margin: 0;

          .navCell {
            height: 0.44rem;
            line-height: 0.44rem;
            i {
              font-size: 0.44rem;
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
}
</style>
