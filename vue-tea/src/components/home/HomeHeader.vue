<template>
  <header>
    <h1>
      <img src="@/assets/images/logo.png" alt="" />
    </h1>
    <!-- 可以通过搜索框进入搜索页面 -->
    <div class="search" @click="goSearch">
      <i class="iconfont icon-fangdajing"></i>
      <span>搜您喜欢的</span>
    </div>
    <div class="kefu">
      <i class="iconfont icon-kefu"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HomeHeader',
  methods: {
    goSearch() {
      this.$router.push(
        '/search',
        () => {},
        () => {}
      )
    }
  }
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 1.6rem;
  background-color: #b0352f;
  z-index: 999;
}
header h1 {
  padding-right: 0.2133rem;
  padding-left: 0.16rem;
}
header h1 img {
  width: 1.9rem;
  height: 1.6rem;
  line-height: 1.6rem;
  margin-top: 10px;
  overflow: hidden;
}
.search {
  display: flex;
  align-items: center;
  width: 6.2rem;
  height: 0.8rem;
  background-color: #fff;
  border-radius: 0.32rem;
  margin-right: 10px;
}
.search i {
  padding: 0.2667rem;
  color: #ccc;
}
.search span {
  font-size: 0.3733rem;
  color: #ccc;
}
.kefu i {
  font-size: 0.7467rem;
  color: #fff;
  margin-right: 10px;
}
</style>
