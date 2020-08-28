/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-21 22:40:20
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-08-28 15:54:39
 */

import { defauCommentCount, resMsg } from '@/global';
import { ROOT_ASYNC_REQUEST_ACTION } from '../actions';
import { COMMENT_MUTATION } from '../mutations';
import { COMMENT } from "@/httpConfig/api";

// initial state
const state = () => ({
  comments: [],
  msg: "",
  currentPage: 1,
  isFetching: false
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
    commit(COMMENT_MUTATION.SET_COMMENTS_LOADING, true);
    const list = await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: `${COMMENT.COMMENTS}${id}?pageindex=${state.currentPage}` }, { root: true });
    if (list > 0 && list instanceof Array) {
      commit(COMMENT_MUTATION.NEXT_PAGE);
    }
    if (!isAll) {
      list.slice(0, defauCommentCount);
    }
    commit(COMMENT_MUTATION.SET_COMMENTS_LOADING, false);
    commit(COMMENT_MUTATION.SET_COMMENTS, list)
  },

  // 提交评论
  async postNewsComments({ commit, dispatch, state }, { id }) {
    if (state.msg.trim().length === 0) {
      resMsg("评论内容不能为空空", "info");
      return;
    }
    const obj = await dispatch(ROOT_ASYNC_REQUEST_ACTION, {
      method: "post",
      param: { content: state.msg, },
      url: `${COMMENT.POST_COMMENT}${id}`
    }, { root: true });
    if (obj.successful) {
      commit(COMMENT_MUTATION.UNSHIFT_COMMENT, {
        user_name: "匿名用户",
        add_time: Date.now(),
        content: state.msg,
      });
    }
  }
}

//mutations
const mutations = {

  [COMMENT_MUTATION.INIT_COMMENT_DATA](state) {
    state.comments = [];
    state.msg = "";
    state.currentPage = 1
  },

  [COMMENT_MUTATION.CLEAR_COMMENT_MSG](state) {
    state.msg = "";
  },

  //首部插入
  [COMMENT_MUTATION.UNSHIFT_COMMENT](state, comment) {
    state.comments.unshift(comment)
  },

  [COMMENT_MUTATION.SET_COMMENTS](state, comments) {
    state.comments = comments.length > 0 ? state.comments.concat(comments) : state.comments
  },

  [COMMENT_MUTATION.SET_MSG](state, msg) {
    state.msg = msg
  },

  [COMMENT_MUTATION.NEXT_PAGE](state) {
    state.currentPage++
  },

  [COMMENT_MUTATION.SET_COMMENTS_LOADING](state, bool) {
    state.isFetching = bool
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}