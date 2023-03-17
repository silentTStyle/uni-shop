<template>
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio" @click="changeAllState">
      <radio color="#c00000" value="" :checked="isFullCheck" />
      <text>全选</text>
    </label>

    <!-- 合计 -->
    <view class="amout-box">
      合计：
      <text class="amout">￥{{checkedGoodsAmount}}</text>
    </view>

    <!-- 结算 -->
    <view class="btn-settle">结算（{{checkedCount}}）</view>
  </view>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
    // 是否全选
    isFullCheck() {
      return this.total === this.checkedCount
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapMutations('m_cart', ['updateAllGoodsState']),
    
    // 改变所有商品的选中状态
    changeAllState() {
      this.updateAllGoodsState(!this.isFullCheck)    }
  }
}
</script>
<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  z-index: 999;

  .radio {
    display: flex;
    align-items: center;
  }
  .amout-box {
    .amout {
      color: #c00000;
      font-weight: bold;
    }
  }

  .btn-settle {
    height: 50px;
    background-color: #c00000;
    color: white;
    line-height: 50px;
    padding: 0 10px;
    min-width: 100px;
    text-align: center;
  }
}
</style>
