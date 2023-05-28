import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/',
    name: 'Home',

    component: HomeView
  },
  // 分类
  {
    path: '/sort',
    name: 'Sort',
    component: () => import('../views/SortView.vue')
  },
  // 购物车
  {
    path: '/cart',
    name: 'Cart',
    meta: { requiresAuth: true },
    component: () => import('../views/CartView.vue')
  },
  // 我的
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/MineView.vue')
  },
  // 搜索页
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/SearchView.vue'),
    children: [
      { path: '/', name: 'search-home', component: () => import('../views/search/SearchHomeView.vue') },
      { path: 'list', name: 'search-list', component: () => import('../views/search/SearchListView.vue') }
    ]
  },
  // 详情页
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../views/DetailView.vue')
  },
  //登录页
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    children: [
      { path: '/', name: 'tel-login', component: () => import('../views/login/MsgLoginView.vue') },
      { path: 'password', name: 'password-login', component: () => import('../views/login/PwdLoginView.vue') },
      { path: 'register', name: 'Rigister', component: () => import('../views/login/RegisterView.vue') },
      { path: 'findIndex', name: 'find-index', component: () => import('../views/login/FindIndexView.vue') },
      { path: 'findNext', name: 'find-next', component: () => import('../views/login/FindNextView.vue') }
    ]
  },
  //地址页
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/AddressView.vue'),
    children: [
      { path: '/', name: 'address-home', meta: { requiresAuth: true }, component: () => import('../views/address/AddressHomeView.vue') },
      { path: 'addressInfo', name: 'address-info', meta: { requiresAuth: true }, component: () => import('../views/address/AddressInfoView.vue') }
    ]
  },
  //订单页
  {
    path: '/order',
    name: 'Order',
    meta: { requiresAuth: true },
    component: () => import('../views/OrderView.vue')
  },
  //支付结果
  {
    path: '/payresult',
    name: 'PayResult',
    meta: { requiresAuth: true },
    component: () => import('../views/PayResultView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//全局路由守卫
//需要身份认证的页面加上 元信息：meta: { requiresAuth: true }
router.beforeEach((to, from, next) => {
  let userInfo = JSON.parse(localStorage.getItem('teaUserInfo'))
  //当前进入页面是否要验证
  if (to.meta.requiresAuth) {
    if (!userInfo) {
      router.push('/login').catch(() => {})
    }
  }
  next()
})

export default router
