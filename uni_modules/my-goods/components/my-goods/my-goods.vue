<template>
  <view class="goods-item">
    <!-- 商品左侧图片 -->
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler" />
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>

    <!-- 商品右侧信息 -->
    <view class="goods-item-right">
      <!-- 商品标题 -->
      <view class="goods-name">{{ goods.goods_name }}</view>
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">￥{{ goods.goods_price | tofixed }}</view>
        <uni-number-box :min="1" v-model="count" v-if="showNum"></uni-number-box>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    goods: {
      type: Object,
      default: {}
    },
    showRadio: {
      type: Boolean,
      default: false
    },
    showNum: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 默认图片
      defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      count: this.goods.goods_count
    }
  },
  methods: {
    // radio 点击事件
    radioClickHandler() {
      this.$emit('radio-change', {
        // 商品 id
        goods_id: this.goods.goods_id,
        // 商品勾选状态
        goods_state: this.goods.goods_state
      })
    }
    // changeCount() {
    //   this.$nextTick(
    //    () => {
    //      this.$emit('changeCount', {
    //        goods_id: this.goods.goods_id,
    //        goods_count: this.count
    //      })
    //    }
    //   )
    // }
  },
  watch: {
    count: {
      handler(newVal, oldVal) {
        if (newVal != oldVal && Number(newVal) && String(newVal).indexOf('.') === -1) {
          this.$emit('changeCount', {
            goods_id: this.goods.goods_id,
            goods_count: this.count
          })
        }
      }
    }
  },

  filters: {
    tofixed(num) {
      return Number(num).toFixed(2)
    }
  }
}
</script>
<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left {
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }
    .goods-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-price {
        color: #c00000;
        font-size: 16px;
      }
    }
  }
}
</style>
