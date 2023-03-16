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
    }
  },

  getters: {
    // 计算购物车总数
    total(state) {
      let c = 0
      state.cart.forEach(x => c += x.goods_count)
      return c
    }
  }
}
