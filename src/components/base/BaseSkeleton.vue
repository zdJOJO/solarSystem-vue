<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-27 11:51:36
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 15:14:46
 * @FilePath: \vue-demo\src\components\publicComponents\BaseSkeleton.vue
-->
<template>
  <div class="skeleton-loading">
    <div class="skeleton-bac-animation" />
    <div
      class="skeleton-row"
      :style="{
        width: 'auto', 
        padding,
        justifyContent: 'flex-start'
      }"
    >
      <div class="skeleton-square-wrap">
        <div
          v-if="type === 'default'"
          class="skeleton-square"
          :style="{
            ...baseStyle,
            width,
            height, 
          }"
        ></div>
        <div
          v-if="type === 'square'"
          class="skeleton-square"
          :style="{
           ...baseStyle,
            width,
            height: width,
          }"
        ></div>
        <div
          v-if="type === 'circle'"
          class="skeleton-square"
          :style="{
            ...baseStyle,
            width,
            height: width,
            borderRadius: '50%'
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-skeleton",
  props: {
    type: {
      type: String,
      default: "default", // default | circle | square
    },
    width: {
      type: String,
      default: "4rem",
    },
    height: {
      type: String,
      default: "0.4rem",
    },
    padding: {
      type: String,
      default: "0.2rem 0.2rem 0 0",
    },
  },
  data: function () {
    return {
      baseStyle: {
        margin: 0,
        backgroundColor: "rgb(239, 239, 239)",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.skeleton-loading {
  font-size: 0.24rem;
  background: #fff;
  position: relative;
  @keyframes backpos {
    from {
      background-position-x: -4rem;
    }
    to {
      background-position-x: calc(4rem + 100%);
    }
  }
  .skeleton-bac-animation {
    position: absolute;
    z-index: auto;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    );
    background-size: 30% 100%;
    background-repeat: no-repeat;
    -webkit-animation: backpos 0.9s ease-in-out 0s infinite;
    animation: backpos 0.9s ease-in-out 0s infinite;
  }
  .skeleton-bac-content {
    overflow: hidden;
  }
}

.skeleton-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.skeleton-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.skeleton-square-wrap {
  justify-content: center;
  display: flex;
  flex-direction: column;
  .skeleton-square {
    width: 100%;
  }
}
</style>