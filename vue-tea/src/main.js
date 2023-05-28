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
import { Dialog, Lazyload } from 'vant'
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import { Tab, Tabs } from 'vant'
import { Checkbox, CheckboxGroup } from 'vant'
import { Stepper } from 'vant'
import { Toast } from 'vant'
import { Icon } from 'vant'
import { AddressEdit } from 'vant'
import { RadioGroup, Radio } from 'vant'
//引入mintUI
// import { Indicator } from 'mint-ui'
// Vue.use(Indicator)

// 全局注册
//单选
Vue.use(Radio)
Vue.use(RadioGroup)
//地址编辑
Vue.use(AddressEdit)
//图标
Vue.use(Icon)
//轻提示
Vue.use(Toast)
//信息提示框
Vue.use(Dialog)
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
//复选框
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
//步进器
Vue.use(Stepper)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
