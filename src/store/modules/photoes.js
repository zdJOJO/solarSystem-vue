/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-25 14:13:42
 * @LastEditors: zhangding
 * @LastEditTime: 2020-08-26 23:50:50
 * @FilePath: \vue-demo\src\store\modules\photoes.js
 */

import { ROOT_ASYNC_REQUEST_ACTION } from '../actions';
import { PHOTOES_MUTATION } from '../mutations';
import { PHOTOES } from "@/httpConfig/api"

// initial state
const state = () => ({
  categories: [
    {
      id: 0,
      title: "全部"
    }
  ],
  allImgs: [
    {
      title: "全部",
      id: 0,
      imgs: []
    }
  ],
  currentTabId: 0,
  currentImgs: [],
  photoInfo: {
    add_time: "",
    click: 0,
    content: "",
    id: 0,
    title: "",
  },
  thumbnails: []
})

// getters
const getters = {
  // 已经存在的 img 分类 id
  existedImgCtgsIds: state => {
    return state.allImgs.map(item => item.id)
  },

  // 不请求获取当前 imgList
  getCurrentImgs: state => {
    let temp = state.allImgs.filter((obj) => state.currentTabId === obj.ctgId);
    if (temp.imgs && temp.imgs.length > 0) {
      return temp.imgs;
    } else {
      return [];
    }
  },

  // 奇数 Odd
  getOddImgs: state => state.currentImgs.filter((i, index) => index % 2 === 0),

  // 偶数 even
  getEvenImgs: state => state.currentImgs.filter((i, index) => index % 2 === 1)


}

// actions
const actions = {

  // 获取图片分类
  async getImgCategory({ dispatch, commit }) {
    commit(PHOTOES_MUTATION.SET_IMG_CATEGORIES, await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: PHOTOES.GET_PHOTO_CATEGORIES }, { root: true }))
  },

  // 获取图片列表
  async getImgs({ dispatch, commit, getters, state }, { id }) {
    commit(PHOTOES_MUTATION.SET_TAB_ID, id);
    let imgs = [];
    let isNeedFetch = true;
    let temp = state.allImgs.filter((obj) => state.currentTabId === obj.id);
    if (temp.length > 0 && temp[0].imgs && temp[0].imgs.length > 0) {
      isNeedFetch = false;
    }
    if (!isNeedFetch) {
      imgs = temp[0].imgs;
    } else {
      imgs = await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: `${PHOTOES.GET_PHOTOES}${id}`, isMsg: true }, { root: true })
    }
    commit(PHOTOES_MUTATION.SET_CURRENT_IMGS, { imgs });
    commit(PHOTOES_MUTATION.SET_ALL_IMGS, { imgs, existedImgCtgsIds: getters.existedImgCtgsIds });
  },

  // 获取图片信息
  async getPhotoInfo({ dispatch, commit }, { id }) {
    const info = await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: `${PHOTOES.PHOTO_IMG_INFO}${id}` }, { root: true })
    commit(PHOTOES_MUTATION.SET_PHOTO_INFO, info[0])
  },

  // 获取图片缩略图
  async getThumbnails({ dispatch, commit }, { id }) {
    const imgs = await dispatch(ROOT_ASYNC_REQUEST_ACTION, { url: `${PHOTOES.PHOTO_IMG_SWIPER_IMGS}${id}` }, { root: true });
    let tmp = [];
    imgs.forEach((element, index) => {
      tmp[index] = {
        ...element,
        w: 600,
        h: 400,
        msrc: element.src
      }
    });
    commit(PHOTOES_MUTATION.SET_PHOTO_THUMBNAILS, tmp)
  },

}

//mutations
const mutations = {

  // 所有分类数组
  [PHOTOES_MUTATION.SET_IMG_CATEGORIES](state, list) {
    list.unshift({ title: "全部", id: 0 });
    state.categories = list
  },

  [PHOTOES_MUTATION.SET_CURRENT_IMGS](state, { imgs }) {
    state.currentImgs = imgs;
  },

  // 请求图片列表
  [PHOTOES_MUTATION.SET_ALL_IMGS](state, { imgs, existedImgCtgsIds }) {
    const temp = state.allImgs;
    if (state.currentTabId !== 0) {
      // 不是全部
      let isExisted = true;   // 该种类图片是否第一次请求,  "全部"除外
      temp.forEach(itme => {
        if (existedImgCtgsIds.indexOf(itme.id) < 0) {
          isExisted = false;
        }
      });
      if (!isExisted) {
        // 如果该种类图片第一次请求
        const ctg = state.categories.filter(c => c.id === itme.id)[0];
        temp.push({
          ...ctg,
          imgs
        })
      }
    } else {
      temp[0].imgs = imgs
    }
    state.allImgs = temp;
  },

  [PHOTOES_MUTATION.SET_TAB_ID](state, id) {
    state.currentTabId = id;
  },

  [PHOTOES_MUTATION.SET_PHOTO_INFO](state, info) {
    state.photoInfo = info;
  },

  [PHOTOES_MUTATION.SET_PHOTO_THUMBNAILS](state, imgs) {
    state.thumbnails = imgs;
  }

}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}