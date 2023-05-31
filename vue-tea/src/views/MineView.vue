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
      <div class="title">个人中心</div>
      <ul>
        <li @click="goAddress">地址管理</li>
        <li>我的订单</li>
        <li>我的收藏</li>
        <li v-if="loginStatus" @click="QUIT">退出登录</li>
      </ul>
      <div class="title">优惠福利</div>
      <ul>
        <li>优惠券</li>
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
  height: 4.2667rem;
  background-color: #b0352f;
  .login {
    background-color: #f6ab32;
    color: #fff;
    border-radius: 0.16rem;
    font-size: 0.4267rem;
    padding: 0.16rem 0.4rem;
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
  .title {
    font-size: 16px;
    color: #aaa;
    padding: 10px 10px;
    border-bottom: 1px solid #ccc;
  }
  ul {
    li {
      padding: 0.32rem;
      font-size: 0.4267rem;
      border-bottom: 1px solid #eee;
      background-color: #fff;
    }
  }
}
</style>
