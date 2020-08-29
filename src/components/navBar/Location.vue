<!--
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-20 22:48:51
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-29 13:27:15
 * @FilePath: \vue-demo\src\components\navBar\Location.vue
-->
<template>
  <div class="pageBox">
    <baidu-map
      class="bm-view"
      :ak="ak"
      :center="center"
      :zoom="zoom"
      :map-click="false"
      :scroll-wheel-zoom="true"
      @click="getClickInfo"
      @moving="syncCenterAndZoom"
      @moveend="syncCenterAndZoom"
      @ready="onBaiduMapReady"
      @zoomend="syncCenterAndZoom"
    >
      <bm-view style="width: 100%; height: 100%;" />
      <bm-marker
        :position="{lng: center.lng, lat: center.lat}"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      />
      <bm-control :offset="{width: '10px', height: '10px'}">
        <bm-auto-complete v-model="keyword" :sug-style="{zIndex: 999999}">
          <el-input v-model="keyword" type="text" placeholder="请输入地名关键字" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search" />
          </el-input>
        </bm-auto-complete>
      </bm-control>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" show-address-bar auto-location />
      <bm-local-search :keyword="keyword" :auto-viewport="true" :panel="false" />
    </baidu-map>
  </div>
</template>

<script>
// import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import {
  BaiduMap,
  BmControl,
  BmView,
  BmAutoComplete,
  BmLocalSearch,
  BmMarker,
  BmGeolocation,
} from "vue-baidu-map";
import { baiduMap_AK } from "@/global";
export default {
  components: {
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker,
    BmGeolocation,
  },
  props: {
    // 在子组件中使用 props 选项去接收来自父组件传递过来的数据
    dialogVisible: Boolean,
    mapHeight: {
      type: Number,
      default: 450,
    },
    title: {
      type: String,
      default: "选择目标位置",
    },
    width: {
      type: [Number, String],
      default: "85%",
    },
    height: {
      type: [Number, String],
      default: "80%",
    },
  },
  data() {
    return {
      ak: baiduMap_AK,
      center: { lng: 116.369774, lat: 39.88593 },

      BMap: null, // 地图组件是否就绪
      showMapComponent: this.dialogVisible,
      keyword: "", // 地区搜索的信息
      mapStyle: {
        width: "100%",
        height: this.mapHeight + "px",
      },

      choosedLocation: { province: "", city: "", district: "", addr: "" },
      zoom: 15,
    };
  },
  methods: {
    // ready事件：在你需要二次开发或手动控制其子组件，可以使用在此事件中使用返回的 BMap 类和 map 实例进行手动控制
    onBaiduMapReady({ BMap, map }) {
      console.log("BMap类====", BMap);
      console.log("map实例====", BMap);
      const that = this;
      this.BMap = BMap;
      if (this.BMap) {
        // 获取定位地址信息并赋值给声明变量
        // Geolocation 对象的 getCurrentPosition()、watchPosition()、clearWatch() 方法详解 ：https://blog.csdn.net/zyz00000000/article/details/82774543
        const geolocation = new this.BMap.Geolocation();
        // 通过 getCurrentPosition() 方法：获取当前的位置信息
        geolocation.getCurrentPosition((res) => {
          console.log("返回详细地址和经纬度", res);
          const { lng, lat } = res.point;
          const {
            province,
            city,
            district,
            street,
            street_number,
          } = res.address;

          that.center = { lng, lat };
          that.choosedLocation = {
            province,
            city,
            district,
            addr: street + street_number,
            lng,
            lat,
          };
        });
      }
    },
    /** *
     * 地图点击事件。
     */
    getClickInfo(e) {
      // 调整地图中心位置
      this.center.lng = e.point.lng;
      this.center.lat = e.point.lat;

      // 此时已经可以获取到BMap类
      if (this.BMap) {
        const that = this;
        // Geocoder() 类进行地址解析
        // 创建地址解析器的实例
        const geoCoder = new this.BMap.Geocoder();
        // getLocation() 类--利用坐标获取地址的详细信息
        // getPoint() 类--获取位置对应的坐标
        geoCoder.getLocation(e.point, function (res) {
          console.log("获取经纬度", e.point, "获取详细地址", res);
          const addrComponent = res.addressComponents;
          const surroundingPois = res.surroundingPois;
          const province = addrComponent.province;
          const city = addrComponent.city;
          const district = addrComponent.district;
          let addr = addrComponent.street;
          if (surroundingPois.length > 0 && surroundingPois[0].title) {
            if (addr) {
              addr += `-${surroundingPois[0].title}`;
            } else {
              addr += `${surroundingPois[0].title}`;
            }
          } else {
            addr += addrComponent.streetNumber;
          }
          that.choosedLocation = {
            province,
            city,
            district,
            addr,
            ...that.center,
          };
        });
      }
    },

    syncCenterAndZoom(e) {
      // 返回地图当前的缩放级别
      this.zoom = e.target.getZoom();
    },
    /** *
     * 确认
     */
    confirm: function () {
      this.showMapComponent = false;
      this.$emit("map-confirm", this.choosedLocation);
    },
    /** *
     * 取消
     */
    cancel: function () {
      this.showMapComponent = false;
      this.$emit("cancel", this.showMapComponent);
    },
  },
  watch: {
    dialogVisible: function (currentValue) {
      this.showMapComponent = currentValue;
      if (currentValue) {
        this.keyword = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pageBox {
  width: 100%;
  height: 100%;
  padding: 0;
  font-size: 0.28rem;
  overflow: hidden;
  .bm-view {
    width: 100%;
    height: calc(100vh - 1.8rem);
  }
}
</style>