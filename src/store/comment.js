import { Toast } from "mint-ui";
import { defauCommentCount } from '../global';

// initial state
const state = () => ({
  comments: [],
  msg: "",
  currentPage: 1
})

// getters
const getters = {
  //todo
}

// actions
const actions = {

  // 提交评论
  actionPostComment({ commit, state }, { $http, id }) {
    //提交评论
    if (state.msg.trim().length === 0) {
      return Toast("评论内容不能为空空");
    }
    // 提交评论 接口中要求有3个参数
    // 参数1： 请求的URL地址
    // 参数2： 提交给服务器的数据对象 { content: this.msg }
    // 参数3： post定义提交时候，表单中数据的格式  { emulateJSON:true } 一般在main.js中设置为全局，省得每次都手写
    return $http.post(`api/postcomment/${id}`, {
      content: state.msg,
    })
      .then((result) => {
        if (result.body.status === 0) {
          const array = [...state.comments];
          const content = state.msg;
          commit('CLEAR_COMMENT_MSG');
          array.unshift({
            user_name: "匿名用户",
            add_time: Date.now(),
            content,
          });
          return array;
        } else {
          Toast("提交评论失败");
        }
      });
  },

  // 获取新闻评论 
  actionGetNewsComments({ commit, state }, { $http, id, isAll }) {
    return $http.get(`api/getcomments/${id}?pageindex=${state.currentPage}`)
      .then((result) => {
        if (result.body.status === 0) {
          if (result.body.message.length > 0 && result.body.message instanceof Array) {
            commit('NEXT_PAGE');
          }
          if (isAll) {
            return result.body.message;
          } else {
            return result.body.message.slice(0, defauCommentCount);
          }
        } else {
          Toast("获取评论失败");
        }
      });
  },

  // 加载更多评论
  loadMoreComments({ dispatch }, { $http, id, isAll }) {
    dispatch('getNewsComments', { $http, id, isAll })
  },

  async getNewsComments({ commit, dispatch }, obj) {
    commit('SET_COMMENTS', await dispatch('actionGetNewsComments', obj))
  },

  async postNewsComments({ commit, dispatch }, { $http, id }) {
    commit('SET_COMMENTS', await dispatch('actionPostComment', { $http, id }))
  }
}

//mutations
const mutations = {

  INIT_COMMENT_DATA(state) {
    state.comments = [];
    state.msg = "";
    state.currentPage = 1
  },

  CLEAR_COMMENT_MSG(state) {
    state.msg = "";
  },

  SET_COMMENTS(state, comments) {
    state.comments = comments.length > 0 ? state.comments.concat(comments) : state.comments
  },

  SET_MSG(state, msg) {
    state.msg = msg
  },

  NEXT_PAGE(state) {
    state.currentPage++
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}