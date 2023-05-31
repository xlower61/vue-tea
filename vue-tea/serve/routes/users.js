var express = require('express')
var router = express.Router()
var QcloudSms = require('qcloudsms_js')
let db = require('../db/db.js')
let session = [] //存储验证码
//使用token验证 cnpm install jsonwebtoken
let jwt = require('jsonwebtoken')
//根据用户注册手机创建token
function gettoken(userTel) {
  //用户信息
  let payload = { tel: userTel }
  //口令
  let secrect = 'xiaoluxian'
  //生成token
  let token = jwt.sign(payload, secrect, { expiresIn: '10h' })
  return token
}

//修改密码
router.post('/api/resetPassword', (req, res) => {
  let userTel = req.body.userTel
  let userPwd = req.body.userPwd
  const sqlStr1 = 'update userinfo set pwd=? where tel=?'
  db.query(sqlStr1, [userPwd, userTel], (err1, results1) => {
    if (err1) {
      res.send({
        code: 1,
        data: {
          success: false,
          msg: '服务器出现问题！'
        }
      })
    }
    res.send({
      code: 1,
      data: {
        success: true,
        msg: '修改成功！'
      }
    })
  })
})

//验证手机和验证码
router.post('/api/findTel', (req, res) => {
  let userTel = req.body.userTel
  let code = req.body.msgCode
  //1、首先判断验证码
  let isExist = session.some((v, i) => {
    if (v.tel == userTel && v.code == code) {
      return true
    }
  })
  if (!isExist) {
    res.send({
      code: 1,
      data: {
        msg: '验证码错误！',
        success: false
      }
    })
  } else {
    //2、验证码正确，判断是否被注册
    const sqlStr1 = 'select * from userinfo where tel=?'
    db.query(sqlStr1, userTel, (err1, results1) => {
      if (err1) {
        res.send({
          code: 1,
          data: {
            success: false,
            msg: '服务器出现问题！'
          }
        })
      }
      //3、手机号存在，直接登录，传回用户信息
      if (results1.length > 0) {
        res.send({
          code: 200,
          data: {
            success: true,
            msg: '手机号存在！'
          }
        })
      } else {
        //不存在
        res.send({
          code: 200,
          data: {
            success: false,
            msg: '手机号未注册！'
          }
        })
      }
    })
  }
})

//注册
router.post('/api/Register', (req, res) => {
  let userTel = req.body.userTel
  let code = req.body.msgCode
  let userPwd = req.body.userPwd
  //1、首先判断验证码
  let isExist = session.some((v, i) => {
    if (v.tel == userTel && v.code == code) {
      return true
    }
  })
  if (!isExist) {
    res.send({
      code: 1,
      data: {
        msg: '验证码错误！',
        success: false
      }
    })
  } else {
    //2、验证码正确，判断是否被注册
    const sqlStr1 = 'select * from userinfo where tel=?'
    db.query(sqlStr1, userTel, (err1, results1) => {
      if (err1) {
        res.send({
          code: 1,
          data: {
            success: false,
            msg: '服务器出现问题！'
          }
        })
      }
      //3、手机号存在，直接登录，传回用户信息
      if (results1.length > 0) {
        let { id, tel, imgURL, nickName, token } = results1[0]
        let token1 = gettoken(tel)
        db.query('update userinfo set token=? where id=?', [token1, id], (err, results) => {})
        res.send({
          code: 200,
          data: {
            success: true,
            msg: '您已注册，直接为您登录！',
            userinfo: {
              id,
              tel,
              imgURL,
              nickName,
              token
            }
          }
        })
      } else {
        //不存在，利用该手机号注册

        //得到token
        let token1 = gettoken(userTel)
        const sqlStr2 = 'insert into userinfo (tel,pwd,imgURL,nickname,token) values (?,?,"/images/西宫结弦.jpg","用户xx",?)'
        db.query(sqlStr2, [userTel, userPwd, token1], (err2, results2) => {
          if (err2) {
            res.send({ code: 1, data: { success: false, msg: '服务器出现问题！' } })
          }
          if (results2.affectedRows !== 1) {
            res.send({ code: 4, data: { success: false, msg: '数据库新增出现问题！' } })
          }
          db.query(sqlStr1, userTel, (err3, results3) => {
            let { id, tel, imgURL, nickName, token } = results3[0]
            if (err3) {
              res.send({ code: 1, data: { success: false, msg: '服务器出现问题！' } })
            }
            //手机号存在
            if (results3.length > 0) {
              res.send({
                code: 200,
                data: {
                  success: true,
                  msg: '注册成功，直接为您登录！',
                  userinfo: { id, tel, imgURL, nickName, token }
                }
              })
            }
          })
        })
      }
    })
  }
})

