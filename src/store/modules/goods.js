import { ROOT_ASYNC_REQUEST_ACTION } from '../actions';

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
    const list = await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: `api/getgoods?pageindex=${state.page}` }, { root: true });
    if (list.length > 0 && list instanceof Array) {
      commit('NEXT_PAGE');
    }
    commit('SET_GOODS_LIST', list)
  },

  //获取商品详情信息
  async getGoodsInfo({ commit, dispatch }, { id }) {
    const list = await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: `api/goods/getinfo/${id}` }, { root: true });
    commit('SET_GOODS_INFO', list[0])
  },

  // 获取轮播图片
  async getSwiperImgs({ commit, dispatch }, { id }) {
    const list = await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: `api/getthumimages/${id}` }, { root: true });
    const array = [];
    list.map((item, index) => {
      array[index] = {
        img: item.src
      }
    })
    commit('SET_GOODS_SWIPER_IMGS', array);
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