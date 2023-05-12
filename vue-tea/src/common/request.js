import axios from 'axios'
const request = axios.create({
  // 请求路径
  baseURL: 'http://localhost:3000/api'
})

export default request