//验证码登录
router.post('/api/codeLogin', (req, res) => {
  //判断是否存在该手机
  let userTel = req.body.userTel
  let code = req.body.msgCode
  //验证码验证
  let isExist = session.some((v, i) => {
    if (v.tel == userTel && v.code == code) {
      return true
    }
  })
  if (!isExist) {
    res.send({
      code: 1,
      data: {
        msg: '验证码错误！',
        success: false
      }
    })
  } else {
    const sqlStr1 = 'select * from userinfo where tel=?'
    db.query(sqlStr1, userTel, (err1, results1) => {
      if (err1) {
        res.send({
          code: 1,
          data: {
            success: false,
            msg: '服务器出现问题！'
          }
        })
      }
      //手机号存在
      if (results1.length > 0) {
        let { id, tel, imgURL, nickName, token } = results1[0]
        let token1 = gettoken(userTel)
        db.query('update userinfo set token=? where id=?', [token1, id], (err, results) => {})
        res.send({
          code: 200,
          data: {
            success: true,
            msg: '登录成功！',
            userinfo: {
              id,
              tel,
              imgURL,
              nickName,
              token
            }
          }
        })
      } else {
        //新增一条
        let token1 = gettoken(userTel)
        const sqlStr2 = 'insert into userinfo (tel,pwd,imgURL,nickname,token) values (?,123456,"/images/西宫结弦.jpg","用户xx",?)'
        db.query(sqlStr2, [userTel, token1], (err2, results2) => {
          if (err2) {
            res.send({
              code: 1,
              data: {
                success: false,
                msg: '服务器出现问题！'
              }
            })
          }
          if (results2.affectedRows !== 1) {
            res.send({
              code: 4,
              data: {
                success: false,
                msg: '数据库新增出现问题！'
              }
            })
          }
          db.query(sqlStr1, userTel, (err3, results3) => {
            let { id, tel, imgURL, nickName, token } = results3[0]
            if (err3) {
              res.send({
                code: 1,
                data: {
                  success: false,
                  msg: '服务器出现问题！'
                }
              })
            }
            //手机号存在
            if (results3.length > 0) {
              res.send({
                code: 200,
                data: {
                  success: true,
                  msg: '登录成功！',
                  userinfo: {
                    id,
                    tel,
                    imgURL,
                    nickName,
                    token
                  }
                }
              })
            }
          })
        })
      }
    })
  }
})

//发送短信验证码
router.post('/api/getCode', (req, res) => {
  let tel = req.body.userTel
  // 短信应用SDK AppID
  var appid = 1400187558 // SDK AppID是1400开头

  // 短信应用SDK AppKey
  var appkey = 'dc9dc3391896235ddc2325685047edc7'

  // 需要发送短信的手机号码
  var phoneNumbers = [tel]

  // 短信模板ID，需要在短信应用中申请
  var templateId = 285590 // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

  // 签名
  var smsSign = '三人行慕课' // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

  // 实例化QcloudSms
  var qcloudsms = QcloudSms(appid, appkey)

  // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
  function callback(err, ress, resData) {
    if (err) {
      console.log('err: ', err)
    } else {
      res.send({
        code: 200,
        data: {
          //这里后面不能把验证码传给前端，暂时只是为了方便
          success: true,
          data: ress.req.body.params[0]
        }
      })
    }
  }
  var ssender = qcloudsms.SmsSingleSender()
  //这个就是短信验证码
  var params = [Math.floor(Math.random() * (9999 - 1000)) + 1000]
  //拙略的方法，不安全，直接暂时存储手机号和对应的验证码
  session.push({ tel: phoneNumbers, code: params })
  ssender.sendWithParam(86, phoneNumbers[0], templateId, params, smsSign, '', '', callback) // 签名参数不能为空串
})

//密码登陆验证
router.post('/api/userLogin', (req, res) => {
  //先查询手机号是否存在
  const sqlStr1 = 'select * from userinfo where tel=?'
  db.query(sqlStr1, req.body.userTel, (err1, results1) => {
    if (err1) {
      res.send({
        code: 1,
        data: {
          success: false,
          msg: '服务器出现问题！'
        }
      })
    }
    //手机号存在
    if (results1.length > 0) {
      //继续查询密码
      const sqlStr2 = 'select * from userinfo where tel=? and pwd =?'
      db.query(sqlStr2, [req.body.userTel, req.body.userPwd], (err2, results2) => {
        if (err2) {
          res.send({
            code: 2,
            msg: '服务器出现问题！'
          })
        }
        if (results2.length > 0) {
          let { id, tel, imgURL, nickName, token } = results2[0]
          let token1 = gettoken(req.body.userTel)
          db.query('update userinfo set token=? where id=?', [token1, id], (err, results) => {})
          //密码正确
          res.send({
            code: 301,
            data: {
              success: true,
              msg: '登录成功！',
              userinfo: {
                id,
                tel,
                imgURL,
                nickName,
                token
              }
            }
          })
        } else {
          //密码直接返回错误
          res.send({
            code: 301,
            data: {
              success: false,
              msg: '密码错误！'
            }
          })
        }
      })
    } else {
      //不存在直接返回错误
      res.send({
        code: 301,
        data: {
          success: false,
          msg: '手机号未注册！'
        }
      })
    }
  })
})
module.exports = router
