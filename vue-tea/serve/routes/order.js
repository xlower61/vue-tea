var express = require('express')
var router = express.Router()
let db = require('../db/db.js')
//使用token验证 cnpm install jsonwebtoken
let jwt = require('jsonwebtoken')
//引入支付宝沙箱配置文件
let ali = require('../alipay/ali.js')
let axios = require('axios')
let getTime = require('../token/getToken.js')
let ad = 'http://dabaichuan-corn.natapp1.cc'
// let ad = 'http://127.0.0.1'

let AlipayFormData = require('alipay-sdk/lib/form.js').default

//支付结果页
router.post('/payResult', (req, res) => {
  let token = req.headers.token
  let { tel, exp } = jwt.decode(token)
  if (getTime(exp)) {
    return res.send({ code: 1000, data: { success: false, msg: 'token过期！' } })
  }
  const sqlStr1 = 'select * from userinfo where tel =?'
  db.query(sqlStr1, tel, async (err1, results1) => {
    if (err1) {
      return res.send({ code: 1, data: { success: false, msg: '服务器出现问题！' } })
    }
    //找不到用户
    if (results1.length !== 1) {
      return res.send({ code: 6, data: { success: false, msg: '找不到该用户,token有误！' } })
    }
    //找到用户
    //获取订单号
    let orderId = req.body.orderId
    let aliOrderId = req.body.aliOrderId

    //开始对接支付宝api
    const formData = new AlipayFormData()
    //调用setMethod并传入get
    formData.setMethod('get')
    //查询订单号
    const bizContent = {
      out_trade_no: orderId, //订单号
      trade_no: aliOrderId
    }
    formData.addField('bizContent', bizContent)

    // alipay.trade.query 查询订单号
    const resUrl = await ali.exec('alipay.trade.query', {}, { formData: formData }).catch((error) => console.error('caught error!', error))
    //promise对象抛出的错误要处理，不然就报错卡住了
    //对接成功，返回了查询url，通过axios发送请求查询
    let { data: results2 } = await axios({
      method: 'GET',
      url: resUrl //订单信息url
    })
    let response = results2.alipay_trade_query_response
    //查询成功  result2的data中含有订单信息
    if (response.code === '10000') {
      //有四种状态
      switch (response.trade_status) {
        case 'TRADE_SUCCESS':
          return res.send({
            code: 200,
            data: {
              success: true,
              status: 'TRADE_SUCCESS',
              msg: '交易完成'
            }
          })
        case 'TRADE_FINISHED':
          return res.send({
            code: 200,
            data: {
              success: true,
              status: 'TRADE_FINISHED',
              msg: '交易完成，不可退款'
            }
          })
        case 'WAIT_BUYER_PAY':
          return res.send({
            code: 200,
            data: {
              success: false,
              status: 'WAIT_BUYER_PAY',
              msg: '交易创建，等待买家付款；'
            }
          })
        case 'TRADE_CLOSED':
          return res.send({
            code: 200,
            data: {
              success: false,
              status: 'TRADE_CLOSED',
              msg: '交易关闭或退款成功'
            }
          })
      }
    } else {
      return res.send({
        code: 200,
        data: {
          success: false,
          status: 'Business Failed',
          msg: '业务处理失败,交易不存在'
        }
      })
    }
  })
})

