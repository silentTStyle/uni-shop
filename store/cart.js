export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 购物车数组, 用来存储过无车中每个商品的信息对象
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),

  mutations: {
    // 添加购物车
    addToCart(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }

      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // // 更新购物车中商品的勾选状态
    // updateGoodsState(state, goods) {
    //   // 根据 goods_id 查询购物车中对应的商品信息对象
    //   const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

    //   // 有对应的商品信息对象
    //   if (findResult) {
    //     findResult.goods_state = goods.goods_state
    //     // 持久化存储到本地
    //     this.commit('m_cart/saveToStorage')
    //   }
    // },
    // 改变购物车选中状态
    changeState(state, id) {
      // state.cart.forEach(item => {
      //   if (item.goods_id == id) {
      //     item.goods_state = !item.goods_state
      //     this.commit('m_cart/saveToStorage')
      //   }
      // })
      const findResult = state.cart.find(x => x.goods_id == id)
      if (findResult) {
        findResult.goods_state = !findResult.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    // 改变购物车数量
    changeCount(state, goods) {
      // state.cart.forEach(x => {
      //   if (x.goods_id == goods.goods_id) {
      //     x.goods_count = goods.goods_count
      //     this.commit('m_cart/saveToStorage')
      //   }
      // })
      const findResult = state.cart.find(x => x.goods_id == goods.goods_id)
      if (findResult) {
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },

    // 根据 id 删除商品
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter(x => x.goods_id != goods_id)
      this.commit('m_cart/saveToStorage')
    },

    // 更新所有商品勾选状态
    updateAllGoodsState(state, newState) {
      state.cart.forEach(item => item.goods_state = newState)
      this.commit('m_cart/saveToStorage')
    }
  },

  getters: {
    // 计算购物车总数
    total(state) {
      // let c = 0
      // state.cart.forEach(x => c += x.goods_count)
      // return c

      return state.cart.reduce((total, item) =>
        total += item.goods_count, 0)
    },
    // 已勾选商品的总数
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) =>
        total += item.goods_count, 0)
    },

    // 勾选商品的总价格
    checkedGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) =>
        total += item.goods_count * item.goods_price, 0)
      // return state.cart.filter(x => x.goods_state).forEach(x => console.log(x.goods_price * x.goods_count))
    }
  }
}
