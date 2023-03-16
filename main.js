
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 导入 Vuex
import store from '@/store/store.js'

// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'

uni.$http = $http

// 请求根路径
$http.baseUrl = 'http://api-ugo-web.itheima.net'

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...'
  })
}

// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}

// 封装弹窗
uni.$showMsg = function(msg) {
  uni.showToast({
    title: msg || '数据请求失败',
    duration: 1500,
    icon: 'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif