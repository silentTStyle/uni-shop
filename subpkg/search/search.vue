<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancel-button="none" :focus="true"></uni-search-bar>
    </view>
    
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResult.length !== 0">
      <view class="sugg-item" v-for="(item, index) in searchResult" :key="index" @click="gotoDetail(item)">
        <view class="goods-name">
          {{item.goods_name}}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" sizz="17" @click="clean"></uni-icons>
      </view>
      <!-- 列表 -->
      <view class="history-list">
        <uni-tag :inverted="true" :text="item" v-for="(item, index) in histories" :key="index" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        // 搜索结果列表
        searchResult: [],
        historyList: ['a', 'app', 'apple']
      };
    },
    methods: {
      // input 输入时间
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e.trim()
          this.getSearchList()
        }, 500)
      },
      
      // 查询列表方法
      async getSearchList() {
        // 判断关键词是否为空
        if(this.kw.length === 0) {
          this.searchResult = []
          return
        }
        const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
        if(res.meta.status !== 200) return uni.$showMsg()
        this.searchResult = res.message
        
        this.saveSearchHistory()
      },
      
      // 搜索结果跳转
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkb/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      
      // 保存搜索历史
      saveSearchHistory() {
        // thi.historyList.push(this.kw)
        
        // 用 Set 对象去重
        const set = new Set(this.historyList)
        // 改变顺序
        set.delete(this.kw)
        set.add(this.kw)
        
        this.historyList = Array.from(set)
        
        // 本地存储
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      
      // 清除历史记录
      clean() {
        this.historyList = []
        uni.setStorageSync('kw', '[]')
      },
      
      // 点击标签跳转
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    },
    computed: {
      histories() {
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    }
  }
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}

.sugg-list {
  padding: 0 5px;
  .sugg-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    .goods-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.history-box {
  padding: 0 5px;
  .history-title {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }
  .history-list {
    display: flex;
    flex-wrap: wrap;
    
    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
