var express = require('express')
var router = express.Router()
let db = require('../db/db.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '奶茶是憨憨' })
})

//查询商品详情
router.get('/api/detail/data/id', (req, res) => {
  const sqlStr1 = 'select * from goods_list where id=?'
  db.query(sqlStr1, req.query.id, (err, results) => {
    if (err) {
      res.send({
        code: 1,
        data: {
          success: false,
          msg: '查询失败！'
        }
      })
      return
    }
    res.send({
      code: 0,
      data: {
        success: true,
        data: results[0]
      }
    })
  })
})

//分类页数据
router.get('/api/sort_list/data', function (req, res, next) {
  res.send({
    data: {
      success: true
    },
    sort: [
      {
        id: 0,
        //左边侧边栏的标题
        name: '推荐',
        data: {
          id: 0,
          name: '推荐',
          list: [
            { id: 0, name: '铁观音', imgURL: '/images/list1.jpeg' },
            { id: 1, name: '功夫茶', imgURL: '/images/list1.jpeg' },
            { id: 2, name: '茶具电器', imgURL: '/images/list1.jpeg' },
            { id: 3, name: '紫砂壶', imgURL: '/images/list1.jpeg' },
            { id: 4, name: '武夷岩茶', imgURL: '/images/list1.jpeg' }
          ]
        }
      },
      {
        id: 1,
        //左边侧边栏的标题
        name: '绿茶',
        data: {
          id: 1,
          name: '绿茶',
          list: [
            { id: 0, name: '龙井', imgURL: '/images/list1.jpeg' },
            { id: 1, name: '黄山毛峰', imgURL: '/images/list1.jpeg' },
            { id: 2, name: '碧螺春', imgURL: '/images/list1.jpeg' },
            { id: 3, name: '雀舌', imgURL: '/images/list1.jpeg' },
            { id: 4, name: '六安瓜片', imgURL: '/images/list1.jpeg' },
            { id: 5, name: '太平猴魁', imgURL: '/images/list1.jpeg' },
            { id: 6, name: '安吉白茶', imgURL: '/images/list1.jpeg' }
          ]
        }
      },
      {
        id: 2,
        //左边侧边栏的标题
        name: '乌龙',
        data: {
          id: 2,
          name: '乌龙',
          list: [
            { id: 0, name: '龙井', imgURL: '/images/list1.jpeg' },
            { id: 1, name: '黄山毛峰', imgURL: '/images/list1.jpeg' },
            { id: 2, name: '碧螺春', imgURL: '/images/list1.jpeg' },
            { id: 3, name: '雀舌', imgURL: '/images/list1.jpeg' },
            { id: 4, name: '六安瓜片', imgURL: '/images/list1.jpeg' },
            { id: 5, name: '五安瓜片', imgURL: '/images/list1.jpeg' },
            { id: 6, name: '四安瓜片', imgURL: '/images/list1.jpeg' }
          ]
        }
      },
      {
        id: 3,
        //左边侧边栏的标题
        name: '红茶',
        data: {
          id: 3,
          name: '红茶',
          list: [
            { id: 0, name: '龙井', imgURL: '/images/list1.jpeg' },
            { id: 1, name: '黄山毛峰', imgURL: '/images/list1.jpeg' },
            { id: 2, name: '碧螺春', imgURL: '/images/list1.jpeg' },
            { id: 3, name: '雀舌', imgURL: '/images/list1.jpeg' },
            { id: 4, name: '六安瓜片', imgURL: '/images/list1.jpeg' },
            { id: 5, name: '五安瓜片', imgURL: '/images/list1.jpeg' },
            { id: 6, name: '四安瓜片', imgURL: '/images/list1.jpeg' }
          ]
        }
      },
      {
        id: 4,
        //左边侧边栏的标题
        name: '白茶',
        data: {
          id: 4,
          name: '白茶',
          list: [
            { id: 0, name: '龙井', imgURL: '/images/list1.jpeg' },
            { id: 1, name: '黄山毛峰', imgURL: '/images/list1.jpeg' },
            { id: 2, name: '碧螺春', imgURL: '/images/list1.jpeg' },
            { id: 3, name: '雀舌', imgURL: '/images/list1.jpeg' },
            { id: 4, name: '六安瓜片', imgURL: '/images/list1.jpeg' },
            { id: 5, name: '五安瓜片', imgURL: '/images/list1.jpeg' },
            { id: 6, name: '四安瓜片', imgURL: '/images/list1.jpeg' }
          ]
        }
      },
      {
        id: 5,
        //左边侧边栏的标题
        name: '普洱',
        data: {
          id: 5,
          name: '普洱',
          list: [
            { id: 0, name: '龙井', imgURL: '/images/list1.jpeg' },
            { id: 1, name: '黄山毛峰', imgURL: '/images/list1.jpeg' },
            { id: 2, name: '碧螺春', imgURL: '/images/list1.jpeg' },
            { id: 3, name: '雀舌', imgURL: '/images/list1.jpeg' },
            { id: 4, name: '六安瓜片', imgURL: '/images/list1.jpeg' },
            { id: 5, name: '五安瓜片', imgURL: '/images/list1.jpeg' },
            { id: 6, name: '四安瓜片', imgURL: '/images/list1.jpeg' }
          ]
        }
      },
      {
        id: 6,
        //左边侧边栏的标题
        name: '花茶',
        data: {
          id: 6,
          name: '花茶',
          list: [
            { id: 0, name: '龙井', imgURL: '/images/list1.jpeg' },
            { id: 1, name: '黄山毛峰', imgURL: '/images/list1.jpeg' },
            { id: 2, name: '碧螺春', imgURL: '/images/list1.jpeg' },
            { id: 3, name: '雀舌', imgURL: '/images/list1.jpeg' },
            { id: 4, name: '六安瓜片', imgURL: '/images/list1.jpeg' },
            { id: 5, name: '五安瓜片', imgURL: '/images/list1.jpeg' },
            { id: 6, name: '四安瓜片', imgURL: '/images/list1.jpeg' }
          ]
        }
      },
      {
        id: 7,
        //左边侧边栏的标题
        name: '茶具',
        data: {
          id: 7,
          name: '茶具',
          list: [
            { id: 0, name: '龙井', imgURL: '/images/list1.jpeg' },
            { id: 1, name: '黄山毛峰', imgURL: '/images/list1.jpeg' },
            { id: 2, name: '碧螺春', imgURL: '/images/list1.jpeg' },
            { id: 3, name: '雀舌', imgURL: '/images/list1.jpeg' },
            { id: 4, name: '六安瓜片', imgURL: '/images/list1.jpeg' },
            { id: 5, name: '五安瓜片', imgURL: '/images/list1.jpeg' },
            { id: 6, name: '四安瓜片', imgURL: '/images/list1.jpeg' }
          ]
        }
      }
    ]
  })
})

