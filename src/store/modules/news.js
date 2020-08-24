
import { ROOT_ASYNC_REQUEST_ACTION } from '../actions';

// initial state
const state = () => ({
  newsId: '',
  newsList: [],
  newsItemInfo: {
    click: 0,
    id: '',
    img_url: '',
    title: '',
    zhaiyao: ''
  }
})

// getters
const getters = {
  //todo
}

// actions
const actions = {

  // 获取新闻列表
  async getNewsList({ commit, dispatch }) {
    commit('SET_NEWS_LIST', await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: "api/getnewslist" }, { root: true }))
  },


  //获取新闻详情
  async getNewsInfo({ commit, dispatch }, { id }) {
    const list = await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: `api/getnew/${id}` }, { root: true });
    commit('SET_NEWS_Info', list[0])
  }
}

//mutations
const mutations = {

  // 设置newsId
  SET_NEWS_ID(state, { id }) {
    state.newsId = id
  },

  SET_NEWS_LIST(state, newsList) {
    state.newsList = newsList
  },

  SET_NEWS_Info(state, newsInfo) {
    state.newsItemInfo = newsInfo
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}