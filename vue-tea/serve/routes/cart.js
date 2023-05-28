var express = require('express')
var router = express.Router()
let db = require('../db/db.js')
//使用token验证 cnpm install jsonwebtoken
let jwt = require('jsonwebtoken')
let getTime = require('../token/getToken.js')

//修改商品数量
router.post('/api/updateNum', (req, res) => {
  //传过来删除的数组
  let cartId = req.body.cartId
  let num = req.body.num
  const sqlStr1 = 'select * from user_cart where id=?'
  db.query(sqlStr1, cartId, (err1, results1) => {
    if (err1) {
      return res.send({ code: 1, data: { success: false, msg: '服务器出现问题！' } })
    }
    if (results1.length !== 1) {
      return res.send({ code: 6, data: { success: false, msg: '没有该商品！' } })
    }
    //查到该商品，就可以修改了
    const sqlStr2 = 'update user_cart set goods_num=? where id=?'
    db.query(sqlStr2, [num, cartId], (err2, results2) => {
      if (err2) {
        return res.send({ code: 1, data: { success: false, msg: '服务器出现问题！' } })
      }
      if (results2.affectedRows !== 1) {
        return res.send({ code: 6, data: { success: false, msg: '修改商品数量失败！' } })
      }
      return res.send({ code: 200, data: { success: true, msg: '修改商品数量成功！' } })
    })
  })
})

//删除购物车数据
router.post('/api/deleteCart', (req, res) => {
  //传过来删除的数组
  let cartIdArr = req.body.cartIdList
  const sqlStr1 = 'delete from user_cart where id=?'
  //循环删除
  for (let i = 0; i < cartIdArr.length; i++) {
    db.query(sqlStr1, cartIdArr[i], (err1, results1) => {
      if (err1) {
        return res.send({ code: 1, data: { success: false, msg: '服务器出现问题！' } })
      }
      if (results1.affectedRows !== 1) {
        return res.send({ code: 6, data: { success: false, msg: '删除购物车商品失败！' } })
      }
    })
  }
  return res.send({ code: 200, data: { success: true, msg: '删除购物车商品成功！' } })
})

//添加购物车数据
router.post('/api/addCart', (req, res) => {
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
      return res.send({ code: 6, data: { success: false, msg: '找不到该用户，添加购物车失败！' } })
    }
    //可以找到用户，获得用户id
    let uid = results1[0].id
    //查询商品
    let goodsId = req.body.goodsId
    const sqlStr2 = 'select * from goods_list where id =?'
    db.query(sqlStr2, goodsId, (err2, results2) => {
      if (err2) {
        return res.send({ code: 2, data: { success: false, msg: '服务器出现问题！' } })
      }
      //找不到商品
      if (results2.length !== 1) {
        return res.send({
          code: 6,
          data: { success: false, msg: '找不到该商品，添加购物车失败！' }
        })
      }
      //可以找到商品，查找是否该用户已经有该记录
      const sqlStr3 = 'select * from user_cart where uid=? and goods_id=?'
      db.query(sqlStr3, [uid, goodsId], (err3, results3) => {
        if (err3) {
          return res.send({ code: 3, data: { success: false, msg: '服务器出现问题！' } })
        }
        //有该记录，就数量加一份，份指的是商品的一份的数量
        if (results3.length === 1) {
          let num = parseInt(results3[0].goods_num) + parseInt(results2[0].num)
          const sqlStr4 = 'update user_cart set goods_num=? where uid=? and goods_id=?'
          db.query(sqlStr4, [num, uid, goodsId], (err4, results4) => {
            if (err4) {
              return res.send({ code: 5, data: { success: false, msg: '服务器出现问题！' } })
            }
            if (results4.affectedRows !== 1) {
              return res.send({ code: 6, data: { success: false, msg: '数据库新增出现问题！' } })
            }
            return res.send({ code: 200, data: { success: true, msg: '添加购物车成功！' } })
          })
          //没有记录，就插入新增购物车数据
        } else {
          let { name: goods_name, price: goods_price, num: goods_num, imgURL: goods_img } = results2[0]
          const sqlStr5 = 'insert into user_cart (uid,goods_id,goods_name,goods_price,goods_num,goods_imgURL) values (?,?,?,?,?,?)'
          db.query(sqlStr5, [uid, goodsId, goods_name, goods_price, goods_num, goods_img], (err5, results5) => {
            if (err5) {
              return res.send({ code: 5, data: { success: false, msg: '服务器出现问题！' } })
            }
            if (results5.affectedRows !== 1) {
              return res.send({ code: 66, data: { success: false, msg: '数据库新增出现问题！' } })
            }
            return res.send({ code: 200, data: { success: true, msg: '添加购物车成功！' } })
          })
        }
      })
    })
  })
})

//查询购物车数据
router.post('/api/getCart', (req, res) => {
  //后端接收token,解密为手机
  let token = req.headers.token
  let { tel, exp } = jwt.decode(token)
  if (getTime(exp)) {
    console.log(1)
    return res.send({ code: 1000, data: { success: false, msg: 'token过期！' } })
  }
  const sqlStr1 = 'select * from userinfo where tel =?'
  db.query(sqlStr1, tel, (err1, results1) => {
    if (err1) {
      return res.send({ code: 1, data: { success: false, msg: '服务器出现问题！' } })
    }
    //找不到用户
    if (results1.length !== 1) {
      return res.send({ code: 6, data: { success: false, msg: '找不到该用户，添加购物车失败！' } })
    }
    //获得用户id
    let uid = results1[0].id
    const sqlStr2 = 'select * from user_cart where uid=?'
    db.query(sqlStr2, uid, (err2, results2) => {
      if (err2) {
        return res.send({ code: 2, data: { success: false, msg: '服务器出现问题！' } })
      }
      return res.send({ code: 200, data: { success: true, msg: '查找购物车成功！', cartList: results2 } })
    })
  })
})

module.exports = router
