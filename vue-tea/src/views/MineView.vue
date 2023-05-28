<template>
  <div class="mine container">
    <header>
      <div class="login" @click="goLogin" v-if="!loginStatus">登录/注册</div>
      <div class="logined" v-else>
        <img :src="userInfo.imgURL" alt="" />
        <span>{{ userInfo.nickName }}</span>
      </div>
    </header>
    <section>
      <ul>
        <li @click="goAddress">地址管理</li>
        <li @click="goack">-1</li>
        <li v-if="loginStatus" @click="QUIT">退出登录</li>
      </ul>
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'MineView',
  components: { TabBar },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userinfo,
      loginStatus: (state) => state.user.loginStatus
    })
  },
  methods: {
    goLogin() {
      this.$router.push('/login')
    },
    goAddress() {
      this.$router.push('/address').catch(() => {})
    },
    ...mapMutations(['QUIT']),
    goack() {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 160.0012px;
  background-color: #b0352f;
  .login {
    background-color: #f6ab32;
    color: #fff;
    border-radius: 6px;
    font-size: 16.0013px;
    padding: 6px 15px;
  }
  .logined {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 2.1333rem;
      height: 2.1333rem;
      border-radius: 50%;
    }
    span {
      color: #fff;
      font-size: 0.4533rem;
      padding: 0.32rem 0;
    }
  }
}
section {
  background-color: #f5f5f5;
  ul {
    li {
      padding: 12px;
      font-size: 16.0013px;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
    }
  }
}
</style>
