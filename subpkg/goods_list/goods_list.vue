<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods, index) in goodsList" :key="index" @click="gotoDetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        isLoading: false
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      
      this.getGoodsList()
    },
    methods: {
      // 获取商品列表数据
      async getGoodsList(cb) {
        this.isLoading = true
        const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isLoading = false
        cb && cb()
        if(res.meta.status !== 200) return uni.$showMsg()
        
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      
      // 点击商品跳转
      gotoDetail(goods) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      }
    },
    
    // 上拉触底
    onReachBottom() {
      // 判断数据是否加载完毕
      if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
      
      if(this.isLoading == true) return
      // 让页码值自增 + 1
      this.queryObj.pagenum++
      this.getGoodsList()
    },
    // 下拉刷新
    onPullDownRefresh() {
      // 重置数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isLoading = false
      this.goodsList = []
      
      // 重新发起请求
      this.goodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">

</style>
