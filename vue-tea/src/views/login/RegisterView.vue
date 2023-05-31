<template>
  <div class="register container">
    <CommonHeader>
      <template #title> 注册 </template>
    </CommonHeader>
    <section>
      <div class="register-tel">
        <input type="text" placeholder="请输入手机号" pattern="[0-9]{11}" v-model="userTel" />
      </div>
      <div class="register-code">
        <input type="text" placeholder="请输入短信验证码" pattern="[0-9]*" v-model="msgCode" />
        <button :class="isDisable === false ? 'active' : 'noactive'" :disabled="isDisable" @click="getShortCode">{{ btn }}</button>
      </div>
      <div class="register-password">
        <input type="text" placeholder="请设置密码" pattern="[0-9]{11}" v-model="userPassword" />
      </div>
      <div class="register-in" @click="register">注册</div>
      <div class="register-protocol">
        <span>注册即视为同意</span>
        <span class="protocol">《服务协议》</span>
      </div>
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import { getCodeAPI, RegisterAPI } from '@/common/api/loginAPI'
import { mapState } from 'vuex'
export default {
  name: 'RegisterView',
  components: { TabBar, CommonHeader },
  data() {
    return {
      userTel: '',
      userPassword: '',
      //短信验证码
      msgCode: '',
      isDisable: false,
      btn: '发送短信验证码'
    }
  },
  computed: {
    ...mapState({
      loginRules: (state) => state.user.loginRules
    })
  },
  methods: {
    async register() {
      //手机号验证
      if (!this.loginRules.userTel.rule.test(this.userTel)) {
        this.$toast(this.loginRules.userTel.msg)
        return
      }
      //验证码验证
      if (!this.loginRules.msgCode.rule.test(this.msgCode)) {
        this.$toast(this.loginRules.msgCode.msg)
        return
      }
      //密码验证
      if (!this.loginRules.userPassword.rule.test(this.userPassword)) {
        this.$toast(this.loginRules.userPassword.msg)
        return
      }
      let { data: res } = await RegisterAPI(this.userTel, this.msgCode, this.userPassword)
      this.$toast(res.data.msg)
      if (res.data.success) {
        this.$store.commit('PASSWORD_LOGIN', res.data.userinfo)
        this.$router.push('/mine')
      }
    },
    async getShortCode() {
      //手机号验证
      if (!this.loginRules.userTel.rule.test(this.userTel)) {
        this.$toast(this.loginRules.userTel.msg)
        return
      }
      let { data: res } = await getCodeAPI(this.userTel)
      if (res.data.success) {
        console.log(res.data.data)
        this.$toast('验证码发送成功！')
      }
      //禁用按钮
      this.isDisable = true
      //倒计时
      let timer = setInterval(() => {
        --this.waitTime
        this.btn = `重新发送${this.waitTime}`
      }, 1000)
      setTimeout(() => {
        clearInterval(timer)
        this.waitTime = 6
        this.btn = '重新获取验证码'
        this.isDisable = false
      }, 6000)
    }
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
    border: 1.0012px solid #ccc;
    box-sizing: border-box;
    border-radius: 0.16rem;
  }
  .register-tel {
    margin-top: 0.8rem;
    input {
      width: 100%;
    }
  }
  .register-password {
    input {
      width: 100%;
    }
  }
  .register-code {
    display: flex;
    align-items: center;
    input {
      flex: 1;
      margin-right: 0.0267rem;
    }
    button {
      height: 1.1733rem;
      border: 0;
      color: #fff;
      border-radius: 0.16rem;
      box-sizing: border-box;
      font-size: 0.3733rem;
      padding: 0 0.2667rem;
    }
  }
  .register-in {
    background-color: #b0352f;
    line-height: 43.9988px;
    text-align: center;
    color: #fff;
    border-radius: 0.16rem;
  }
  .register-protocol {
    display: flex;
    justify-content: left;
    .protocol {
      color: #b0352f;
      text-decoration: underline;
    }
  }
}
.noactive {
  background-color: #999;
}
.active {
  background-color: #b0352f;
}
</style>
