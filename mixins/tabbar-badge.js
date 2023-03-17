import {
    mapGetters
  } from 'vuex'

  export default {
    methods: {
      setBadge() {
        uni.setTabBarBadge({
          index: 2,
          text: this.total + ''
        })
      }
    },
    computed: {
      ...mapGetters('m_cart', ['total'])
    },
    watch: {
      total(newVal) {
        this.setBadge()
      }
    },
    onShow() {
      this.setBadge()
    }
  }
