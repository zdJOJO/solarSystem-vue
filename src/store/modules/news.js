/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-21 19:41:28
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-27 16:33:57
 * @FilePath: \vue-demo\src\store\modules\news.js
 */

import { ROOT_ASYNC_REQUEST_ACTION } from '../actions';
import { NEWS } from "@/httpConfig/api";
import { NEWS_MUTATION } from '../mutations';

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
  },
  isLoading: false
})

// getters
const getters = {
  //todo
}

// actions
const actions = {

  // 获取新闻列表
  async getNewsList({ commit, dispatch }) {
    commit(NEWS_MUTATION.SET_NEWS_LIST, await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: `${NEWS.GET_NEWS}` }, { root: true }))
  },


  //获取新闻详情
  async getNewsInfo({ commit, dispatch }, { id }) {
    commit(NEWS_MUTATION.SET_NEWS_Info_LOADING, true);
    const list = await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: `${NEWS.NEWS_INFO}${id}` }, { root: true });
    commit(NEWS_MUTATION.SET_NEWS_Info_LOADING, false);
    commit(NEWS_MUTATION.SET_NEWS_Info, list[0])
  }
}

//mutations
const mutations = {

  // 设置newsId
  [NEWS_MUTATION.SET_NEWS_ID](state, { id }) {
    state.newsId = id
  },

  [NEWS_MUTATION.SET_NEWS_LIST](state, newsList) {
    state.newsList = newsList
  },

  [NEWS_MUTATION.SET_NEWS_Info](state, newsInfo) {
    state.newsItemInfo = newsInfo
  },

  [NEWS_MUTATION.SET_NEWS_Info_LOADING](state, bool) {
    state.isLoading = bool
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}