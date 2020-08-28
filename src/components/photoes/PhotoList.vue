<template>
  <div>
    <div class="pgotoTabs">
      <el-tabs :value="`${activeId}`" @tab-click="handleClick">
        <el-tab-pane v-for="ctg in categories" :label="ctg.title" :name="`${ctg.id}`" :key="ctg.id">
          <div class="pageBox">
            <div class="waterBox">
              <div class="waterfall" v-if="currentImgs.length>0">
                <div class="column">
                  <photo-item
                    v-for=" img in getOddImgs"
                    :key="img.id"
                    @click="go(img.id)"
                    :photoItem="img"
                  />
                </div>
                <div class="column">
                  <photo-item
                    v-for=" img in getEvenImgs"
                    :key="img.id"
                    :photoItem="img"
                    classType="right"
                    @click="go(img.id)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-if="currentImgs.length===0" class="null">空空如也</div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { ROUTE_PATH } from "@/global";
import PhotoItem from "./PhotoItem";
export default {
  created() {
    this.getAllCategory();
    this.$store.dispatch("photoes/getImgs", { id: 0 });
  },
  data() {
    return {
      path: `${ROUTE_PATH.HOME_PHOTOE_INFO_ID.split(":")[0]}`,
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.photoes.categories,
      activeId: (state) => state.photoes.currentTabId,
      currentImgs: (state) => state.photoes.currentImgs,
    }),
    ...mapGetters({
      getOddImgs: "photoes/getOddImgs",
      getEvenImgs: "photoes/getEvenImgs",
    }),
  },
  methods: {
    ...mapActions({
      getAllCategory: "photoes/getImgCategory",
    }),
    handleClick(tab, event) {
      if (tab.name === this.activeId) return;
      this.$store.dispatch("photoes/getImgs", { id: parseInt(tab.name) });
    },
    go(id) {
      this.$router.push({
        path: `${this.path}${id}`,
      });
    },
  },
  components: {
    "photo-item": PhotoItem,
  },
};
</script>

<style lang="scss">
.pgotoTabs {
  .el-tabs__header {
    margin: 0 0 10px 0;
    line-height: 0.28rem;
  }
  .el-tabs__item {
    height: 35px;
    line-height: 35px;
    font-size: 13px;
  }
  .el-tabs__item.is-active {
    font-size: 14px;
    font-weight: bold;
  }
}
.el-tab-pane {
  .null {
    width: 100%;
    text-align: center;
  }
  .waterBox {
    width: 100%;
    height: calc(99vh - 130px);
    overflow-y: scroll;
    font-size: 0.28rem;
    .waterfall {
      width: 100%;
      margin: auto;
      display: flex;
      flex-direction: row;
      height: auto;
      .column {
        margin-left: 0;
        display: flex;
        flex-flow: column wrap;
        width: calc(100vw / 2);
        .item {
          box-sizing: border-box;
          .time {
            font-size: 13px;
            color: #999;
          }
          .photoItemBottom {
            margin-top: 5px;
            line-height: 12px;
          }
          .user {
            margin: 8px 0;
            font-size: 13px;
            color: #909399;
            position: relative;
            .el-tag {
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
            }
          }
          .image {
            width: 100%;
            display: block;
          }
        }
        .item.left {
          padding: 0 5px 10px 0;
        }
        .item.right {
          padding: 0 0 10px 5px;
        }
      }
      img {
        width: 100%;
      }
    }
  }
}
</style>