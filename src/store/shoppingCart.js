// 每次刚进入网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中把购物车的数据读出来，放到 store 中
let items = JSON.parse(localStorage.getItem('car') || '[]');

// initial state
const state = () => ({
  items
})

// getters
const getters = {

  //当点击加入购物车后，购物车数量随之发生变化
  getGoodsCount(state) {
    var c = {};
    state.items.forEach(item => {
      c[item.id] = parseInt(item.count)
    })
    return c;
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

  //获取购物车中商品是否被选中的状态
  getGoodsSelected(state) {
    var s = {}
    state.items.forEach(item => {
      s[item.id] = item.selected
    })
    return s;
  },

  //获取购物车中的所有商品数量
  cartTotalNum(state) {
    var c = 0;
    state.items.forEach(item => {
      c += item.count
    });
    return c
  }
}

// actions
const actions = {

  //商品详情中加入购物车
  addProductToCart({ state, commit }, goodsInfo) {
    let flag = false;

    //1. 加购物车前，先看购物车有没有这个商品，有的话更新数量
    state.items.forEach(item => {
      if (item.id == goodsInfo.id) {
        item.count += parseInt(goodsInfo.count); //mutations
        flag = true;
      }
    });
    //2. 没有的话，加入购物车
    if (flag == false) {
      state.items.push(goodsInfo);  //mutations
    }

    //3. 当购物车更新完毕后，把购物车存储到本地的localStorage中
    localStorage.setItem('car', JSON.stringify(state.items));
  },

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
  }
}

//mutations
const mutations = {

  // 商品加入到购物车
  pushProductToCart(state, { id }) {
    // state.items.push({
    //   id,
    //   quantity: 1
    // })
  },

  // 增加商品数量
  incrementItemQuantity(state, { id }) {
    // const cartItem = state.items.find(item => item.id === id)
    // cartItem.quantity++
  },

}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}