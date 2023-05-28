<template>
  <div class="find-index container">
    <!-- 使用插槽 -->
    <CommonHeader>
      <template #title>找回密码</template>
    </CommonHeader>
    <section>
      <div class="login-tel">
        <input type="text" placeholder="请输入手机号" pattern="[0-9]{11}" v-model="userTel" />
      </div>
      <div class="login-code">
        <input type="text" placeholder="请输入短信验证码" pattern="[0-9]*" v-model="msgCode" />
        <button :class="isDisable === false ? 'active' : 'noactive'" :disabled="isDisable" @click="getShortCode">{{ btn }}</button>
      </div>
      <div class="login-in" @click="toNext">下一步</div>
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import { getCodeAPI, findTelAPI } from '@/common/api/loginAPI'
import { Toast } from 'vant'
export default {
  name: 'FindIndexView',
  components: { CommonHeader, TabBar },
  data() {
    return {
      //验证规则
      loginRules: {
        //手机规则
        userTel: {
          rule: /^1[3-9]\d{9}$/,
          msg: '手机号不能为空，且为11位数字'
        },
        //验证码规则
        msgCode: {
          rule: /^[0-9]{4}$/,
          msg: '验证码错误'
        }
      },
      //用户输入的手机号
      userTel: '',
      isDisable: false,
      btn: '获取短信验证码',
      waitTime: 6,
      msgCode: ''
    }
  },
  methods: {
    async toNext() {
      if (!this.loginRules.userTel.rule.test(this.userTel)) {
        Toast(this.loginRules.userTel.msg)
        return
      }
      //验证码验证
      if (!this.loginRules.msgCode.rule.test(this.msgCode)) {
        Toast(this.loginRules.msgCode.msg)
        return
      }
      //发送登录请求
      let { data: res } = await findTelAPI(this.userTel, this.msgCode)
      console.log(res)
      if (res.data.success) {
        this.$router.push({
          name: 'find-next',
          params: {
            userTel: this.userTel
          }
        })
      } else {
        Toast(res.data.msg)
      }
    },
    async getShortCode() {
      //1、前端验证
      //手机号验证
      if (!this.loginRules.userTel.rule.test(this.userTel)) {
        Toast(this.loginRules.userTel.msg)
        return
      }
      let { data: res } = await getCodeAPI(this.userTel)
      if (res.data.success) {
        console.log(res.data.data)
        Toast('验证码发送成功！')
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
  font-size: 13.9988px;
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
  .login-tel {
    margin-top: 0.8rem;
    input {
      width: 100%;
    }
  }
  .login-code {
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
      padding: 0 0.5333rem;
    }
  }
  .login-in {
    background-color: #b0352f;
    line-height: 43.9988px;
    text-align: center;
    color: #fff;
    border-radius: 0.16rem;
  }
}
.noactive {
  background-color: #999;
}
.active {
  background-color: #b0352f;
}
</style>
