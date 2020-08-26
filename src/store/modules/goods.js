import { ROOT_ASYNC_REQUEST_ACTION } from '../actions';
import { GOODS_MUTATION } from '../mutations'
import { GOODS } from "@/httpConfig/api";

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
  async getGoodsList({ commit, dispatch, state }) {
    const list = await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: `${GOODS.GET_GOODS}?pageindex=${state.page}` }, { root: true });
    if (list.length > 0 && list instanceof Array) {
      commit(GOODS_MUTATION.NEXT_PAGE);
    }
    commit(GOODS_MUTATION.SET_GOODS_LIST, list)
  },

  //获取商品详情信息
  async getGoodsInfo({ commit, dispatch }, { id }) {
    const list = await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: `${GOODS.GOOD_INFO}${id}` }, { root: true });
    commit(GOODS_MUTATION.SET_GOODS_INFO, list[0])
  },

  // 获取轮播图片
  async getSwiperImgs({ commit, dispatch }, { id }) {
    const list = await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: `${GOODS.GOOD_SWIPER_IMGS}${id}` }, { root: true });
    const array = [];
    list.map((item, index) => {
      array[index] = {
        img: item.src
      }
    })
    commit(GOODS_MUTATION.SET_GOODS_SWIPER_IMGS, array);
  }
}

//mutations
const mutations = {

  [GOODS_MUTATION.INIT_GOODS_DATA](state, { paramStr }) {
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

  [GOODS_MUTATION.SET_GOODS_LIST](state, goods) {
    state.goodsList = goods.length > 0 ? state.goodsList.concat(goods) : state.goodsList
  },

  [GOODS_MUTATION.SET_GOODS_INFO](state, info) {
    state.goodsItemInfo = info
  },

  [GOODS_MUTATION.SET_GOODS_SWIPER_IMGS](state, imgs) {
    state.swiperIsmgs = imgs
  },

  [GOODS_MUTATION.SET_CHOOSED_GOOD_COUNT](state, { num }) {
    state.choosedCount = num
  },

  [GOODS_MUTATION.NEXT_PAGE](state) {
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