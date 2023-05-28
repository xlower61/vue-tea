import request from '../request'
export const userLoginAPI = (tel, pwd) => {
  return request.post(`/userLogin`, {
    userTel: tel,
    userPwd: pwd
  })
}

export const getCodeAPI = (tel) => {
  return request.post(`/getcode`, {
    userTel: tel
  })
}

export const codeLoginAPI = (tel, code) => {
  return request.post(`/codeLogin`, {
    userTel: tel,
    msgCode: code
  })
}

export const RegisterAPI = (tel, code, pwd) => {
  return request.post(`/Register`, {
    userTel: tel,
    msgCode: code,
    userPwd: pwd
  })
}

export const findTelAPI = (tel, code) => {
  return request.post(`/findTel`, {
    userTel: tel,
    msgCode: code
  })
}

export const resetPasswordAPI = (tel, pwd) => {
  return request.post(`/resetPassword`, {
    userTel: tel,
    userPwd: pwd
  })
}
