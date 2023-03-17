<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 收货地址组件 -->
    <my-address></my-address>
    
    <!-- 商品列表的标题界面 -->
    <view class="cart-title">
      <!-- 左侧图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 右侧文本 -->
      <text class="cart-title-text">购物车</text>
    </view>

    <!-- 滑动删除 -->
    <uni-swipe-action>
      <!-- 循环渲染购物车中的商品信息 -->
      <block v-for="(item, index) in cart" :key="index">
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHander(item)">
          <my-goods :goods="item" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler" @changeCount="changeCount"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
    <!-- 结算区域 -->
    <my-settle></my-settle>
  </view>
  
  <!-- 空白购物车页面 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也</text>
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
import { mapState, mapMutations } from 'vuex'
import store from '../../store/store'

export default {
  mixins: [badgeMix],
  data() {
    return {
      options: [
        {
          text: '删除', // 显示文本内容
          style: {
            backgroundColor: '#c00000' // 按钮背景颜色
          }
        }
      ]
    }
  },
  methods: {
    // ...mapMutations('m_cart', ['updateGoodsState','changeState', 'changeCount', 'removeGoodsById']),
    // 监听到 radio 事件
    radioChangeHandler(e) {
      // store.commit('m_cart/updateGoodsState', e)
      // 改变选框
      store.commit('m_cart/changeState', e.goods_id)
    },
    // 改变购物车数量
    changeCount(e) {
      store.commit('m_cart/changeCount', e)
      // this.changeCount(e)
    },
    // 滑动删除事件
    swipeActionClickHander(item) {
      store.commit('m_cart/removeGoodsById', item.goods_id)
      // removeGoodsById(item.goods_id)
    }
  },
  computed: {
    ...mapState('m_cart', ['cart'])
  }
}
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;

  .cart-title-text {
    font-size: 14px;
    margin-left: 10px;
  }
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  .empty-img {
    width: 90px;
    height: 90px;
  }
  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
