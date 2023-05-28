<template>
  <div class="find-next container">
    <!-- 使用插槽 -->
    <CommonHeader>
      <template #title>找回密码</template>
    </CommonHeader>
    <section>
      <div class="login-password">
        <input type="password" placeholder="请输入密码" pattern="[0-9]{11}" v-model="userPassword1" />
      </div>
      <div class="login-password">
        <input type="password" placeholder="请重复输入密码" pattern="[0-9]*" v-model="userPassword2" />
      </div>
      <div class="login-in" @click="resetPassword">确认</div>
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import { Toast } from 'vant'
import { mapState } from 'vuex'
import { resetPasswordAPI } from '@/common/api/loginAPI'
export default {
  name: 'FindNextView',
  components: { CommonHeader, TabBar },
  data() {
    return {
      //用户输入的密码
      userPassword1: '',
      userPassword2: ''
    }
  },
  computed: {
    ...mapState({
      loginRules: (state) => state.user.loginRules
    })
  },
  methods: {
    async resetPassword() {
      //密码验证
      if (!this.loginRules.userPassword.rule.test(this.userPassword1)) {
        Toast(this.loginRules.userPassword.msg)
        return
      }
      if (!this.loginRules.userPassword.rule.test(this.userPassword2)) {
        Toast(this.loginRules.userPassword.msg)
        return
      }
      if (this.userPassword1 !== this.userPassword2) {
        Toast('两次密码输入不一致')
        return
      }
      let { data: res } = await resetPasswordAPI(this.$route.params.userTel, this.userPassword2)
      Toast(res.data.msg)
      if (res.data.success) {
        this.$router.push('/login/password')
      }
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
    width: 334.9987px;
    height: 43.9988px;
    margin: 10.0012px 0;
  }
  input {
    padding: 0 10.0012px;
    line-height: 43.9988px;
    background-color: #fff;
    border: 0.0267rem solid #ccc;
    box-sizing: border-box;
    border-radius: 6px;
  }

  .login-password {
    display: flex;
    align-items: center;
    input {
      flex: 1;
      margin-right: 1.0012px;
    }
    &:first-child {
      margin-top: 30px;
    }
  }
  .login-in {
    background-color: #b0352f;
    line-height: 1.1733rem;
    text-align: center;
    color: #fff;
    border-radius: 6px;
  }
}
</style>
