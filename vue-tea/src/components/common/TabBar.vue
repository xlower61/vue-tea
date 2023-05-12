<template>
  <div class="tabbar">
    <ul>
      <li v-for="(item, index) in routerList" :key="index" @click="switchTab(item.path)">
        <img :src="$route.path == item.path ? item.selected : item.active" alt="" />
        <div :class="{ choosen: $route.path == item.path }">{{ item.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerList: [
        {
          title: '首页',
          path: '/',
          active: './images/home.png',
          selected: './images/home-select.png'
        },
        {
          title: '分类',
          path: '/list',
          active: './images/list.png',
          selected: './images/list-select.png'
        },
        {
          title: '购物车',
          path: '/cart',
          active: './images/cart.png',
          selected: './images/cart-select.png'
        },
        {
          title: '我的',
          path: '/mine',
          active: './images/my.png',
          selected: './images/my-select.png'
        }
      ]
    }
  },
  methods: {
    switchTab(path) {
      // 当前路由则不跳转
      if (this.$router.path == path) {
        return
      }
      this.$router.replace(
        path,
        () => {},
        () => {}
      )
    }
  }
}
</script>

<style scoped>
.tabbar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
}
.tabbar ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
}
.tabbar ul li {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.tabbar ul li img {
  width: 31px;
}
.tabbar ul li div {
  font-size: 16px;
}
.choosen {
  color: red;
}
</style>
