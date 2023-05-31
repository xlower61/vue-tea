<template>
  <div class="login container">
    <!-- 使用插槽 -->
    <CommonHeader></CommonHeader>
    <section>
      <div class="login-tel">
        <input type="text" placeholder="请输入手机号" pattern="[0-9]{11}" v-model="userTel" />
      </div>
      <div class="login-password">
        <input type="password" placeholder="请输入密码" pattern="[0-9]*" v-model="userPassword" />
      </div>
      <div class="login-in" @click="login">登录</div>
      <div class="login-tab">
        <span @click="toCodeLogin">短信登录</span>
        <span @click="toFindIndex">找回密码</span>
        <span @click="toRegister">快速注册</span>
      </div>
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import { Toast } from 'vant'
import { userLoginAPI } from '@/common/api/loginAPI'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PwdLoginView',
  components: { CommonHeader, TabBar },
  data() {
    return {
      //用户输入的手机号和密码
      userTel: '',
      userPassword: ''
    }
  },
  computed: {
    ...mapState({
      loginRules: (state) => state.user.loginRules
    })
  },
  methods: {
    ...mapMutations(['LOGIN']),
    toCodeLogin() {
      this.$router.push('/login')
    },
    toRegister() {
      this.$router.push('/login/register')
    },
    toFindIndex() {
      this.$router.push('/login/findIndex')
    },
    async login() {
      //手机号验证
      if (!this.loginRules.userTel.rule.test(this.userTel)) {
        Toast(this.loginRules.userTel.msg)
        return
      }
      //密码验证
      if (!this.loginRules.userPassword.rule.test(this.userPassword)) {
        Toast(this.loginRules.userPassword.msg)
        return
      }
      let { data: res } = await userLoginAPI(this.userTel, this.userPassword)
      Toast(res.data.msg)
      if (res.data.success) {
        //将用户信息提交给vuex
        this.LOGIN(res.data.userinfo)
        this.$router.push('/mine')
      }
    },
    //回车登录，方便测试
    enterLogin(e) {
      // 回车则执行登录方法 enter键的ASCII是13
      if (e.keyCode === 13) {
        this.login() // 定义的登录方法
      }
    }
  },

  activated() {
    window.addEventListener('keyup', this.enterLogin)
  },
  deactivated() {
    //因为是window监听，所以要在失活时解绑，不然在别的页面也会生效
    window.removeEventListener('keyup', this.enterLogin, false)
  }
}
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  font-size: 0.3733rem;
  div {
    width: 8.9333rem;
    height: 1.1733rem;
    margin: 0.2667rem 0;
  }
  input {
    padding: 0 0.2667rem;
    line-height: 1.1733rem;
    background-color: #fff;
    border: 0.0267rem solid #ccc;
    box-sizing: border-box;
    border-radius: 0.16rem;
  }
  .login-tel {
    margin-top: 0.8rem;
    input {
      width: 100%;
    }
  }
  .login-password {
    display: flex;
    align-items: center;
    input {
      flex: 1;
      margin-right: 1px;
    }
  }
  .login-in {
    background-color: #b0352f;
    line-height: 1.1733rem;
    text-align: center;
    color: #fff;
    border-radius: 0.16rem;
  }
  .login-tab {
    display: flex;
    justify-content: space-between;
  }
}
</style>