//查询商品页面
router.get('/api/goods_list/data', function (req, res, next) {
  //前端给后端的数据
  let [, k2] = Object.keys(req.query)
  let [searchName, means] = Object.values(req.query)
  let sqlStr1 = `select * from goods_list where name like '%${searchName}%' order by ${k2} ${means}`
  db.query(sqlStr1, function (err, results) {
    if (err) {
      res.send({
        code: 1,
        data: {
          success: false,
          msg: '查询失败！'
        }
      })
    }
    res.send({
      code: 0,
      data: {
        success: true,
        data: results
      }
    })
  })
})

//首页铁观音
router.get('/api/home_list/data/2', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      success: true
    },
    dataList: [
      {
        type: 'adSList',
        arr: [
          { id: 0, imgURL: './images/tgy.jpeg' },
          { id: 1, imgURL: './images/tgy.jpeg' }
        ]
      },
      {
        type: 'guessLikeList',
        arr: [
          { id: 1, imgURL: './images/like2.jpeg', name: '建盏茶具套装 红色芝麻豪 12件套', price: 299 },
          { id: 2, imgURL: './images/like2.jpeg', name: '建盏茶具套装 红色芝麻豪 12件套', price: 299 },
          { id: 3, imgURL: './images/like2.jpeg', name: '建盏茶具套装 红色芝麻豪 12件套', price: 299 }
        ]
      }
    ]
  })
})

