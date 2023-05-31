var express = require('express')
var router = express.Router()
let db = require('../db/db.js')

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
            { id: 0, name: '茶源液', imgURL: '/images/sort/cyy.jpeg' },
            { id: 1, name: '功夫茶', imgURL: '/images/sort/gfc.jpeg' },
            { id: 2, name: '茶宠', imgURL: '/images/sort/cc.jpeg' },
            { id: 3, name: '茶叶礼盒', imgURL: '/images/sort/list1.jpeg' },
            { id: 4, name: '小罐茶', imgURL: '/images/sort/xgc.jpeg' }
          ]
        }
      },
      {
        id: 1,
        //左边侧边栏的标题
        name: '新品',
        data: {
          id: 1,
          name: '新品',
          list: [
            { id: 0, name: '五月新品', imgURL: '/images/sort/5-xp.jpeg' },
            { id: 1, name: '六月新品', imgURL: '/images/sort/6-xp.jpeg' },
            { id: 2, name: '七月新品', imgURL: '/images/sort/5-xp.jpeg' }
          ]
        }
      },
      {
        id: 2,
        //左边侧边栏的标题
        name: '锯朵仔',
        data: {
          id: 2,
          name: '锯朵仔',
          list: [
            { id: 0, name: '锯齿', imgURL: '/images/sort/jdz1.jpg' },
            { id: 1, name: '黄山毛峰', imgURL: '/images/sort/jdz2.jpg' }
          ]
        }
      },
      {
        id: 3,
        //左边侧边栏的标题
        name: '蜜兰香',
        data: {
          id: 3,
          name: '蜜兰香',
          list: [
            { id: 0, name: '蜜兰香', imgURL: '/images/sort/mlx.jpg' },
            { id: 1, name: '黄山毛峰', imgURL: '/images/sort/list1.jpeg' },
            { id: 2, name: '碧螺春', imgURL: '/images/sort/list1.jpeg' },
            { id: 3, name: '雀舌', imgURL: '/images/sort/list1.jpeg' },
            { id: 4, name: '六安瓜片', imgURL: '/images/sort/list1.jpeg' },
            { id: 5, name: '五安瓜片', imgURL: '/images/sort/list1.jpeg' },
            { id: 6, name: '四安瓜片', imgURL: '/images/sort/list1.jpeg' }
          ]
        }
      },

      {
        id: 4,
        //左边侧边栏的标题
        name: '凹富后',
        data: {
          id: 4,
          name: '凹富后',
          list: [
            { id: 0, name: '龙井', imgURL: '/images/sort/list1.jpeg' },
            { id: 1, name: '黄山毛峰', imgURL: '/images/sort/list1.jpeg' },
            { id: 2, name: '碧螺春', imgURL: '/images/sort/list1.jpeg' },
            { id: 3, name: '雀舌', imgURL: '/images/sort/list1.jpeg' },
            { id: 4, name: '六安瓜片', imgURL: '/images/sort/list1.jpeg' },
            { id: 5, name: '五安瓜片', imgURL: '/images/sort/list1.jpeg' },
            { id: 6, name: '四安瓜片', imgURL: '/images/sort/list1.jpeg' }
          ]
        }
      },
      {
        id: 5,
        //左边侧边栏的标题
        name: '习茶',
        data: {
          id: 5,
          name: '习茶',
          list: [{ id: 0, name: '龙井', imgURL: '/images/sort/xc.jpeg' }]
        }
      },
      {
        id: 6,
        //左边侧边栏的标题
        name: '茶具',
        data: {
          id: 6,
          name: '茶具',
          list: [
            { id: 0, name: '茶盏', imgURL: '/images/sort/list1.jpeg' },
            { id: 1, name: '黄山毛峰', imgURL: '/images/sort/list1.jpeg' },
            { id: 2, name: '碧螺春', imgURL: '/images/sort/list1.jpeg' },
            { id: 3, name: '雀舌', imgURL: '/images/sort/list1.jpeg' },
            { id: 4, name: '六安瓜片', imgURL: '/images/sort/list1.jpeg' },
            { id: 5, name: '五安瓜片', imgURL: '/images/sort/list1.jpeg' },
            { id: 6, name: '四安瓜片', imgURL: '/images/sort/list1.jpeg' }
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

//首页3
router.get('/api/home_list/data/3', function (req, res, next) {
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
//首页4
router.get('/api/home_list/data/4', function (req, res, next) {
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
//首页5
router.get('/api/home_list/data/5', function (req, res, next) {
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
//首页6
router.get('/api/home_list/data/6', function (req, res, next) {
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
//首页7
router.get('/api/home_list/data/7', function (req, res, next) {
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

//首页2鸭屎香
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
          { id: 0, imgURL: './images/home/2/2-home-ysx1.jpg' },
          { id: 1, imgURL: './images/home/2/2-home-ysx2.jpg' },
          { id: 2, imgURL: './images/home/2/2-home-ysx3.jpg' }
        ]
      }
    ]
  })
})

//首页1锯朵仔
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
          { id: 0, imgURL: '/images/home/1/2-home-jdz1.jpg' },
          { id: 1, imgURL: '/images/home/1/2-home-jdz2.jpg' },
          { id: 2, imgURL: '/images/home/1/2-home-jdz3.jpg' },
          { id: 3, imgURL: '/images/home/1/2-home-jdz4.jpg' },
          { id: 4, imgURL: '/images/home/1/2-home-jdz5.jpg' },
          { id: 5, imgURL: '/images/home/1/2-home-jdz6.jpg' }
        ]
      }
      // {
      //   type: 'guessLikeList',
      //   arr: [
      //     { id: 1, imgURL: '/images/like1.jpeg', name: '建盏茶具套装 红色芝麻豪 12件套', price: 299 },
      //     { id: 2, imgURL: '/images/like1.jpeg', name: '建盏茶具套装 红色芝麻豪 12件套', price: 299 },
      //     { id: 3, imgURL: '/images/like1.jpeg', name: '建盏茶具套装 红色芝麻豪 12件套', price: 299 }
      //   ]
      // }
    ]
  })
})

