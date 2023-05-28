<template>
  <header>
    <div>
      <i class="iconfont icon-31fanhui1" @click="goBack"></i>
    </div>
    <div>
      <!-- 添加插槽默认使登录 -->
      <span>
        <slot name="title">登录</slot>
      </span>
    </div>
    <div>
      <i class="iconfont icon-home" @click="goHome"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: 'CommonHeader',
  methods: {
    goBack() {
      if (this.$route.path === '/address' && this.$route.query.type !== 'select') {
        this.$router.push('/mine').catch(() => {})
      } else {
        this.$router.back()
      }
    },
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 44px;
  background-color: #b0352f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-weight: 400;
  span {
    font-size: 0.4267rem;
  }
  i {
    font-size: 0.5867rem;
    padding: 0 0.4rem;
  }
}
</style>
