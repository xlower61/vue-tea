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
export const deleteAddressAPI = (id) => {
  token = getToken()
  if (!token) {
    return noToken
  }
  return request.post(`/deleteAddress`, { id })
}

export const updateAddressAPI = (addressInfo) => {
  token = getToken()
  if (!token) {
    return noToken
  }
  return request.post(`/updateAddress`, { addressInfo }, { headers: { token } })
}

//保存收获地址信息
export const saveAddressAPI = (addressInfo) => {
  token = getToken()
  if (!token) {
    return noToken
  }
  return request.post(`/saveAddress`, { addressInfo }, { headers: { token } })
}

//保存收获地址信息
export const getAddressAPI = () => {
  token = getToken()
  if (!token) {
    return noToken
  }
  return request.post(`/getAddress`, {}, { headers: { token } })
}
