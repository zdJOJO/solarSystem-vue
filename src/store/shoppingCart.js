
// initial state
const state = () => ({
  items: JSON.parse(localStorage.getItem('car') || '[]')
})

// getters
const getters = {

  //当点击加入购物车后，购物车数量随之发生变化
  getGoodsCount(state) {
    const c = {};
    state.items.forEach(item => {
      c[item.id] = parseInt(item.count)
    })
    return c;
  },

  //获取购物车中商品是否被选中的状态
  getGoodsSelected(state) {
    const s = {}
    state.items.forEach(item => {
      s[item.id] = item.selected
    })
    return s;
  },

  //计算购物车中的所有商品 总数量和总价
  getGoodsCountAndAmount(state) {
    var o = {
      count: 0,
      amount: 0
    }
    state.items.forEach(item => {
      if (item.selected) {
        o.count += item.count;
        o.amount += item.count * item.price;
      }
    })
    console.log(o)
    return o;
  },

  //获取购物车中的所有商品数量
  cartTotalNum(state) {
    let c = 0;
    state.items.forEach(item => {
      c += item.count
    });
    return c
  }
}

// actions
const actions = {

  //当购物车中的数量发生变化的时候，store中的数量也得改
  updateGoodsInfo(state, goodsInfo) {
    state.items.forEach(item => {
      if (item.id == goodsInfo.id) {
        item.count = parseInt(goodsInfo.count)  //mutations
      }
      localStorage.setItem('car', JSON.stringify(state.items)); //mutations
    })
  },

  //更新开关的状态信息
  updateGoodsSelected(state, selectedinfo) {
    state.items.forEach(item => {
      if (item.id == selectedinfo.id) {
        item.selected = selectedinfo.selected
      }
      localStorage.setItem('car', JSON.stringify(state.items));  //mutations
    })
  },

  //购物车中删除商品
  removeFromCar(state, id) {
    state.items.some((item, i) => {
      if (item.id == id) {
        state.items.splice(i, 1);  //从购物车中删除指定商品  //mutations
        return true;
      }
    });
    localStorage.setItem('car', JSON.stringify(state.items));
  },


  // 获取 购物车列表
  actionGetGoodsList({ state }, { $http }) {
    let idArr = [];
    state.items.forEach((item) => idArr.push(item.id));
    return $http.get(`api/goods/getshopcarlist/${idArr.join(",")}`)
      .then((result) => {
        if (result.body.status === 0) {
          return result.body.message;
        }
      });
  },

  async getGoodsList({ dispatch, commit, state }, { $http }) {
    if (state.items.length > 0) {
      commit('SET_CART_LIST', await dispatch('actionGetGoodsList', { $http }))
    }
  }

}

//mutations
const mutations = {

  // 初始化购物车数据
  INIT_CART(state) {
    state.items = JSON.parse(localStorage.getItem('car') || '[]')
  },

  // 新商品加入到购物车
  PUSH_TO_CART_LIST(state, product) {
    if (state.items.length === 0) {
      state.items.push(product);
    } else {
      let isExits = false;
      // 相同的商品合并，count相加
      state.items.some(item => {
        if (item.id === parseInt(product.id)) {
          item.count += product.count;
          isExits = true;
          return isExits
        }
      })
      // 不相同的商品直接push
      if (!isExits) {
        state.items.push(product)
      }
    }
    localStorage.setItem('car', JSON.stringify(state.items));
  },

  // 获取购物车列表
  SET_CART_LIST(state, list) {
    const temp = [];
    state.items.forEach((item) => {
      list.forEach((i) => {
        if (i.id === item.id) {
          temp.push({
            ...item,
            thumb_path: i["thumb_path"],
            sell_price: i["sell_price"],
            title: i["title"]
          })
        }
      })
    });
    state.items = temp;
    localStorage.setItem('car', JSON.stringify(state.items));
  },

  // 在购物车页面修改商品数目
  CHANGE_COUNT(state, good) {
    state.items.some((item, index) => {
      if (good.id === item.id) {
        state.items[index].count = parseInt(good.count);
        return true;
      }
    })
    localStorage.setItem('car', JSON.stringify(state.items));
  },

  // 删除购物车中的商品
  REMOVE_GOOD_FROM_CART(state, { id }) {
    state.items.some((item, index) => {
      if (id === item.id) {
        state.items.splice(index, 1);
        return true;
      }
    });
    localStorage.setItem('car', JSON.stringify(state.items));
  },

  //修改选中
  UPDATE_SELECT_STATUS(state, { id, status }) {
    state.items.some((item, index) => {
      if (id === item.id) {
        state.items[index].selected = status
        return true;
      }
    });
    localStorage.setItem('car', JSON.stringify(state.items));
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}