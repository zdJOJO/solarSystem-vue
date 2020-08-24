/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-21 22:40:20
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-24 20:25:20
 */
import { Toast } from "mint-ui";
import { defauCommentCount } from '../../global';
import { ROOT_ASYNC_REQUEST_ACTION } from '../actions';

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

  // 加载更多评论
  loadMoreComments({ dispatch }, { id, isAll }) {
    dispatch('getNewsComments', { id, isAll })
  },

  // 获取新闻评论 
  async getNewsComments({ commit, dispatch, state }, { id, isAll }) {
    const list = await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: `api/getcomments/${id}?pageindex=${state.currentPage}` }, { root: true });
    if (list > 0 && list instanceof Array) {
      commit('NEXT_PAGE');
    }
    if (!isAll) {
      list.slice(0, defauCommentCount);
    }
    commit('SET_COMMENTS', list)
  },

  // 提交评论
  async postNewsComments({ commit, dispatch, state }, { id }) {
    if (state.msg.trim().length === 0) {
      Toast("评论内容不能为空空");
      return
    }
    const obj = await dispatch(ROOT_ASYNC_REQUEST_ACTION, {
      method: "post",
      param: { content: state.msg, },
      url: `api/postcomment/${id}`
    }, { root: true });
    if (obj.successful) {
      commit('UNSHIFT_COMMENT', {
        user_name: "匿名用户",
        add_time: Date.now(),
        content: state.msg,
      });
    }
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

  //首部插入
  UNSHIFT_COMMENT(state, comment) {
    state.comments.unshift(comment)
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