//支付后，后端修改订单状态！
router.post('/paySuccess', (req, res) => {
  let trade_status = req.body.trade_status
  let order_status = 2
  console.log(req.body)
  let { out_trade_no, total_amount, app_id } = req.body
  switch (trade_status) {
    case 'TRADE_SUCCESS':
      order_status = 3
      break
    case 'TRADE_FINISHED':
      order_status = 3
      break
    case 'TRADE_CLOSED':
      order_status = 4
      break
    case 'WAIT_BUYER_PAY':
      break
    default:
      return res.send(fail)
  }
  // 验证 app_id 是否为该商家本身。
  if (app_id !== '2021000122674457') {
    return res.send('fail')
  }
  // 商家需要验证该通知数据中的 out_trade_no 是否为商家系统中创建的订单号。
  const sqlStr1 = 'select * from user_order where order_id=?'
  db.query(sqlStr1, out_trade_no, (err1, results1) => {
    if (err1) {
      return res.send(fail)
    }
    if (results1.length !== 1) {
      return res.send('fail')
    }
    // 判断 total_amount 是否确实为该订单的实际金额（即商户订单创建时的金额）。
    if (!(parseFloat(results1[0].goods_price).toFixed(2) === total_amount)) {
      return res.send('fail')
    }
    if (order_status !== 2) {
      //把订单改成对应状态
      const sqlStr2 = 'update user_order set order_status=? where order_id=?'
      db.query(sqlStr2, [order_status, out_trade_no], (err2, results2) => {
        if (err2) {
          return res.send(fail)
        }
        //修改失败！
        if (results2.affectedRows != 1) {
          return res.send('fail')
        }
        //修改成功！
        return res.send('success')
      })
    }
  })
})

//支付订单
router.post('/payOrder', (req, res) => {
  //对接支付宝沙箱进行支付 https://opendocs.alipay.com/common/02asmu?pathHash=74282dbf
  // 1、登陆支付宝沙箱 https://open.alipay.com/develop/sandbox/app
  // 2、生成密钥
  // 3、下载支付宝开放平台 SDK  npm install alipay-sdk --save
  // 4、配置支付宝沙箱文件
  // 5、跳转页面支付，搜索pageExecute() 方法如何生成 url 链接

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
    //找到用户
    //获取订单号
    let orderId = req.body.orderId
    let price = req.body.order.price
    //当前用户id
    let uid = results1[0].id
    //查找是否存在订单
    const sqlStr2 = 'select * from user_order where order_id=? and uid=?'
    db.query(sqlStr2, [orderId, uid], async (err2, results2) => {
      if (err2) {
        return res.send({ code: 2, data: { success: false, msg: '服务器出现问题！', err2 } })
      }
      //不存在
      if (results2.length != 1) {
        return res.send({ code: 66, data: { success: false, msg: '找不到该用户的订单！' } })
      }

      //开始对接支付宝api
      const formData = new AlipayFormData()
      //调用setMethod并传入get
      formData.setMethod('get')
      let goodsName = []
      req.body.order.goods.forEach((v) => {
        goodsName.push(v.goods_name)
      })
      //支付时信息
      const bizContent = {
        out_trade_no: orderId, //订单号
        product_code: 'FAST_INSTANT_TRADE_PAY', //写死
        total_amount: price, //价格
        subject: goodsName.toString()
      }
      formData.addField('bizContent', bizContent)

      //支付成功或失败的链接
      formData.addField('return_url', ad + '/#payresult')
      formData.addField('notify_url', ad + '/api/paySuccess')
      // alipay.trade.page.pay 电脑网站支付
      const results3 = await ali.exec('alipay.trade.wap.pay', {}, { formData: formData }).catch((error) => console.error('caught error!', error))
      //promise对象抛出的错误要处理，不然就报错卡住了
      //对接成功，支付宝返回的数据

      res.send({
        code: 200,
        data: {
          success: true,
          msg: '支付中',
          paymentUrl: results3
        }
      })
    })
  })
})

//提交订单
router.post('/submitOrder', (req, res) => {
  // 后端接收token, 解密为手机
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
    //找到用户

    //获取订单号
    let orderId = req.body.orderId

    //当前用户id
    let uid = results1[0].id

    //查找是否存在订单
    const sqlStr2 = 'select * from user_order where order_id=? and uid=?'
    db.query(sqlStr2, [orderId, uid], (err2, results2) => {
      if (err2) {
        return res.send({ code: 2, data: { success: false, msg: '服务器出现问题！', err2 } })
      }
      //不存在
      if (results2.length != 1) {
        return res.send({ code: 6, data: { success: false, msg: '找不到该用户的订单！' } })
      }
      //存在
      //先修改订单状态
      const sqlStr3 = 'update user_order set order_status=? where id=?'
      db.query(sqlStr3, [2, results2[0].id], (err3, results3) => {
        if (err3) {
          return res.send({ code: 3, data: { success: false, msg: '服务器出现问题！', err3 } })
        }
        //修改失败
        if (results3.affectedRows != 1) {
          return res.send({ code: 6, data: { success: false, msg: '修改订单状态失败！' } })
        }

        //修改成功
        //删除用户购物车数据
        const sqlStr4 = 'delete from user_cart where id =? '
        req.body.order.goods.forEach((v) => {
          db.query(sqlStr4, v.id, (err4, results4) => {
            if (err4) {
              return res.send({ code: 3, data: { success: false, msg: '服务器出现问题！', err3 } })
            }
            //修改失败
            if (results4.affectedRows != 1) {
              return res.send({ code: 6, data: { success: false, msg: '删除购物车失败！', goodId: v.id } })
            }
          })
        })
        return res.send({ code: 200, data: { success: true, msg: '提交订单成功！' } })
      })
    })
  })
})

