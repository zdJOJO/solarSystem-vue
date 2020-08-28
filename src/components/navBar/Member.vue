<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 23:59:58
 * @FilePath: \vue-demo\src\components\navBar\Member.vue
-->
<template>
  <div>
    <div class="memberInfo">
      <div class="memberInfoBox">
        <div class="headInfo headImg">
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
        </div>
        <div class="headInfo">
          <p class="memberName">再见孙悟空</p>
          <P class="tagBox">
            <span class="memberTag">去认证 ></span>
            <span class="memberTag">成长值 797 ></span>
          </P>
        </div>
      </div>

      <ul class="memberMenuBox">
        <li class="memberMenuIconBox">
          <p>
            <i class="el-icon-star-off" />
          </p>
          <p>收藏</p>
        </li>
        <li class="memberMenuIconBox">
          <p>
            <i class="el-icon-edit" />
          </p>
          <p>评价</p>
        </li>
        <li class="memberMenuIconBox">
          <p>
            <i class="el-icon-magic-stick" />
          </p>
          <p>足迹</p>
        </li>
        <li class="memberMenuIconBox">
          <p>
            <i class="el-icon-bank-card" />
          </p>
          <p>红包卡券</p>
        </li>
      </ul>
    </div>
    <div class="pageBox">
      <div class="informationContainer">
        <div class="orderMenuBox">
          <base-menu-container :memus="menus" :color="color" :fontSize="fontSize" />
        </div>
        <div class="orderMenuBox">
          <base-skeleton width="5rem" />
          <base-skeleton width="4rem" height="0.25rem" />
          <base-skeleton width="5rem" />
          <base-skeleton width="4rem" height="0.25rem" />
        </div>
        <div class="orderMenuBox">
          <base-skeleton width="5rem" />
          <base-skeleton width="4rem" height="0.25rem" />
          <base-skeleton width="5rem" />
          <base-skeleton width="4rem" height="0.25rem" />
        </div>
        <div class="orderMenuBox">
          <base-skeleton width="5rem" />
          <base-skeleton width="4rem" height="0.25rem" />
          <base-skeleton width="5rem" />
          <base-skeleton width="4rem" height="0.25rem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fontColor, memberInfoMenus } from "@/global";
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      color: fontColor,
      fontSize: "0.24rem",
      menus: memberInfoMenus,
    };
  },
};
</script>

<style lang="scss" scoped>
.memberInfo {
  background: #ffd000;
  font-size: 0.28rem;
  height: 3.2rem;

  .memberInfoBox {
    display: inline-block;
    margin-left: 0.2rem;
  }

  .headImg {
    margin: 0 0.3rem 0 0.2rem;
  }

  .headInfo {
    float: left;

    .memberName {
      font-size: 0.34rem;
      margin-bottom: 0.05rem;
      font-weight: bold;
    }

    .tagBox {
      display: inline-flex;
      margin-top: 0.1rem;
      font-size: 0.24rem;
      color: #988636;
      .memberTag {
        border-radius: 0.3rem;
        background: #98863533;
        text-align: center;
        line-height: 0.28rem;
        padding: 0.1rem 0.2rem;
        transform: scale(0.9);
      }

      .memberTag::after {
        content: "";
        display: block;
        clear: both;
      }
    }
  }

  .memberMenuBox {
    padding: 0.35rem 0.02rem;
    .memberMenuIconBox {
      float: left;
      width: 25%;
      text-align: center;
      font-size: 0.58rem;
      font-weight: bold;
      p:last-child {
        font-weight: 500;
        font-size: 0.24rem;
      }
    }
  }
}

.pageBox {
  background: #f1f1f154;
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 0;

  .informationContainer {
    position: absolute;
    width: calc(100vw - 0.3rem);
    top: -0.6rem;
    left: 50%;
    transform: translateX(-50%);
    .orderMenuBox {
      z-index: 2;
      background: #fff;
      border-radius: 9px;
      margin: 0.2rem 0.1rem;
      padding: 0.2rem 0.05rem;
      height: auto;
      display: revert;
    }
  }
}
</style>