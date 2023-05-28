import request from '../request'
import { getToken } from './getToken'
import qs from 'qs'
let token = 0
let noToken = {
  data: {
    data: {
      success: false,
      msg: '没有token！失败！'
    }
  }
}
//新建订单
export const addOrderAPI = (selectedList) => {
  token = getToken()
  if (!token) {
    return noToken
  }
  return request.post(`/addOrder`, { goodsList: selectedList }, { headers: { token } })
}
//查询订单
export const getOrderAPI = (orderId, orderStatus) => {
  token = getToken()
  if (!token) {
    return noToken
  }
  return request.post(`/getOrder`, { orderId, orderStatus }, { headers: { token } })
}
//提交订单
export const submitOrderAPI = (orderId, order) => {
  token = getToken()
  if (!token) {
    return noToken
  }
  return request.post(`/submitOrder`, { orderId, order }, { headers: { token } })
}

//支付订单
export const payOrderAPI = (orderId, order) => {
  token = getToken()
  if (!token) {
    return noToken
  }
  //支付要设置'Content-Type': 'application/x-www-form-urlencoded'，参数改为JSON
  //使用qs更加安全
  return request.post(`/payOrder`, qs.stringify({ orderId, order }), { headers: { token }, 'Content-Type': 'application/x-www-form-urlencoded' })
}

export const payResultsAPI = (orderId, aliOrderId) => {
  token = getToken()
  if (!token) {
    return noToken
  }

  return request.post(`/payResult`, qs.stringify({ orderId, aliOrderId }), { headers: { token }, 'Content-Type': 'application/x-www-form-urlencoded' })
}
