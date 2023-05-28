import axios from 'axios'
import { Toast } from 'vant'

const request = axios.create({
  // 请求路径
  baseURL: 'http://localhost:3000/api'
})

request.interceptors.request.use((config) => {
  Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: '加载中...'
  })
  return config
})
request.interceptors.response.use((res) => {
  Toast.clear()
  if (res.data.code == 1000) {
    Toast('token过期了')
    localStorage.removeItem('teaUserInfo')
  }
  return res
})
export default request
