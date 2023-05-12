import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 公共css
import '@/assets/css/common.css'
// 适配文件
import '@/assets/js/flexible.js'
// 字体图标css
import '@/assets/css/iconfont.css'

//通过配置自动局部引入vant
//引入vantUI
import { Dialog, Loading, Lazyload } from 'vant'
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import { Tab, Tabs } from 'vant'

// 全局注册
//信息提示框
Vue.use(Dialog)
//加载中提示
Vue.use(Loading)
//懒加载
Vue.use(Lazyload)
//商品底部导航
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
//轮播图
Vue.use(Swipe)
Vue.use(SwipeItem)
//tab标签
Vue.use(Tab)
Vue.use(Tabs)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
