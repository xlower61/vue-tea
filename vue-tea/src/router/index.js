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
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/DetailView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
