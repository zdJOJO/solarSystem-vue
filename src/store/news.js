import { Toast } from "mint-ui";

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
  actionGetNewsList({ }, $http) {
    return $http.get("api/getnewslist")
      .then((result) => {
        if (result.body.status === 0) {
          return result.body.message
        } else {
          // Toast("获取新闻列表失败！");
          console.log("获取新闻列表失败！")
        }
      }).catch((err) => {
        // 全局错误提示
      })
  },

  //获取新闻详情
  actionGetNewsInfo({ }, { $http, id }) {
    return $http.get(`api/getnew/${id}`)
      .then((result) => {
        if (result.body.status === 0 && result.body.message.length > 0) {
          return result.body.message[0];
        } else {
          Toast("获取新闻详情失败");
        }
      });
  },

  async getNewsList({ commit, dispatch }, { $http }) {
    commit('SET_NEWS_LIST', await dispatch('actionGetNewsList', $http))
  },

  async getNewsInfo({ commit, dispatch }, { $http, id }) {
    commit('SET_NEWS_Info', await dispatch('actionGetNewsInfo', { $http, id }))
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