//首页大红袍
router.get('/api/home_list/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      success: true
    },
    dataList: [
      {
        type: 'adSList',
        arr: [
          { id: 0, imgURL: '/images/dhp.jpeg' },
          { id: 1, imgURL: '/images/dhp.jpeg' }
        ]
      },
      {
        type: 'guessLikeList',
        arr: [
          { id: 1, imgURL: '/images/like1.jpeg', name: '建盏茶具套装 红色芝麻豪 12件套', price: 299 },
          { id: 2, imgURL: '/images/like1.jpeg', name: '建盏茶具套装 红色芝麻豪 12件套', price: 299 },
          { id: 3, imgURL: '/images/like1.jpeg', name: '建盏茶具套装 红色芝麻豪 12件套', price: 299 }
        ]
      }
    ]
  })
})

//首页推荐数据
router.get('/api/home_list/data/0', function (req, res, next) {
  res.send({
    data: {
      success: true
    },
    //顶部导航栏
    topBar: {
      type: 'topBar',
      arr: [
        { id: 0, title: '推荐' },
        { id: 1, title: '大红袍' },
        { id: 2, title: '铁观音' },
        { id: 3, title: '绿茶' },
        { id: 4, title: '普洱' },
        { id: 5, title: '花茶' },
        { id: 6, title: '茶具' }
      ]
    },
    //轮播图
    dataList: [
      {
        type: 'swiperList',
        arr: [
          { id: 0, imgURL: '/images/swiper1.jpeg' },
          { id: 1, imgURL: '/images/swiper2.jpeg' },
          { id: 2, imgURL: '/images/swiper3.jpeg' }
        ]
      },
      //5图标
      {
        type: 'iconList',
        arr: [
          { id: 0, title: '自饮茶', imagURL: '/images/icons1.png' },
          { id: 1, title: '茶具', imagURL: '/images/icons2.png' },
          { id: 2, title: '茶礼盒', imagURL: '/images/icons3.png' },
          { id: 3, title: '领福利', imagURL: '/images/icons4.png' },
          { id: 4, title: '官方验证', imagURL: '/images/icons5.png' }
        ]
      },
      {
        type: 'recommendList',
        arr: [
          {
            id: 0,
            name: '龙井1號铁罐250g',
            content: '鲜爽甘醇 口粮首选',
            price: '68',
            imgURL: '/images/recommend.jpeg'
          },
          {
            id: 1,
            name: '龙井1號铁罐250g',
            content: '鲜爽甘醇 口粮首选',
            price: '68',
            imgURL: '/images/recommend.jpeg'
          }
        ]
      },
      {
        type: 'guessLikeList',
        arr: [
          { id: 1, imgURL: '/images/goods1.jpg', name: '赛事茶-第三届武夷山茶叶交易会暨仙店杯-优质奖肉桂160g', price: 238 },
          { id: 2, imgURL: '/images/goods2.jpg', name: '茶具-中国陶瓷茶叶罐220ml', price: 26 },
          { id: 3, imgURL: '/images/goods3.jpg', name: '绿茶 远致龙井', price: 118 },
          { id: 4, imgURL: '/images/goods4.jpg', name: '明前春茶 绿茶 龙井', price: 98 },
          { id: 5, imgURL: '/images/goods5.jpg', name: '武夷山高级大红袍2号', price: 99 },
          { id: 6, imgURL: '/images/goods6.jpg', name: '漳平水仙兰香1号', price: 99 },
          { id: 7, imgURL: '/images/goods7.jpg', name: '历史名茶黄山毛峰1号', price: 58 },
          { id: 8, imgURL: '/images/goods8.jpg', name: '云南凤庆经典蜜香滇红', price: 88 },
          { id: 9, imgURL: '/images/like2.jpeg', name: '建盏茶具套装 红色芝麻豪 12件套', price: 299 },
          { id: 10, imgURL: '/images/like1.jpeg', name: '建盏茶具套装 红色芝麻豪 12件套', price: 299 },
          { id: 11, imgURL: '/images/like3.jpeg', name: '建盏茶具套装 红色芝麻豪 12件套', price: 299 },
          { id: 12, imgURL: '/images/like2.jpeg', name: '建盏茶具套装 红色芝麻豪 12件套', price: 299 },
          { id: 13, imgURL: '/images/like1.jpeg', name: '建盏茶具套装 红色芝麻豪 12件套', price: 299 }
        ]
      }
    ]
  })
})

module.exports = router
