import { LOGIN, INIT_USER, QUIT } from './mutation-types.js'
export default {
  state: {
    //验证规则
    loginRules: {
      //手机规则
      userTel: {
        rule: /^1[3-9]\d{9}$/,
        msg: '手机号不规范'
      },
      //验证码规则
      msgCode: {
        rule: /^[0-9]{4}$/,
        msg: '验证码错误'
      },
      //密码规则
      userPassword: {
        rule: /^\w{6,12}$/,
        msg: '密码不能为空，且为6-12位字符，包括字母、数字、符号'
      }
    },
    //登陆状态
    loginStatus: false,
    //token
    token: null,
    //用户信息
    userinfo: {}
  },
  getters: {},
  mutations: {
    [LOGIN](state, userinfo) {
      state.loginStatus = true
      state.token = userinfo.token
      state.userinfo = userinfo
      //持久化存储
      localStorage.setItem('teaUserInfo', JSON.stringify(userinfo))
    },
    [INIT_USER](state) {
      let userinfo = JSON.parse(localStorage.getItem('teaUserInfo'))
      if (userinfo) {
        state.loginStatus = true
        state.token = userinfo.token
        state.userinfo = userinfo
      }
    },
    [QUIT](state) {
      localStorage.removeItem('teaUserInfo')
      state.loginStatus = false
      state.token = ''
      state.userinfo = ''
    }
  },
  actions: {},
  modules: {}
}