//查询订单
router.post('/getOrder', (req, res) => {
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
    //找到用户

    //获取订单号
    let order_id = req.body.orderId

    //获取订单状态
    let order_status = req.body.orderStatus

    //当前用户id
    let uid = results1[0].id
    let sqlStr2 = ''
    //新增订单
    if (order_id) {
      sqlStr2 = `select * from user_order where uid=? and order_id=${order_id} and order_status=?`
    } else {
      sqlStr2 = 'select * from user_order where uid=? and order_status=?'
    }
    db.query(sqlStr2, [uid, order_status], (err2, results2) => {
      if (err2) {
        return res.send({ code: 2, data: { success: false, msg: '服务器出现问题！', err2 } })
      }
      //新增失败
      if (results2.length < 1) {
        return res.send({ code: 6, data: { success: false, msg: '找不到该用户的订单！' } })
      }
      return res.send({ code: 200, data: { success: true, msg: '查找订单成功！', orderList: results2 } })
    })
  })
})

//生成一个订单
router.post('/addOrder', (req, res) => {
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
    //找到用户
    //生成订单号order_id，规则：时间戳+6位随机数
    function getNowDate() {
      var d = new Date()
      var year = d.getFullYear()
      var month = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`
      var dates = d.getDate() > 9 ? d.getDate() : `0${d.getDate()}`
      return '' + year + month + dates
    }
    function getNowTime() {
      var d = new Date()
      var h = d.getHours()
      var m = d.getMinutes()
      var s = d.getSeconds()
      h = h < 10 ? '0' + h : h
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      return '' + h + m + s
    }
    let order_id = getNowDate() + getNowTime() + Math.round(Math.random() * 1000000)

    //未支付：1  待支付：2  支付成功：3  支付失败：4
    //商品列表
    let goodsPrice = 0
    let goodsNum = 0
    req.body.goodsList.forEach((v) => {
      goodsPrice += v.goods_num * v.goods_price
      goodsNum += parseInt(v.goods_num)
    })
    //当前用户id
    let uid = results1[0].id
    //新增订单
    const sqlStr2 = 'insert into user_order (uid,order_id,goods_list,goods_price,goods_num,order_status) values (?,?,?,?,?,?)'
    db.query(sqlStr2, [uid, order_id, JSON.stringify(req.body.goodsList), goodsPrice, goodsNum, 1], (err2, results2) => {
      if (err2) {
        return res.send({ code: 2, data: { success: false, msg: '服务器出现问题！', err2 } })
      }
      //新增失败
      if (results2.affectedRows !== 1) {
        return res.send({ code: 6, data: { success: false, msg: '找不到该用户,token有误！' } })
      }
      const sqlStr3 = 'select * from user_order where uid=? and order_id=?'
      db.query(sqlStr3, [uid, order_id], (err3, results3) => {
        if (err3) {
          return res.send({ code: 3, data: { success: false, msg: '服务器出现问题！', err2 } })
        }
        //找不到用户
        if (results3.length < 1) {
          return res.send({ code: 6, data: { success: false, msg: '该用户无订单！' } })
        }
        return res.send({ code: 200, data: { success: true, msg: '新建订单成功！', order_id: results3[0].order_id } })
      })
    })
  })
})

module.exports = router
