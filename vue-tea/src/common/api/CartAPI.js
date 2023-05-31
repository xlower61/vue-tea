import request from '../request'
import { getToken } from './getToken'
let token = 0
let noToken = {
  data: {
    data: {
      success: false,
      msg: '没有token！失败！'
    }
  }
}

//得到用户购物车信息
export const getCartAPI = () => {
  token = getToken()
  if (!token) {
    return noToken
  }
  return request.post(`/getCart`, {}, { headers: { token } })
}

//加入购物车
export const addCartAPI = (goodsId) => {
  token = getToken()

  if (!token) {
    return noToken
  }
  return request.post(`/addCart`, { goodsId }, { headers: { token } })
}

//删除商品
export const deleteCartAPI = (cartIdList) => {
  return request.post(`/deleteCart`, { cartIdList })
}

//修改商品数量
export const updateNumAPI = (num, cartId) => {
  return request.post(`/updateNum`, { num, cartId })
}
