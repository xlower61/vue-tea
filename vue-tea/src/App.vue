<template>
  <div id="app">
    <!-- 用exclude -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <!-- 老方法简单 -->
    <!-- 要 缓存的路由 -->
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive> -->

    <!-- 不 缓存的路由 -->
    <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
  </div>
</template>
<script>
export default {
  name: 'APP',
  created() {
    this.$store.commit('INIT_USER')
  }
}
</script>

<style></style>
