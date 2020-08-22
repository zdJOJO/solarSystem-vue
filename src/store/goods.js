import { Toast } from "mint-ui";

// initial state
const state = () => ({
  goodsId: '',
  goodsList: [],
  swiperIsmgs: [],
  page: 1,
  goodsItemInfo: {
    id: null,
    title: '',
    click: '',
    img_url: '',
    market_price: '',
    sell_price: '',
    stock_quantity: '',
    zhaiyao: ''
  },
  choosedCount: 1
})

// getters
const getters = {
  //todo
}

// actions
const actions = {

  //获取商品列表
  actionGetGoodsList({ commit, state }, $http) {
    return $http.get(`api/getgoods?pageindex=${state.page}`)
      .then((result) => {
        if (result.body.status === 0) {
          if (result.body.message.length > 0 && result.body.message instanceof Array) {
            commit('NEXT_PAGE');
          }
          return result.body.message
        }
      });
  },

  //获取商品详情信息
  actionGetGoodsInfo({ }, { $http, id }) {
    return $http.get(`api/goods/getinfo/${id}`)
      .then((result) => {
        if (result.body.status === 0 && result.body.message[0].id) {
          return result.body.message[0]
        }
      });
  },

  // 获取轮播图片
  actionGetSwiperImgs({ }, { $http, id }) {
    return $http.get(`api/getthumimages/${id}`)
      .then((result) => {
        if (result.body.status === 0) {
          //但是轮播图组件 需要 img属性
          const array = []
          result.body.message.map((item, index) => {
            array[index] = {
              img: item.src
            }
          });
          return array;
        } else {
          Toast("加载轮播图失败...");
        }
      });
  },


  async getGoodsList({ commit, dispatch }, { $http }) {
    commit('SET_GOODS_LIST', await dispatch('actionGetGoodsList', $http))
  },

  async getGoodsInfo({ commit, dispatch }, { $http, id }) {
    commit('SET_GOODS_INFO', await dispatch('actionGetGoodsInfo', { $http, id }))
  },

  async getSwiperImgs({ commit, dispatch }, { $http, id }) {
    commit('SET_GOODS_SWIPER_IMGS', await dispatch('actionGetSwiperImgs', { $http, id }))
  }



}

//mutations
const mutations = {

  INIT_GOODS_DATA(state, { paramStr }) {
    switch (paramStr) {
      case 'swiperIsmgs':
        state.swiperIsmgs = []
      case 'choosedCount':
        state.choosedCount = 1
      case 'goodsItemInfo':
        state.goodsItemInfo = {
          id: null,
          title: '',
          click: '',
          img_url: '',
          market_price: '',
          sell_price: '',
          stock_quantity: '',
          zhaiyao: ''
        }
      case 'page':
        state.page = 1
      default:
        state.goodsId = '',
          state.goodsList = [],
          state.swiperIsmgs = [],
          state.choosedCount = 1,
          state.page = 1,
          state.goodsItemInfo = {
            id: null,
            title: '',
            click: '',
            img_url: '',
            market_price: '',
            sell_price: '',
            stock_quantity: '',
            zhaiyao: ''
          }
    }

  },

  SET_GOODS_LIST(state, goods) {
    state.goodsList = goods.length > 0 ? state.goodsList.concat(goods) : state.goodsList
  },

  SET_GOODS_INFO(state, info) {
    state.goodsItemInfo = info
  },

  SET_GOODS_SWIPER_IMGS(state, imgs) {
    state.swiperIsmgs = imgs
  },

  SET_CHOOSED_GOOD_COUNT(state, { num }) {
    state.choosedCount = num
  },

  NEXT_PAGE(state) {
    state.page++
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}