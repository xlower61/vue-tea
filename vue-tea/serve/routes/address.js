var express = require('express')
var router = express.Router()
let db = require('../db/db.js')
//使用token验证 cnpm install jsonwebtoken
let jwt = require('jsonwebtoken')
let getTime = require('../token/getToken.js')

//删除地址
router.post('/deleteAddress', (req, res) => {
  let id = req.body.id
  const sqlStr1 = 'delete from user_address where id =?'
  db.query(sqlStr1, id, (err1, results1) => {
    if (err1) {
      return res.send({ code: 1, data: { success: false, msg: '服务器出现问题！' } })
    }
    //找不到用户
    if (results1.affectedRows !== 1) {
      return res.send({ code: 6, data: { success: false, msg: '删除地址失败！' } })
    }
    //可以找到用户，获得用户id

    return res.send({ code: 200, data: { success: true, msg: '删除地址成功！' } })
  })
})

//修改后保存地址
router.post('/updateAddress', (req, res) => {
  //后端接收token,解密为手机
  let token = req.headers.token
  let { tel, exp } = jwt.decode(token)
  if (getTime(exp)) {
    return res.send({ code: 1000, data: { success: false, msg: 'token过期！' } })
  }
  const sqlStr1 = 'select * from userinfo where tel =?'
  db.query(sqlStr1, tel, (err1, results1) => {
    if (err1) {
      return res.send({ code: 1, data: { success: false, msg: '服务器出现问题！' } })
    }
    //找不到用户
    if (results1.length !== 1) {
      return res.send({ code: 6, data: { success: false, msg: '找不到该用户,token有误！' } })
    }
    //可以找到用户，获得用户id
    let uid = results1[0].id
    let { id, name, tel, areaCode, province, city, county, addressDetail, isDefault } = req.body.addressInfo
    if (isDefault == 1) {
      //查询是否设置了默认地址
      const sqlStr2 = 'update user_address set isDefault=0 where uid=? and isDefault=1'
      db.query(sqlStr2, uid, (err2, results2) => {
        if (err2) {
          return res.send({ code: 2, data: { success: false, msg: '服务器出现问题！' } })
        }
      })
    }
    const sqlStr3 = 'update user_address set name=?,tel=?,province=?,city=?,county=?,addressDetail=?,areacode=?,isDefault=? where id=?'
    db.query(sqlStr3, [name, tel, province, city, county, addressDetail, areaCode, isDefault, id], (err3, results3) => {
      if (err3) {
        return res.send({ code: 3, data: { success: false, msg: '服务器出现问题！' } })
      }
      //没有添加
      if (results3.affectedRows !== 1) {
        return res.send({ code: 6, data: { success: false, msg: '修改地址失败！' } })
      }
      return res.send({ code: 200, data: { success: true, msg: '修改地址成功！' } })
    })
  })
})

//查询用户保存的地址
router.post('/getAddress', (req, res) => {
  //后端接收token,解密为手机
  let token = req.headers.token
  let { tel, exp } = jwt.decode(token)
  if (getTime(exp)) {
    return res.send({ code: 1000, data: { success: false, msg: 'token过期！' } })
  }
  const sqlStr1 = 'select * from userinfo where tel =?'
  db.query(sqlStr1, tel, (err1, results1) => {
    if (err1) {
      return res.send({ code: 1, data: { success: false, msg: '服务器出现问题！' } })
    }
    //找不到用户
    if (results1.length !== 1) {
      return res.send({ code: 6, data: { success: false, msg: '找不到该用户,token有误！' } })
    }
    //可以找到用户，获得用户id
    let uid = results1[0].id
    const sqlStr2 = 'select * from user_address where uid=?'
    db.query(sqlStr2, uid, (err2, results2) => {
      if (err2) {
        return res.send({ code: 2, data: { success: false, msg: '服务器出现问题！' } })
      }
      return res.send({ code: 200, data: { success: true, msg: '获取地址成功！', addressList: results2, time: { exp } } })
    })
  })
})

//保存地址信息
router.post('/saveAddress', (req, res) => {
  //后端接收token,解密为手机
  let token = req.headers.token
  let { tel, exp } = jwt.decode(token)
  if (getTime(exp)) {
    return res.send({ code: 1000, data: { success: false, msg: 'token过期！' } })
  }
  const sqlStr1 = 'select * from userinfo where tel =?'
  db.query(sqlStr1, tel, (err1, results1) => {
    if (err1) {
      return res.send({ code: 1, data: { success: false, msg: '服务器出现问题！' } })
    }
    //找不到用户
    if (results1.length !== 1) {
      return res.send({ code: 6, data: { success: false, msg: '找不到该用户,token有误！' } })
    }
    //可以找到用户，获得用户id
    let uid = results1[0].id
    let { name, tel, areaCode, province, city, county, addressDetail, isDefault } = req.body.addressInfo
    if (isDefault == 1) {
      //查询是否设置了默认地址
      const sqlStr2 = 'update user_address set isDefault=0 where uid=? and isDefault=1'
      db.query(sqlStr2, uid, (err2, results2) => {
        if (err2) {
          return res.send({ code: 2, data: { success: false, msg: '服务器出现问题！' } })
        }
      })
    }
    const sqlStr3 = 'insert into user_address (uid,name,tel, province, city, county, addressDetail,areaCode, isDefault) values (?,?,?,?,?,?,?,?,?)'
    db.query(sqlStr3, [uid, name, tel, province, city, county, addressDetail, areaCode, isDefault], (err3, results3) => {
      if (err3) {
        return res.send({ code: 3, data: { success: false, msg: '服务器出现问题！' } })
      }
      //没有则添加
      if (results3.affectedRows !== 1) {
        return res.send({ code: 6, data: { success: false, msg: '添加地址失败！' } })
      }
      return res.send({ code: 200, data: { success: true, msg: '添加地址成功！' } })
    })
  })
})
module.exports = router