//首页0推荐数据
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
        { id: 1, title: '锯朵仔' },
        { id: 2, title: '鸭屎香' },
        { id: 3, title: '大乌叶' },
        { id: 4, title: '蜜兰香' },
        { id: 5, title: '凹富后' },
        { id: 6, title: '杏仁香' },
        { id: 7, title: '凤凰红茶' }
      ]
    },
    //轮播图
    dataList: [
      {
        type: 'swiperList',
        arr: [
          { id: 0, imgURL: '/images/home/swiper/swiper1.jpeg' },
          { id: 1, imgURL: '/images/home/swiper/swiper2.jpeg' },
          { id: 2, imgURL: '/images/home/swiper/swiper3.jpeg' }
        ]
      },
      //5图标
      {
        type: 'iconList',
        arr: [
          { id: 0, title: '茶叶', imagURL: '/images/icons1.png' },
          { id: 1, title: '茶具', imagURL: '/images/icons2.png' },
          { id: 2, title: '茶礼盒', imagURL: '/images/icons3.png' },
          { id: 3, title: '领福利', imagURL: '/images/icons4.png' },
          { id: 4, title: '官方验证', imagURL: '/images/icons5.png' }
        ]
      },
      {
        type: 'adSList',
        arr: [
          { id: 0, imgURL: '/images/brandLogow.png', title: '壹杯茶', bd: 1 },
          { id: 1, imgURL: '/images/yjzs.png', title: '有机认证', bd: 1 },
          { id: 2, imgURL: '/images/ozrz.png', bd: 1 }
        ]
      },
      // {
      //   type: 'recommendList',
      //   arr: [
      //     {
      //       id: 0,
      //       name: '龙井1號铁罐250g',
      //       content: '鲜爽甘醇 口粮首选',
      //       price: '68',
      //       imgURL: '/images/recommend.jpeg'
      //     },
      //     {
      //       id: 1,
      //       name: '龙井1號铁罐250g',
      //       content: '鲜爽甘醇 口粮首选',
      //       price: '68',
      //       imgURL: '/images/recommend.jpeg'
      //     }
      //   ]
      // },
      {
        type: 'guessLikeList',
        arr: [
          { id: 1, imgURL: '/images/ysxgood1.jpg', name: '鸭屎香  500g', price: 300 },
          { id: 2, imgURL: '/images/mlxgood1.jpg', name: '蜜兰香 500g', price: 200 },
          { id: 3, imgURL: '/images/jdzgood1.jpg', name: '锯朵仔 500g', price: 1000 },
          { id: 4, imgURL: '/images/afhgood1.jpg', name: '凹富后 500g', price: 600 },
          { id: 5, imgURL: '/images/cdfmmgood1.jpg', name: '茶多酚面膜', price: 78 },
          { id: 6, imgURL: '/images/ybcmmysgood1.jpg', name: '壹杯茶明目眼霜 ', price: 75 },
          { id: 7, imgURL: '/images/ysxcqcyygood1.jpg', name: '鸭屎香萃取茶原液 1L', price: 88 },
          { id: 8, imgURL: '/images/mlxckhpgood1.jpg', name: '蜜兰香茶口含片', price: 25 },
          { id: 9, imgURL: '/images/ybcxgcgood1.jpg', name: '壹杯茶茶叶小罐', price: 88 },
          { id: 10, imgURL: '/images/ybclhgood1.jpg', name: '壹杯茶礼盒', price: 588 }
        ]
      }
    ]
  })
})

module.exports = router
