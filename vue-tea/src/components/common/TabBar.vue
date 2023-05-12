<template>
  <div class="tabbar">
    <ul>
      <li v-for="(item, index) in routerList" :key="index" :class="{ choosen: $route.path == item.path }" @click="switchTab(item.path)">
        <i :class="item.icon"></i>
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
          icon: 'iconfont icon-shouye'
        },
        {
          title: '分类',
          path: '/sort',
          icon: 'iconfont icon-fenlei'
        },
        {
          title: '购物车',
          path: '/cart',
          icon: 'iconfont icon-gouwuche'
        },
        {
          title: '我的',
          path: '/mine',
          icon: 'iconfont icon-wode'
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
      this.$router.push(
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
.tabbar ul li i {
  display: block;
  font-size: 32px;
}
.tabbar ul li div {
  font-size: 16px;
}
.choosen {
  color: red;
}
</style>
