import Vue from 'vue'
import Vuex from 'vuex'

// 导入 购物车 Vuex 模块
import moduleCart from '@/store/cart.js'

// 导入 用户 Vuex 模块
import moduleUser from '@/store/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    'm_cart': moduleCart,
    'm_user': moduleUser
  }
})

export default store